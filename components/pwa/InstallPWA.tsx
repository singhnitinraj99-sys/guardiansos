"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export default function InstallPWA() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    function beforeInstall(
      e: Event
    ) {
      e.preventDefault();

      setPromptEvent(
        e as BeforeInstallPromptEvent
      );
    }

    function installedApp() {
      setInstalled(true);
    }

    window.addEventListener(
      "beforeinstallprompt",
      beforeInstall
    );

    window.addEventListener(
      "appinstalled",
      installedApp
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstall
      );

      window.removeEventListener(
        "appinstalled",
        installedApp
      );
    };
  }, []);

  async function install() {
    if (!promptEvent) return;

    await promptEvent.prompt();

    const choice =
      await promptEvent.userChoice;

    if (choice.outcome === "accepted") {
      setInstalled(true);
    }

    setPromptEvent(null);
  }

  if (installed || !promptEvent)
    return null;

  return (
    <Button
      onClick={install}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Install GuardianSOS
    </Button>
  );
}