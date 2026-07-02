import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default async function WelcomeCard() {
  const user = await currentUser();

  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <Card className="border-0 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg">
      <CardContent className="flex items-center justify-between p-8">
        <div>
          <h1 className="text-3xl font-bold">
            Hello, {user?.firstName ?? "Guardian"} 👋
          </h1>

          <p className="mt-2 text-red-100">
            Stay safe. GuardianSOS is actively protecting you.
          </p>

          <p className="mt-4 text-sm text-red-200">
            {today}
          </p>
        </div>

        <ShieldCheck className="h-20 w-20 opacity-80" />
      </CardContent>
    </Card>
  );
}