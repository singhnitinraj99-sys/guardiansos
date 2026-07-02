"use client";

import { useEffect } from "react";
import { playAlarm, stopAlarm } from "@/lib/alarm";

interface Props {
  active: boolean;
  volume: number;
}

export function useAlarm({
  active,
  volume,
}: Props) {
  useEffect(() => {
    if (!active) {
      stopAlarm();
      return;
    }

    playAlarm(volume / 100);

    return () => stopAlarm();
  }, [active, volume]);
}