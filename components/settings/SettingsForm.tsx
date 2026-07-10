"use client";

import { useTransition } from "react";
import { UserSettings } from "@/lib/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";


import { SettingsInput, SettingsSchema } from "@/lib/validations/settings";
import { updateSettings } from "@/actions/settings.actions";
import SliderField from "./SliderField";
import CountdownSelect from "./CountdownSelect";
import SwitchField from "./SwitchField";
import SaveButton from "./SaveButton";
import { Form } from "../ui/form";


interface Props {
  settings: UserSettings;
}

export default function SettingsForm({ settings }: Props) {
  const [pending, startTransition] = useTransition();

  const form = useForm<SettingsInput>({
    resolver: zodResolver(SettingsSchema),

   defaultValues: {
    shakeSensitivity: settings.shakeSensitivity,
    countdown: settings.countdown,
    alarmVolume: settings.alarmVolume,
    vibration: settings.vibration,
    smsEnabled: settings.smsEnabled,
    mapLocationEnabled: settings.mapLocationEnabled,
    liveLocationEnabled: settings.liveLocationEnabled,
    darkMode: settings.darkMode,
},
  });

  function onSubmit(values: SettingsInput) {
    startTransition(async () => {
      try {
        await updateSettings(values);

        toast.success("Settings updated successfully");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
       <SliderField
  control={form.control}
  name="shakeSensitivity"
  label="Shake Sensitivity"
  description="Adjust how sensitive shake detection should be."
  min={8}
  max={30}
/>

        <CountdownSelect control={form.control} />

        <SliderField
          control={form.control}
          name="alarmVolume"
          label="Alarm Volume"
          description="Emergency alarm loudness."
          min={0}
          max={100}
        />

        <SwitchField
          control={form.control}
          name="vibration"
          label="Vibration"
          description="Vibrate during SOS."
        />

        <SwitchField
          control={form.control}
          name="smsEnabled"
          label="SMS Alerts"
          description="Send emergency SMS."
        />

    <SwitchField
    control={form.control}
    name="mapLocationEnabled"
    label="Current Map Location"
    description="Send a Google Maps link in the SOS SMS."
/>

<SwitchField
    control={form.control}
    name="liveLocationEnabled"
    label="Live Location Tracking"
    description="Continuously update your location until SOS ends."
/>
        <SwitchField
          control={form.control}
          name="darkMode"
          label="Dark Mode"
          description="Enable dark theme."
        />

        <SaveButton pending={pending} />
      </form>
    </Form>
  );
}