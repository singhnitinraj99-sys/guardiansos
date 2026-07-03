"use client";

import { Button } from "@/components/ui/button";
import { ShieldOff } from "lucide-react";

import { useSOS } from "./SOSProvider";

export default function StopSOSButton() {
  const {
    alarmActive,
    stopSOS,
  } = useSOS();

  if (!alarmActive) return null;

  return (
    <Button
      size="lg"
      variant="destructive"
      onClick={stopSOS}
      className="
        fixed
        bottom-8
        left-1/2
        -translate-x-1/2
        z-[10000]
        rounded-full
        px-8
      "
    >
      <ShieldOff className="mr-2 h-5 w-5" />

      STOP SOS
    </Button>
  );
}