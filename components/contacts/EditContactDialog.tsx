"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { EmergencyContact } from "@/lib/types/contacts";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";

interface Props {
  contact: EmergencyContact;
}

export default function EditContactDialog({
  contact,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Edit Contact
          </DialogTitle>
        </DialogHeader>

        <ContactForm
          contactId={contact.id}
          initialValues={{
            name: contact.name,
            phone: contact.phone,
            relation: contact.relation,
          }}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}