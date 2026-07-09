"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8 flex items-start gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <div>
        <h1 className="text-3xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}