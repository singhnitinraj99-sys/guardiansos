"use client";

import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  pending: boolean;
}

export default function SaveButton({ pending }: Props) {
  return (
    <div className="flex justify-end">
      <Button
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </>
        )}
      </Button>
    </div>
  );
}