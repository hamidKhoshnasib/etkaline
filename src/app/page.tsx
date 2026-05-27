import { Btn } from "@/components/ui/Btn";
import { Check } from "lucide-react";

const sizes = ["sm", "md", "lg", "xl"] as const;
const iconSizes = ["icon-sm", "icon-md", "icon-lg", "icon-xl"] as const;
const variants = ["default", "outline-primary", "ghost", "secondary-gray"] as const;

export default function Home() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col gap-8 py-10">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <p className="title-large-bold">{variant}</p>
          <div className="flex items-center gap-3">
            {sizes.map((size) => (
              <Btn key={size} variant={variant} size={size}>
                <Check /> عنوان <Check />
              </Btn>
            ))}
            <Btn variant={variant} size="lg" disabled>
              <Check /> عنوان <Check />
            </Btn>
          </div>
          <div className="flex items-center gap-3">
            {iconSizes.map((size) => (
              <Btn key={size} variant={variant} size={size}>
                <Check />
              </Btn>
            ))}
            <Btn variant={variant} size="icon-lg" disabled>
              <Check />
            </Btn>
          </div>
        </div>
      ))}
    </div>
  );
}
