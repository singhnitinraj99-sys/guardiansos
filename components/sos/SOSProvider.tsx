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

export type SOSState =
  | "IDLE"
  | "COUNTDOWN"
  | "ACTIVE";

interface SOSContextType {
  state: SOSState;

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

export function SOSProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] =
    useState<SOSState>("IDLE");

  const [location, setLocation] =
    useState<LocationData | null>(null);

const [locationStatus, setLocationStatus] =
  useState<EmergencyStatus>("idle");

const [callStatus, setCallStatus] =
  useState<EmergencyStatus>("idle");

const [smsStatus, setSmsStatus] =
  useState<EmergencyStatus>("idle");

const [logStatus, setLogStatus] =
  useState<EmergencyStatus>("idle");
  
  const startSOS = useCallback(() => {
    if (state !== "IDLE") return;

    setState("COUNTDOWN");
  }, [state]);

  const cancelSOS = useCallback(() => {
    setState("IDLE");

    setLocation(null);

    setLocationStatus("idle");
    setCallStatus("idle");
    setSmsStatus("idle");
    setLogStatus("idle");
  }, []);

  const continueSOS = useCallback(() => {
    console.log("GuardianSOS Activated");

    setState("ACTIVE");

    toast.success("GuardianSOS Activated");
  }, []);

  const stopSOS = useCallback(() => {
    setState("IDLE");

    setLocation(null);

    setLocationStatus("idle");
    setCallStatus("idle");
    setSmsStatus("idle");
    setLogStatus("idle");

    toast.success("GuardianSOS Stopped");
  }, []);

  return (
    <SOSContext.Provider
      value={{
        state,

        open: state === "COUNTDOWN",
        isRunning: state === "ACTIVE",
        alarmActive: state === "ACTIVE",

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
    throw new Error(
      "useSOS must be used inside SOSProvider"
    );
  }

  return context;
}