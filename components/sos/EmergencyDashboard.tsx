"use client";

import { ShieldAlert } from "lucide-react";

import { useSOS } from "./SOSProvider";
import EmergencyStatusCard from "./EmergencyStatusCard";
import StopSOSDialog from "./StopSOSDialog";
import CallHandler from "./CallHandler";

export default function EmergencyDashboard() {
  const {
    mode,
    alarmActive,
    locationStatus,
    callStatus,
    smsStatus,
    logStatus,
  } = useSOS();

  if (!alarmActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center gap-5 p-6">
        <div className="text-center">
          <ShieldAlert
            className={`mx-auto h-20 w-20 animate-pulse ${
              mode === "TEST" ? "text-blue-500" : "text-red-500"
            }`}
          />
          <h1 className="mt-4 text-4xl font-bold">
            {mode === "TEST" ? "TEST MODE" : "EMERGENCY MODE"}
          </h1>

          <p className="mt-2 text-muted-foreground">
  {mode === "TEST"
    ? "GuardianSOS is testing your emergency setup. No SMS or calls will be made."
    : "GuardianSOS is handling your emergency."}
</p>
        </div>

        <EmergencyStatusCard
  title={mode === "TEST" ? "Alarm Ready" : "Alarm"}
  status={alarmActive ? "success" : "idle"}
/>

        <EmergencyStatusCard
          title={mode === "TEST" ? "Vibration Ready" : "Vibration"}
          status={alarmActive ? "success" : "idle"}
        />

        <EmergencyStatusCard title="Location" status={locationStatus} />

        <div className="space-y-3">
          <EmergencyStatusCard 
          title={mode === "TEST" ? "Call Service" : "Calling"}
           status={callStatus} />

          {/* Temporarily keep CallHandler commented */}
          {/* <CallHandler /> */}
        </div>

        <EmergencyStatusCard 
        title={mode === "TEST" ? "SMS Service" : "SMS"}
        status={smsStatus} />

        <EmergencyStatusCard 
        title={mode === "TEST" ? "System Check" : "SOS Log"}
        status={logStatus} />

        {mode === "TEST" && (
  <div className="rounded-lg border border-blue-300 bg-blue-50 p-4 text-center text-sm text-blue-700">
    🧪 Test completed safely. No emergency SMS, phone calls, or SOS incident
    were created.
  </div>
)}

        <StopSOSDialog />
      </div>
    </div>
  );
}
