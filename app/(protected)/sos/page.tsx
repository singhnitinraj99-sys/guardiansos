"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { useSOS } from "@/components/sos/SOSProvider";

export default function SOSPage() {
  const { startSOS } = useSOS();

  return (
    <div className="container  space-y-8">
      <PageHeader
        title="SOS Trigger"
        description="Shake your phone twice to trigger an emergency or test your GuardianSOS setup."
      />

      <div className="mx-auto flex max-w-md flex-col gap-4">
        <Button
          size="lg"
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={() => startSOS("REAL")}
        >
          🚨 Start Emergency SOS
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => startSOS("TEST")}
        >
          🧪 Test SOS
        </Button>
      </div>
    </div>
  );
}