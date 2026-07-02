"use client";

import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Switch } from "@/components/ui/switch";

interface SwitchFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
}

export default function SwitchField<T extends FieldValues>({
  control,
  name,
  label,
  description,
}: SwitchFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <FormLabel>{label}</FormLabel>

            {description && (
              <FormDescription>
                {description}
              </FormDescription>
            )}
          </div>

          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}