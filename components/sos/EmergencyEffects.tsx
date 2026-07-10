"use client";

import { useAlarm } from "@/hooks/useAlarm";
import { useVibration } from "@/hooks/useVibration";
import LiveTracking from "./LiveTracking";
import FlashScreen from "./FlashScreen";
import EmergencyDashboard from "./EmergencyDashboard";
import EmergencyWorkflow from "./EmergencyWorkflow";
import { useSOS } from "./SOSProvider";

interface Props {
  active: boolean;
  volume: number;
  vibrationEnabled: boolean;
  mapLocationEnabled: boolean;
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

  const {
    alarmActive,
    currentSOSLogId,
} = useSOS();
  return (
    <>
      <FlashScreen active={active} />

      <EmergencyDashboard />

      <EmergencyWorkflow />

      {alarmActive && currentSOSLogId && (
    <LiveTracking sosLogId={currentSOSLogId} />
)}
    </>
  );
}