import type { RelationType } from "@/lib/types/relations";

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: RelationType;
  isPrimary: boolean;
}
