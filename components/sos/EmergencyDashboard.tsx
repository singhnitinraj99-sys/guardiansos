"use client";

import { ShieldAlert } from "lucide-react";

import { useSOS } from "./SOSProvider";
import EmergencyStatusCard from "./EmergencyStatusCard";
import StopSOSDialog from "./StopSOSDialog";
import CallHandler from "./CallHandler";
import { useEmergencyWorkflow } from "@/hooks/useEmergencyWorkflow";

export default function EmergencyDashboard() {
  const {
    alarmActive,
    locationStatus,
    callStatus,
    smsStatus,
    logStatus,
  } = useSOS();

  const {
  workflow,
  updateStep,
} = useEmergencyWorkflow();

  if (!alarmActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-5 p-6">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-20 w-20 animate-pulse text-red-500" />

          <h1 className="mt-4 text-4xl font-bold">
            EMERGENCY MODE
          </h1>

          <p className="mt-2 text-muted-foreground">
            GuardianSOS is handling your emergency.
          </p>
        </div>

        <EmergencyStatusCard
          title="Alarm"
          status={alarmActive ? "success" : "idle"}
        />

        <EmergencyStatusCard
          title="Vibration"
          status={alarmActive ? "success" : "idle"}
        />

        <EmergencyStatusCard
          title="Location"
          status={workflow.location}
        />

        <div className="space-y-3">
          <EmergencyStatusCard
            title="Calling"
            status={workflow.call}
          />

          <CallHandler />
        </div>

        <EmergencyStatusCard
          title="SMS"
          status={workflow.sms}
        />

        <EmergencyStatusCard
          title="SOS Log"
          status={workflow.log}
        />

        <StopSOSDialog />
      </div>
    </div>
  );
}