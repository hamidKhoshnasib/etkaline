import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function mountPicker({
  siteType = "supermarket",
  user = { backendId: 101, superMarketStoreId: 201, applianceStoreId: 301 },
  addresses = [{ id: "1", isDefault: true }],
  status = "authenticated",
  hasLoadedAddresses = true,
  storage = new Map(),
  props = {},
} = {}) {
  const slots = [];
  const timers = new Map();
  const listeners = new Map();
  let cursor = 0;
  let pendingEffects = [];
  const react = {
    useId: () => "test-form",
    useRef: (value) => (slots[cursor++] ??= { current: value }),
    useState: (value) => {
      const index = cursor++;
      slots[index] ??= { value };
      return [slots[index].value, (next) => (slots[index].value = next)];
    },
    useEffect: (callback, dependencies) => {
      const index = cursor++;
      const previous = slots[index];
      if (
        !previous ||
        dependencies.some((value, i) => !Object.is(value, previous.dependencies[i]))
      ) {
        pendingEffects.push(() => {
          previous?.cleanup?.();
          slots[index] = { dependencies, cleanup: callback() };
        });
      }
    },
  };
  const source = readFileSync(
    new URL("../src/components/layout/header/AddressPicker.tsx", import.meta.url),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  });
  const sourceModule = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  runInNewContext(outputText, {
    module: sourceModule,
    exports: sourceModule.exports,
    window: {
      sessionStorage: {
        getItem: (key) => storage.get(key),
        setItem: (key, value) => storage.set(key, value),
      },
      setTimeout: (callback) => {
        const id = Symbol();
        timers.set(id, callback);
        return id;
      },
      clearTimeout: (id) => timers.delete(id),
      addEventListener: (name, callback) => listeners.set(name, callback),
      removeEventListener: (name) => listeners.delete(name),
    },
    require: (name) => {
      if (name === "react") {
        return react;
      }
      if (name === "react/jsx-runtime") {
        return { jsx, jsxs: jsx };
      }
      if (name === "next-auth/react") {
        return { useSession: () => ({ data: { user }, status }) };
      }
      if (name === "next/navigation") {
        return { useRouter: () => ({}) };
      }
      if (name === "@tanstack/react-query") {
        return { useQueryClient: () => ({}) };
      }
      if (name === "@/providers/storefront-provider") {
        return { useStorefront: () => ({ siteType }) };
      }
      if (name === "@/features/address/api/use-addresses") {
        return { useAddresses: () => ({ data: addresses, isSuccess: hasLoadedAddresses }) };
      }
      if (name === "@/features/address/api/use-address-mutations") {
        return { useCreateAddress: () => ({}), useUpdateAddress: () => ({}) };
      }
      if (name === "@/lib/axios-client") {
        return { ADDRESS_REQUIRED_EVENT: "address-required" };
      }
      if (name === "@/lib/utils") {
        return { cn: () => "" };
      }
      return new Proxy({}, { get: (_, key) => key });
    },
  });
  function render() {
    cursor = 0;
    pendingEffects = [];
    const tree = sourceModule.exports.AddressPicker({
      trigger: jsx("button", {}),
      showMissingAddressPrompt: true,
      ...props,
    });
    for (const effect of pendingEffects) {
      effect();
    }
    return tree;
  }
  function settle() {
    render();
    for (const [id, callback] of timers) {
      timers.delete(id);
      callback();
    }
    return render();
  }
  return { settle, dispatch: (name) => listeners.get(name)?.() };
}

function titleOf(tree) {
  if (!tree || typeof tree !== "object") {
    return undefined;
  }
  if (tree.type === "DialogTitle") {
    return tree.props.children;
  }
  return [tree.props?.children].flat(Infinity).map(titleOf).find(Boolean);
}

for (const siteType of ["supermarket", "appliance"]) {
  test(`${siteType} fresh tabs do not auto-prompt after a store and default address are selected`, () => {
    for (let tab = 0; tab < 3; tab++) {
      assert.equal(mountPicker({ siteType }).settle().props.open, false);
    }
  });

  test(`${siteType} still prompts when only the other storefront has a selected store`, () => {
    const user = { backendId: 101, superMarketStoreId: 0, applianceStoreId: 0 };
    user[siteType === "supermarket" ? "applianceStoreId" : "superMarketStoreId"] = 301;
    const tree = mountPicker({ siteType, user }).settle();
    assert.equal(tree.props.open, true);
    assert.equal(titleOf(tree), "انتخاب فروشگاه");
  });

  test(`${siteType} missing addresses still prompt even with a selected store`, () => {
    const tree = mountPicker({ siteType, addresses: [] }).settle();
    assert.equal(tree.props.open, true);
    assert.equal(titleOf(tree), "انتخاب موقعیت مکانی");
  });

  test(`${siteType} addresses without a default still require address selection`, () => {
    const tree = mountPicker({ siteType, addresses: [{ id: "1", isDefault: false }] }).settle();
    assert.equal(tree.props.open, true);
    assert.equal(titleOf(tree), "آدرس‌های شما");
  });

  test(`${siteType} backend address-required events still open the picker`, () => {
    const picker = mountPicker({ siteType, props: { listenForAddressRequired: true } });
    assert.equal(picker.settle().props.open, false);
    picker.dispatch("address-required");
    assert.equal(picker.settle().props.open, true);
  });
}

test("dismissing an automatic prompt does not suppress the other storefront's prompt", () => {
  const storage = new Map();
  const user = { backendId: 101, superMarketStoreId: 0, applianceStoreId: 0 };
  for (const siteType of ["supermarket", "appliance"]) {
    assert.equal(mountPicker({ siteType, user, storage }).settle().props.open, true);
    assert.equal(mountPicker({ siteType, user, storage }).settle().props.open, false);
  }
});

test("automatic prompting waits for authentication and successfully loaded addresses", () => {
  for (const options of [
    { status: "loading" },
    { status: "unauthenticated" },
    { hasLoadedAddresses: false, addresses: [] },
    { props: { showMissingAddressPrompt: false } },
  ]) {
    assert.equal(mountPicker(options).settle().props.open, false);
  }
});
