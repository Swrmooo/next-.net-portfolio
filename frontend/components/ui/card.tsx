import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentPropsWithoutRef<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-amber-200/15 bg-white/[0.04] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.25)] transition",
        "hover:border-amber-200/35 hover:bg-white/[0.06]",
        className,
      )}
      {...props}
    />
  );
}
