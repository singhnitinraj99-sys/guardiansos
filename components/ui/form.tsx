"use client";

import * as React from "react";
import {
  Controller,
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import { cn } from "@/lib/utils";

type RenderProp<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = (
  args: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: any;
  }
) => React.ReactNode;

const FormFieldContext = React.createContext<{ error?: string } | null>(null);

export function Form({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  render,
}: {
  control: Control<TFieldValues>;
  name: TName;
  render: RenderProp<TFieldValues, TName>;
}) {
  return (
    <Controller
      control={control as any}
      name={name as any}
      render={({ field, fieldState }) => (
        <FormFieldContext.Provider value={{ error: fieldState.error?.message }}>
          {render({ field: field as any, fieldState })}
        </FormFieldContext.Provider>
      )}
    />
  );
}

export function FormItem({ children, className }: any) {
  return <div className={cn("", className)}>{children}</div>;
}

export function FormLabel({ children, className, ...props }: any) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </label>
  );
}

export function FormControl({ children, className }: any) {
  return <div className={cn("", className)}>{children}</div>;
}

export function FormDescription({ children, className }: any) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function FormMessage({ className }: any) {
  const ctx = React.useContext(FormFieldContext);

  if (!ctx?.error) return null;

  return <p role="alert" className={cn("text-sm text-destructive", className)}>{ctx.error}</p>;
}
