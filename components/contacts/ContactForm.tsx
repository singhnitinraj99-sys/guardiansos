"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RelationType } from "@/lib/types/relations";
import { z } from "zod";
import { toast } from "sonner";
import { ContactSchema } from "@/lib/validations/contact";
import {
  createContact,
  updateContact,
} from "@/actions/contact.actions";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Controller } from "react-hook-form";


type FormValues = z.infer<typeof ContactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
  initialValues?: FormValues;
  contactId?: string;
}
export default function ContactForm({ onSuccess, initialValues, contactId }: ContactFormProps) {
  const [pending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: initialValues ?? {
      name: "",
      phone: "",
      relation: RelationType.FRIEND,
    },
  });

  useEffect(() => {
    form.reset(
      initialValues ?? {
        name: "",
        phone: "",
        relation: RelationType.FRIEND,
      }
    );
  }, [initialValues, form]);

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      try {
        if (contactId) {
          await updateContact(contactId, values);
          toast.success("Contact updated");
          onSuccess?.();
        } else {
          await createContact(values);
          toast.success("Contact added");
          form.reset();
          onSuccess?.();
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-md"
    >
      <input
        placeholder="Name"
        {...form.register("name")}
        className="w-full border rounded-md p-2"
      />

      <Controller
  control={form.control}
  name="phone"
  render={({ field }) => (
    <PhoneInput
      international
      defaultCountry="IN"
      placeholder="Enter phone number"
      value={field.value}
      onChange={(value) => field.onChange(value ?? "")}
      className="w-full rounded-md border p-2"
    />
  )}
/>


      <select
        {...form.register("relation")}
        className="w-full border rounded-md p-2"
      >
        {Object.values(RelationType).map((relation) => (
          <option key={relation} value={relation}>
            {relation}
          </option>
        ))}
      </select>

      <button
        disabled={pending}
        className="bg-red-600 text-white px-4 py-2 rounded-md"
      >
        {pending ? "Saving..." : "Add Contact"}
      </button>
    </form>
  );
}