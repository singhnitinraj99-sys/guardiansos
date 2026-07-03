import { getEmergencyContacts } from "@/actions/contact.actions";

export async function getWorkflowContacts() {
  const contacts = await getEmergencyContacts();

  return contacts;
}