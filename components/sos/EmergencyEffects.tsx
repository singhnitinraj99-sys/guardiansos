"use client";

import { useAlarm } from "@/hooks/useAlarm";
import { useVibration } from "@/hooks/useVibration";
import FlashScreen from "./FlashScreen";
import SOSOverlay from "./SOSOverlay";
import EmergencyDashboard from "./EmergencyDashboard";
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

  return (
  <>
    <FlashScreen active={active} />

    <EmergencyDashboard />
  </>
);

}