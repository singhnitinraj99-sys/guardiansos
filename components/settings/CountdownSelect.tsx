"use client";

import { Control } from "react-hook-form";
import { SettingsInput } from "@/lib/validations/settings";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  control: Control<SettingsInput>;
}

export default function CountdownSelect({
  control,
}: Props) {
  return (
    <FormField
      control={control}
      name="countdown"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Countdown</FormLabel>

          <FormDescription>
            Time before GuardianSOS starts the emergency process.
          </FormDescription>

          <Select
            value={String(field.value)}
            onValueChange={(value) => field.onChange(Number(value))}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <SelectItem value="3">3 Seconds</SelectItem>
              <SelectItem value="5">5 Seconds</SelectItem>
              <SelectItem value="7">7 Seconds</SelectItem>
              <SelectItem value="10">10 Seconds</SelectItem>
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}