"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useAutoSave<T>(
  save: (values: T) => Promise<any>
) {
  const [saving, setSaving] = useState(false);

  const autoSave = async (values: T) => {
    try {
      setSaving(true);

      await save(values);

      toast.success("Settings saved");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    autoSave,
  };
}