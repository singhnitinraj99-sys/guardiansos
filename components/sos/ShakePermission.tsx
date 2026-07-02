"use client";

import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { toast } from "sonner";

interface Props {
  onGranted: () => void;
}

export default function ShakePermission({ onGranted }: Props) {
  async function requestPermission() {
    try {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
      ) {
        const response = await (DeviceMotionEvent as any).requestPermission();

        if (response !== "granted") {
          toast.error("Motion permission denied");
          return;
        }
      }

      toast.success("Motion Enabled");

      onGranted();
    } catch {
      toast.error("Unable to request motion permission");
    }
  }

  return (
    <div className="rounded-xl border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Activity className="h-6 w-6" />

        <div>
          <h3 className="font-semibold">
            Enable Motion Detection
          </h3>

          <p className="text-sm text-muted-foreground">
            GuardianSOS needs motion access to detect emergency shakes.
          </p>
        </div>
      </div>

      <Button onClick={requestPermission}>
        Enable Motion Detection
      </Button>
    </div>
  );
}