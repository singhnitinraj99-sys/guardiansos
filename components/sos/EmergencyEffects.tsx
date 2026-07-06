"use client";

import { useAlarm } from "@/hooks/useAlarm";
import { useVibration } from "@/hooks/useVibration";

import FlashScreen from "./FlashScreen";
import EmergencyDashboard from "./EmergencyDashboard";
import EmergencyWorkflow from "./EmergencyWorkflow";

interface Props {
  active: boolean;
  volume: number;
  vibrationEnabled: boolean;
  locationEnabled: boolean;
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

  return (
    <>
      <FlashScreen active={active} />

      <EmergencyDashboard />

      <EmergencyWorkflow />
    </>
  );
}