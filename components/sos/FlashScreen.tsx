"use client";

import { useFlash } from "@/hooks/useFlash";
import { cn } from "@/lib/utils";

interface Props {
  active: boolean;
}

export default function FlashScreen({
  active,
}: Props) {
  const visible = useFlash(active);

  if (!active) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9998] pointer-events-none transition-opacity duration-200",
        visible
          ? "bg-red-600/40 opacity-100"
          : "bg-transparent opacity-0"
      )}
    />
  );
}