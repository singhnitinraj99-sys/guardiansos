import { ShieldAlert } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <ShieldAlert className="h-8 w-8 text-red-600" />
      <div>
        <h1 className="text-lg font-bold">GuardianSOS</h1>
        <p className="text-xs text-muted-foreground">
          Your Emergency Companion
        </p>
      </div>
    </div>
  );
}