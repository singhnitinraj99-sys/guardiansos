import { RelationType } from "@/lib/types/relations";
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),

  relation: z.nativeEnum(RelationType),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+[1-9]\d{7,14}$/, "Enter a valid phone number"),
});