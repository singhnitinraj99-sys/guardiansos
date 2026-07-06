"use client";

import {
  CheckCircle2,
  LoaderCircle,
  XCircle,
  Circle,
} from "lucide-react";

import { EmergencyStatus } from "@/types/emergency";

interface Props {
  title: string;
  status: EmergencyStatus;
}

export default function EmergencyStatusCard({
  title,
  status,
}: Props) {
  function renderIcon() {
    switch (status) {
      case "loading":
        return (
          <LoaderCircle className="h-5 w-5 animate-spin text-yellow-500" />
        );

      case "completed":
      case "success":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        );

      case "failed":
        return (
          <XCircle className="h-5 w-5 text-red-500" />
        );

      default:
        return (
          <Circle className="h-5 w-5 text-gray-500" />
        );
    }
  }

  function renderLabel() {
    switch (status) {
      case "loading":
        return "Processing";

      case "completed":
      case "success":
        return "Completed";

      case "failed":
        return "Failed";

      case "waiting":
      case "pending":
      case "idle":
      default:
        return "Waiting";
    }
  }

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <span>{title}</span>

        <div className="flex items-center gap-2">
          {renderIcon()}

          <span>{renderLabel()}</span>
        </div>
      </div>
    </div>
  );
}

