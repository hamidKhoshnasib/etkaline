import type { SearchableProperty } from "@/features/catalog/api/use-catalog-queries";

interface FilterOptionsProps {
  property: SearchableProperty;
  selectedValueIds: number[];
  onToggle: (valueId: number) => void;
}

export function FilterOptions({ property, selectedValueIds, onToggle }: FilterOptionsProps) {
  return (
    <div className="flex max-h-52 flex-col gap-2 overflow-y-auto py-1">
      {property.values.map((value) => {
        const checked = selectedValueIds.includes(value.id);
        const inputId = `filter-${property.propertyId}-${value.id}`;

        return (
          <label
            key={value.id}
            htmlFor={inputId}
            className="flex cursor-pointer items-center gap-2 text-sm"
          >
            <input
              id={inputId}
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(value.id)}
              className="border-input text-primary focus-visible:border-auth-accent size-4 shrink-0 rounded accent-current focus-visible:outline-none"
            />
            <span className="min-w-0 text-slate-600">{value.title}</span>
          </label>
        );
      })}
    </div>
  );
}
