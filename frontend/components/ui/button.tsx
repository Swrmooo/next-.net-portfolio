import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export function buttonVariants({
  variant = "primary",
  className,
}: {
  variant?: ButtonVariant;
  className?: string;
} = {}) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition",
    "focus:outline-none focus:ring-2 focus:ring-amber-200/50 focus:ring-offset-2 focus:ring-offset-slate-950",
    variant === "primary" &&
      "border border-amber-200/60 bg-amber-200 text-slate-950 shadow-[0_0_24px_rgba(251,191,36,0.22)] hover:bg-amber-100",
    variant === "secondary" &&
      "border border-amber-200/25 bg-white/5 text-slate-100 hover:border-amber-200/50 hover:bg-white/10",
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, className })}
      type={type}
      {...props}
    />
  );
}
