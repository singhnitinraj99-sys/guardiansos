"use client";

import { PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCall } from "@/hooks/useCall";

interface Props {
  phone: string;
}

export default function CallButton({ phone }: Props) {
  const { startCall } = useCall();

  return (
    <Button
      onClick={() => startCall(phone)}
      className="w-full"
      size="lg"
    >
      <PhoneCall className="mr-2 h-5 w-5" />
      Call Primary Contact
    </Button>
  );
}