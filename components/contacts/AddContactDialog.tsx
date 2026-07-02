"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contacts/ContactForm";

interface AddContactDialogProps {
  disabled?: boolean;
}

export default function AddContactDialog({
  disabled = false,
}: AddContactDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button disabled={disabled}>
          <Plus className="mr-2 h-4 w-4" />
          Add Contact
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Emergency Contact</DialogTitle>

          <DialogDescription>
            Add one of your trusted emergency contacts. You can add a maximum
            of five contacts.
          </DialogDescription>
        </DialogHeader>

        <ContactForm
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}