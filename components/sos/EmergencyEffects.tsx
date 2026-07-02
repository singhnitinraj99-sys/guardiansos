"use client";

import { useAlarm } from "@/hooks/useAlarm";
import { useVibration } from "@/hooks/useVibration";

interface Props {
  active: boolean;
  volume: number;
  vibrationEnabled: boolean;
}

export default function EmergencyEffects({
  active,
  volume,
  vibrationEnabled,
}: Props) {
  useAlarm({
    active,
    volume,
  });

  useVibration({
    active,
    enabled: vibrationEnabled,
  });

  return null;
}