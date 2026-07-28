import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "className" | "id"> & {
  as?: "div" | "main";
  children: ReactNode;
  className?: string;
  id?: string;
  fluid?: boolean;
};

/** Centers page content with the default horizontal padding. */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { as: Component = "div", children, className, id, fluid = false, ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      id={id}
      className={cn("px-4", fluid ? "w-full" : "container mx-auto", className)}
      {...props}
    >
      {children}
    </Component>
  );
});
