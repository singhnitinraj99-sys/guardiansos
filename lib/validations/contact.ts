import { RelationType } from "@prisma/client";
import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),
  relation: z.nativeEnum(RelationType),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});
