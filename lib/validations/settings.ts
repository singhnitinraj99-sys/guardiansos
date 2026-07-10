import { z } from "zod";

export const SettingsSchema = z.object({
  shakeSensitivity: z.number().min(8).max(30),

  countdown: z.number().min(3).max(15),

  alarmVolume: z.number().min(0).max(100),

  vibration: z.boolean(),

  smsEnabled: z.boolean(),

  mapLocationEnabled: z.boolean(),

  liveLocationEnabled: z.boolean(),

  darkMode: z.boolean(),
});

export type SettingsInput = z.infer<typeof SettingsSchema>;