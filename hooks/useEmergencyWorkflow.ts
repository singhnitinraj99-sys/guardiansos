"use client";

import { useState } from "react";

import { WorkflowState } from "@/lib/types/workflow";

export function useEmergencyWorkflow() {
  const [workflow, setWorkflow] =
    useState<WorkflowState>({
      location: "idle",
      call: "idle",
      sms: "idle",
      log: "idle",
    });

  function updateStep(
    step: keyof WorkflowState,
    status: WorkflowState[keyof WorkflowState]
  ) {
    setWorkflow((prev) => ({
      ...prev,
      [step]: status,
    }));
  }

  function reset() {
    setWorkflow({
      location: "idle",
      call: "idle",
      sms: "idle",
      log: "idle",
    });
  }

  return {
    workflow,
    updateStep,
    reset,
  };
}