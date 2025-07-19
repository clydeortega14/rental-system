import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "destructive"
  | "secondary";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  const variantClassMap: Record<BadgeVariant, string> = {
    default: "bg-gray-100 text-gray-800 border border-gray-300",
    success: "bg-green-100 text-green-800 border border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    destructive: "bg-red-600 text-white border border-red-700",
    secondary: "bg-orange-200 text-gray-700 border border-gray-300",
  };

  return (
    <span
      className={cn(
        "inline-block text-[0.75rem] uppercase tracking-wide font-semibold px-3 py-1 rounded-full shadow-sm",
        variantClassMap[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
