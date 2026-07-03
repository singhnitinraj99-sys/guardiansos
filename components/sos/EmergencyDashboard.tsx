"use client";

import {
  ShieldAlert,
  Volume2,
  Smartphone,
  MapPinned,
  MessageCircle,
} from "lucide-react";

import { useSOS } from "./SOSProvider";

import EmergencyStatusCard from "./EmergencyStatusCard";
import StopSOSDialog from "./StopSOSDialog";


export default function EmergencyDashboard() {
  const { alarmActive } = useSOS();

  if (!alarmActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/90 backdrop-blur-md overflow-y-auto">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-6 p-6">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-20 w-20 text-red-500 animate-pulse" />

          <h1 className="mt-4 text-4xl font-bold">
            EMERGENCY MODE
          </h1>

          <p className="mt-2 text-muted-foreground">
            GuardianSOS is handling your emergency.
          </p>
        </div>

        <EmergencyStatusCard
          title="Alarm"
          status="ACTIVE"
        />

        <EmergencyStatusCard
          title="Vibration"
          status="ACTIVE"
        />

        <EmergencyStatusCard
          title="Location"
          status="Waiting..."
        />

        <EmergencyStatusCard
          title="Calling"
          status="Waiting..."
        />

        <EmergencyStatusCard
          title="SMS"
          status="Waiting..."
        />

        <StopSOSDialog />
      </div>
    </div>
  );
}