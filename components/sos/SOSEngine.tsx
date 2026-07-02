"use client";

import { UserSettings } from "@/lib/types/settings";
import EmergencyEffects from "./EmergencyEffects";
import CountdownPopup from "./CountdownPopup";
import ShakeDetector from "./ShakeDetector";

import { useSOS } from "./SOSProvider";

interface Props {
  settings: UserSettings;
}

export default function SOSEngine({
  settings,
}: Props) {
  const {
    open,
    alarmActive,
    startSOS,
    cancelSOS,
    continueSOS,
  } = useSOS();

  return (
    <>
      <ShakeDetector
        threshold={settings.shakeSensitivity}
        onEmergencyDetected={startSOS}
      />

      <CountdownPopup
        open={open}
        seconds={settings.countdown}
        onCancel={cancelSOS}
        onContinue={continueSOS}
      />

    <EmergencyEffects
  active={alarmActive}
  volume={settings.alarmVolume}
    vibrationEnabled={settings.vibration}
/>      
    </>
  );
}