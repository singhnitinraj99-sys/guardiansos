"use client";

import { useCallback } from "react";
import { callPhone } from "@/lib/phone";

export function useCall() {
  const startCall = useCallback((phone: string) => {
    callPhone(phone);
  }, []);

  return {
    startCall,
  };
}