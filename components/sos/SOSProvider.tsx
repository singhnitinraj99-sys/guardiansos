"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

import { toast } from "sonner";
import { EmergencyStatus } from "@/types/emergency";
import { LocationData } from "@/types/location";

interface SOSContextType {
  open: boolean;
  isRunning: boolean;
  alarmActive: boolean;

  location: LocationData | null;
  setLocation: Dispatch<SetStateAction<LocationData | null>>;
  locationStatus: EmergencyStatus;
  setLocationStatus: Dispatch<SetStateAction<EmergencyStatus>>;

  callStatus: EmergencyStatus;
  setCallStatus: Dispatch<SetStateAction<EmergencyStatus>>;

  smsStatus: EmergencyStatus;
  setSmsStatus: Dispatch<SetStateAction<EmergencyStatus>>;

  logStatus: EmergencyStatus;
  setLogStatus: Dispatch<SetStateAction<EmergencyStatus>>;
  startSOS: () => void;
  cancelSOS: () => void;
  continueSOS: () => void;
  stopSOS: () => void;
}

const SOSContext = createContext<SOSContextType | null>(null);

export function SOSProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const [alarmActive, setAlarmActive] = useState(false);

  const [location, setLocation] = useState<LocationData | null>(null);

  const [locationStatus, setLocationStatus] = useState<EmergencyStatus>("idle");

  const [callStatus, setCallStatus] = useState<EmergencyStatus>("idle");

  const [smsStatus, setSmsStatus] = useState<EmergencyStatus>("idle");

  const [logStatus, setLogStatus] = useState<EmergencyStatus>("idle");

  const startSOS = useCallback(() => {
    if (isRunning) return;

    setOpen(true);
  }, [isRunning]);

  const cancelSOS = useCallback(() => {
    setOpen(false);

    setAlarmActive(false);

    setIsRunning(false);

    setLocation(null);
  }, []);

  const continueSOS = useCallback(() => {
    setOpen(false);
    setIsRunning(true);
    setAlarmActive(true);

    toast.success("GuardianSOS Activated");
  }, []);

  const stopSOS = useCallback(() => {
    setOpen(false);

    setAlarmActive(false);

    setIsRunning(false);

    setLocation(null);

    toast.success("GuardianSOS Stopped");
  }, []);

  return (
    <SOSContext.Provider
      value={{
        open,
        isRunning,
        alarmActive,

        location,
        setLocation,

        locationStatus,
        setLocationStatus,

        callStatus,
        setCallStatus,

        smsStatus,
        setSmsStatus,

        logStatus,
        setLogStatus,

        startSOS,
        cancelSOS,
        continueSOS,
        stopSOS,
      }}
    >
      {children}
    </SOSContext.Provider>
  );
}

export function useSOS() {
  const context = useContext(SOSContext);

  if (!context) {
    throw new Error("useSOS must be used inside SOSProvider");
  }

  return context;
}
