"use client";

import { useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { setPrimaryContact } from "@/actions/contact.actions";

interface Props {
  id: string;
}

export default function PrimaryButton({ id }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          try {
            await setPrimaryContact(id);
            toast.success("Primary contact updated");
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong"
            );
          }
        })
      }
    >
      <Star className="mr-2 h-4 w-4" />
      Make Primary
    </Button>
  );
}