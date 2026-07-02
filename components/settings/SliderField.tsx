"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Slider } from "@/components/ui/slider";

interface SliderFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  min: number;
  max: number;
  step?: number;
}

export default function SliderField<T extends FieldValues>({
  control,
  name,
  label,
  description,
  min,
  max,
  step = 1,
}: SliderFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>{label}</FormLabel>

            <span className="text-sm font-medium">
              {field.value}%
            </span>
          </div>

          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              value={[field.value]}
              onValueChange={(value) => field.onChange(value[0])}
            />
          </FormControl>

          {description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}