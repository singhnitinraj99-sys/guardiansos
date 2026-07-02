"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { ShieldAlert } from "lucide-react";
import { useCountdown } from "@/hooks/useCountdown";

interface Props {
  open: boolean;
  seconds: number;
  onCancel: () => void;
  onContinue: () => void;
}

export default function CountdownPopup({
  open,
  seconds,
  onCancel,
  onContinue,
}: Props) {
  const count = useCountdown({
    seconds,
    active: open,
    onComplete: onContinue,
  });

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center">
            <ShieldAlert className="h-14 w-14 text-red-500" />
          </div>

          <AlertDialogTitle className="text-center text-2xl">
            Emergency Detected
          </AlertDialogTitle>

          <AlertDialogDescription className="text-center">
            GuardianSOS detected two strong shakes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Calling your emergency contact in
          </p>

          <h1 className="mt-3 text-6xl font-bold">
            {count}
          </h1>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction onClick={onContinue}>
            Continue Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}