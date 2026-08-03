"use client";

import * as React from "react";
import { Info, PencilLine, RefreshCw } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { CLIENT_SESSION_SYNC_EVENT } from "@/lib/axios-client";
import { useLoginBanner } from "@/features/auth/api/use-login-banner";

import { Button } from "@/components/ui/button";
import { AppImage } from "@/components/ui/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { WELCOME_DIALOG_EVENT, type LastLoginInfo } from "./WelcomeDialog";
import {
  isValidMobile as validateMobile,
  isValidOtp as validateOtp,
  normalizeMobile as normalizeMobileValue,
  type AuthLoadingState,
} from "@/features/auth/model/auth";
import type { ApiResponse, CaptchaValue } from "@/types/auth";
import { getSiteTypeHeaders } from "@/lib/api-site-type";
import { useStorefront } from "@/providers/storefront-provider";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 150;
const OTP_DIGITS_PATTERN = "[0-9۰-۹٠-٩]*";

type AuthStep = "login" | "verify";

interface AuthDialogProps {
  trigger: React.ReactElement;
  listenForOpenEvent?: boolean;
}

interface LastLoginResponse {
  value?: LastLoginInfo;
}

async function showWelcomeDialog(siteType: ReturnType<typeof useStorefront>["siteType"]) {
  try {
    const response = await fetch("/api/profile/last-login", {
      cache: "no-store",
      headers: getSiteTypeHeaders(siteType),
    });
    const payload = (await response.json()) as LastLoginResponse;
    if (!response.ok || !payload.value?.loginDateFa) {
      return;
    }

    window.dispatchEvent(new CustomEvent(WELCOME_DIALOG_EVENT, { detail: payload.value }));
  } catch {
    // A welcome message must never interrupt a completed sign-in.
  }
}

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)));
}

function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

function normalizeCaptchaImage(image: string) {
  if (/^(data:|https?:|\/)/i.test(image)) {
    return image;
  }
  return `data:image/png;base64,${image}`;
}

function responseMessage(response: ApiResponse<unknown>, fallback: string) {
  return response.message || response.errors?.[0] || fallback;
}

function waitForAuthenticatedSessionSync() {
  let resolveReady!: () => void;
  const ready = new Promise<void>((resolve) => {
    resolveReady = resolve;
  });
  const cleanup = () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }
    window.removeEventListener(CLIENT_SESSION_SYNC_EVENT, handleSessionSync);
  };
  const handleSessionSync = (event: Event) => {
    if (!(event instanceof CustomEvent) || typeof event.detail !== "string" || !event.detail) {
      return;
    }

    cleanup();
    resolveReady();
  };

  window.addEventListener(CLIENT_SESSION_SYNC_EVENT, handleSessionSync);
  const timeoutId = window.setTimeout(() => {
    cleanup();
    resolveReady();
  }, 5_000);

  return { ready, cancel: cleanup };
}

async function authRequest<T>(
  url: string,
  siteType: ReturnType<typeof useStorefront>["siteType"],
  init?: RequestInit,
) {
  const response = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...getSiteTypeHeaders(siteType),
      ...init?.headers,
    },
  });
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(responseMessage(payload, "ارتباط با سرور برقرار نشد."));
  }
  return payload;
}

export function AuthDialog({ trigger, listenForOpenEvent = false }: AuthDialogProps) {
  const { siteType } = useStorefront();
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<AuthStep>("login");
  const [mobile, setMobile] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [captchaValue, setCaptchaValue] = React.useState<CaptchaValue | null>(null);
  const [code, setCode] = React.useState("");
  const [secondsLeft, setSecondsLeft] = React.useState(RESEND_SECONDS);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState<AuthLoadingState>(null);
  const otpInputRef = React.useRef<HTMLInputElement>(null);
  const { data: loginBanner } = useLoginBanner(open);

  const normalizedMobile = normalizeMobileValue(mobile);
  const mobileIsValid = validateMobile(mobile);

  const loadCaptcha = React.useCallback(
    async (clearError = true) => {
      setLoading("captcha");
      if (clearError) {
        setError("");
      }
      setCaptcha("");

      try {
        const response = await authRequest<CaptchaValue>("/api/etkala-auth/captcha", siteType);
        if (!response.isSuccess || !response.value) {
          throw new Error(responseMessage(response, "دریافت تصویر امنیتی ناموفق بود."));
        }
        setCaptchaValue(response.value);
      } catch (requestError) {
        setCaptchaValue(null);
        setError(
          requestError instanceof Error ? requestError.message : "دریافت تصویر امنیتی ناموفق بود.",
        );
      } finally {
        setLoading(null);
      }
    },
    [siteType],
  );

  React.useEffect(() => {
    if (!listenForOpenEvent) {
      return;
    }

    const openDialog = () => {
      setOpen(true);
      void loadCaptcha();
    };
    window.addEventListener("etkala:open-auth", openDialog);
    return () => {
      window.removeEventListener("etkala:open-auth", openDialog);
    };
  }, [listenForOpenEvent, loadCaptcha]);

  React.useEffect(() => {
    if (!open || step !== "verify" || secondsLeft <= 0) {
      return;
    }
    const timer = window.setInterval(
      () => setSecondsLeft((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [open, secondsLeft, step]);

  React.useEffect(() => {
    if (step === "verify" && error && !loading) {
      otpInputRef.current?.focus();
    }
  }, [error, loading, step]);

  function resetDialog() {
    setStep("login");
    setMobile("");
    setCaptcha("");
    setCaptchaValue(null);
    setCode("");
    setSecondsLeft(RESEND_SECONDS);
    setError("");
    setLoading(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen && !captchaValue && step === "login") {
      void loadCaptcha();
    }
    if (!nextOpen) {
      window.dispatchEvent(new Event("etkala:auth-dismissed"));
      resetDialog();
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!mobileIsValid || !captcha.trim() || !captchaValue || loading) {
      return;
    }

    setLoading("login");
    setError("");

    try {
      const response = await authRequest<unknown>("/api/etkala-auth/login", siteType, {
        method: "POST",
        body: JSON.stringify({
          mobile: normalizedMobile,
          captcha: toEnglishDigits(captcha.trim()),
          cpCode: captchaValue.cpCode,
        }),
      });

      if (!response.isSuccess) {
        throw new Error(responseMessage(response, "شماره موبایل یا عبارت امنیتی صحیح نیست."));
      }

      setStep("verify");
      setSecondsLeft(RESEND_SECONDS);
      setCode("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "ارسال کد تأیید ناموفق بود.");
      await loadCaptcha(false);
    } finally {
      setLoading(null);
    }
  }

  async function handleVerify(verificationCode: string) {
    if (!validateOtp(verificationCode) || loading) {
      return;
    }

    setLoading("verify");
    setError("");

    try {
      const sessionSync = waitForAuthenticatedSessionSync();
      const result = await signIn("credentials", {
        mobile: normalizedMobile,
        code: verificationCode,
        siteType,
        redirect: false,
      });

      if (!result?.ok || result.error) {
        sessionSync.cancel();
        throw new Error("کد تأیید واردشده صحیح نیست یا منقضی شده است.");
      }

      await sessionSync.ready;
      window.dispatchEvent(new Event("etkala:authenticated"));
      void showWelcomeDialog(siteType);
      const search = new URLSearchParams(window.location.search);
      const callbackUrl = search.get("callbackUrl");
      handleOpenChange(false);

      if (callbackUrl?.startsWith("/")) {
        window.location.assign(callbackUrl);
      }
    } catch (requestError) {
      setCode("");
      setError(requestError instanceof Error ? requestError.message : "تأیید کد ناموفق بود.");
    } finally {
      setLoading(null);
    }
  }

  async function handleResend() {
    if (secondsLeft > 0 || loading) {
      return;
    }

    setLoading("resend");
    setError("");

    try {
      const response = await authRequest<never>("/api/etkala-auth/resend", siteType, {
        method: "POST",
        body: JSON.stringify({ mobile: normalizedMobile }),
      });

      if (!response.isSuccess) {
        throw new Error(responseMessage(response, "ارسال مجدد کد ناموفق بود."));
      }

      setSecondsLeft(RESEND_SECONDS);
      setCode("");
      toast.success("کد تأیید دوباره ارسال شد.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "ارسال مجدد کد ناموفق بود.");
    } finally {
      setLoading(null);
    }
  }

  function editMobile() {
    setStep("login");
    setCode("");
    setCaptchaValue(null);
    setError("");
    void loadCaptcha();
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent
        showCloseButton={false}
        className="inset-x-0 start-0 top-auto bottom-0 h-[min(580px,calc(100dvh-1rem))] max-h-none max-w-none translate-x-0 translate-y-0 grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden rounded-t-[28px] rounded-b-none p-0 sm:start-1/2 sm:top-1/2 sm:bottom-auto sm:h-[min(580px,calc(100dvh-2rem))] sm:max-h-none sm:max-w-[440px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px] rtl:translate-x-0 rtl:sm:translate-x-1/2"
      >
        <div className="relative h-30 shrink-0 overflow-hidden rounded-t-[28px] sm:h-40 sm:rounded-t-[32px]">
          <AppImage
            src={loginBanner?.image ?? "/images/auth-dialog-banner.png"}
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, 440px"
            className="object-cover"
          />
        </div>

        <div className="flex h-full min-h-0 flex-col overflow-y-auto px-6 pt-8 pb-6 sm:px-7">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-secondary text-base font-bold">
              {step === "login" ? "ورود | ثبت‌نام" : "کد تایید را وارد کنید"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {step === "login"
                ? "ورود با شماره موبایل و عبارت امنیتی"
                : "تأیید شماره موبایل با کد پیامک‌شده"}
            </DialogDescription>
          </DialogHeader>

          {step === "login" ? (
            <form className="mt-7 flex flex-1 flex-col" onSubmit={handleLogin} noValidate>
              <FieldGroup className="gap-3">
                <Field data-invalid={Boolean(error) && !mobileIsValid}>
                  <FieldLabel htmlFor="auth-mobile" className="text-secondary font-normal">
                    لطفا شماره موبایل خود را وارد کنید
                  </FieldLabel>
                  <Input
                    id="auth-mobile"
                    dir="ltr"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={toPersianDigits(mobile)}
                    onChange={(event) =>
                      setMobile(toEnglishDigits(event.target.value).replace(/\D/g, "").slice(0, 11))
                    }
                    aria-invalid={Boolean(mobile) && !mobileIsValid}
                    className="h-12 rounded-xl text-center text-base"
                  />
                </Field>

                <Field data-invalid={Boolean(error)}>
                  <FieldLabel htmlFor="auth-captcha" className="sr-only">
                    عبارت امنیتی
                  </FieldLabel>
                  <div className="grid grid-cols-2 gap-2" dir="rtl">
                    <Input
                      id="auth-captcha"
                      dir="ltr"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="عبارت امنیتی"
                      value={toPersianDigits(captcha)}
                      onChange={(event) =>
                        setCaptcha(
                          toEnglishDigits(event.target.value).replace(/\s/g, "").slice(0, 8),
                        )
                      }
                      aria-invalid={Boolean(error)}
                      className="h-12 rounded-xl text-center text-base"
                    />
                    <div className="flex h-12 overflow-hidden rounded-xl border bg-white">
                      <div className="flex min-w-0 flex-1 items-center justify-center">
                        {captchaValue ? (
                          <AppImage
                            src={normalizeCaptchaImage(captchaValue.img)}
                            alt="تصویر عبارت امنیتی"
                            width={180}
                            height={44}
                            unoptimized
                            className="max-h-11 max-w-full object-contain"
                          />
                        ) : (
                          <Spinner className="text-muted-foreground size-5" />
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-lg"
                        aria-label="دریافت عبارت امنیتی جدید"
                        disabled={loading === "captcha"}
                        onClick={() => void loadCaptcha()}
                        className="h-full rounded-none border-s"
                        aria-busy={loading === "captcha"}
                      >
                        <RefreshCw />
                      </Button>
                    </div>
                  </div>
                </Field>
              </FieldGroup>

              <div className="text-muted-foreground mt-5 flex items-start gap-2 text-xs leading-6">
                <Info className="text-secondary/70 mt-1 size-4 shrink-0" aria-hidden="true" />
                <p>
                  ورود شما به معنای پذیرش{" "}
                  <a
                    href="/terms-and-conditions"
                    className="text-auth-accent underline underline-offset-4"
                  >
                    شرایط اتکالاین و قوانین حریم خصوصی
                  </a>{" "}
                  است.
                </p>
              </div>

              {error && <FieldError className="mt-2 text-center">{error}</FieldError>}

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="mt-auto h-12 rounded-full disabled:bg-[#E2E8F0] disabled:text-slate-400"
                disabled={!mobileIsValid || !captcha.trim() || !captchaValue || Boolean(loading)}
                aria-busy={loading === "login"}
              >
                {loading === "login" && <Spinner data-icon="inline-start" className="size-4" />}
                ادامه
              </Button>
            </form>
          ) : (
            <div className="mt-8 flex flex-1 flex-col items-center">
              <Field data-invalid={Boolean(error)} className="items-center">
                <FieldLabel htmlFor="auth-code" className="sr-only">
                  کد تأیید
                </FieldLabel>
                <InputOTP
                  ref={otpInputRef}
                  id="auth-code"
                  dir="ltr"
                  maxLength={OTP_LENGTH}
                  pattern={OTP_DIGITS_PATTERN}
                  value={code}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  onChange={(value) =>
                    setCode(toEnglishDigits(value).replace(/\D/g, "").slice(0, OTP_LENGTH))
                  }
                  onComplete={(value) =>
                    void handleVerify(
                      toEnglishDigits(value).replace(/\D/g, "").slice(0, OTP_LENGTH),
                    )
                  }
                  disabled={loading === "verify"}
                  aria-invalid={Boolean(error)}
                  className="max-w-full"
                  containerClassName="max-w-full justify-center"
                >
                  <InputOTPGroup dir="ltr" className="max-w-full gap-1 sm:gap-2">
                    {Array.from({ length: OTP_LENGTH }, (_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="size-11 rounded-lg border text-base font-bold text-black first:rounded-lg last:rounded-lg sm:size-12"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </Field>

              <p className="text-secondary mt-8 text-center text-sm">
                کد تایید برای شماره {toPersianDigits(normalizedMobile)} پیامک شد
              </p>
              <Button
                type="button"
                variant="link"
                onClick={editMobile}
                className="text-auth-accent mt-1"
              >
                <PencilLine data-icon="inline-start" />
                ویرایش شماره
              </Button>

              {loading === "verify" && (
                <div
                  className="text-muted-foreground bg-muted mt-3 flex items-center gap-2 rounded-full px-3 py-2 text-sm"
                  aria-live="polite"
                >
                  <Spinner className="size-4" />
                  در حال بررسی کد...
                </div>
              )}
              {error && <FieldError className="mt-3 text-center">{error}</FieldError>}

              <Button
                type="button"
                variant={secondsLeft > 0 ? "secondary" : "outline"}
                size="lg"
                className="mt-auto h-12 w-full rounded-full"
                disabled={secondsLeft > 0 || Boolean(loading)}
                onClick={() => void handleResend()}
                aria-busy={loading === "resend"}
              >
                {loading === "resend" ? (
                  <Spinner data-icon="inline-start" className="size-4" />
                ) : secondsLeft === 0 ? (
                  <RefreshCw data-icon="inline-start" />
                ) : null}
                {secondsLeft > 0
                  ? `${toPersianDigits(`${minutes}:${seconds}`)} مانده به دریافت مجدد کد`
                  : "ارسال مجدد کد"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
