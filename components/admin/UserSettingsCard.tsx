"use client";

import {
  Bell,
  MapPinned,
  Moon,
  Smartphone,
  Vibrate,
  Waves,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  settings: {
    shakeSensitivity: number;
    countdown: number;
    alarmVolume: number;
    vibration: boolean;
    smsEnabled: boolean;
    darkMode: boolean;
    liveLocationEnabled: boolean;
    mapLocationEnabled: boolean;
  } | null;
}

export default function UserSettingsCard({
  settings,
}: Props) {
  if (!settings) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground">
            No settings found.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-4 w-4 text-red-500" />
            Shake Sensitivity
          </div>

          <Badge>{settings.shakeSensitivity}</Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-yellow-500" />
            Countdown
          </div>

          <Badge>
            {settings.countdown} sec
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            🔊 Alarm Volume
          </div>

          <Badge>
            {settings.alarmVolume}%
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Vibrate className="h-4 w-4 text-blue-500" />
            Vibration
          </div>

          <Badge
            variant={
              settings.vibration
                ? "default"
                : "outline"
            }
          >
            {settings.vibration
              ? "Enabled"
              : "Disabled"}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-green-500" />
            SMS
          </div>

          <Badge
            variant={
              settings.smsEnabled
                ? "default"
                : "outline"
            }
          >
            {settings.smsEnabled
              ? "Enabled"
              : "Disabled"}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            📍 Live Location
          </div>

          <Badge
            variant={
              settings.liveLocationEnabled
                ? "default"
                : "outline"
            }
          >
            {settings.liveLocationEnabled
              ? "Enabled"
              : "Disabled"}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-red-500" />
            Google Maps
          </div>

          <Badge
            variant={
              settings.mapLocationEnabled
                ? "default"
                : "outline"
            }
          >
            {settings.mapLocationEnabled
              ? "Enabled"
              : "Disabled"}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-indigo-500" />
            Dark Mode
          </div>

          <Badge
            variant={
              settings.darkMode
                ? "default"
                : "outline"
            }
          >
            {settings.darkMode
              ? "Enabled"
              : "Disabled"}
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
}