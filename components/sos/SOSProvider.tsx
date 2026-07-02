"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface SOSContextType {
  open: boolean;
  isRunning: boolean;
  alarmActive: boolean;

  startSOS: () => void;
  cancelSOS: () => void;
  continueSOS: () => void;
}


const SOSContext = createContext<SOSContextType | null>(null);

export function SOSProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmActive, setAlarmActive] =
  useState(false);
  function startSOS() {
  if (isRunning) return;

  setOpen(true);
}

function cancelSOS() {
  setOpen(false);

  setAlarmActive(false);

  setIsRunning(false);
}

function continueSOS() {
  setOpen(false);

  setIsRunning(true);

  setAlarmActive(true);
  toast.success("GuardianSOS Activated");
}
  return (
    <SOSContext.Provider
      value={{
        open,
        isRunning,
        startSOS,
        cancelSOS,
        continueSOS,
        alarmActive,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
}

export function useSOS() {
  const context = useContext(SOSContext);

  if (!context) {
    throw new Error(
      "useSOS must be used inside SOSProvider"
    );
  }

  return context;
}