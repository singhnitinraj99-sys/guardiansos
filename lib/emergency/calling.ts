import { callPhone } from "@/lib/phone";

export async function runCallingStep(
  phone: string
) {
  callPhone(phone);

  return true;
}