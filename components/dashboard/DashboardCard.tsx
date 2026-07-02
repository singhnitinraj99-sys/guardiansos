import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-full bg-red-100 p-4">
          <Icon className="h-7 w-7 text-red-600" />
        </div>
      </CardContent>
    </Card>
  );
}