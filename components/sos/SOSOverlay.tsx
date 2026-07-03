"use client";

import { ShieldAlert } from "lucide-react";

interface Props {
  active: boolean;
}

export default function SOSOverlay({
  active,
}: Props) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div className="rounded-3xl bg-black/70 px-10 py-8 text-center text-white backdrop-blur-md">
        <ShieldAlert className="mx-auto mb-4 h-16 w-16 text-red-500 animate-pulse" />

        <h1 className="text-3xl font-bold">
          EMERGENCY MODE
        </h1>

        <p className="mt-3 text-white/80">
          GuardianSOS is sending alerts...
        </p>
      </div>
    </div>
  );
}