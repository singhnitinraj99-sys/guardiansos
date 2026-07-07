
"use server";


import { startEmergencyCall } from "@/actions/call.actions";
import { getEmergencyContacts } from '@/lib/emergency-contact';


export async function startEmergencyCallWorkflow() {
  try {
    console.log("=== VOICE WORKFLOW START ===");

    const { contacts } = await getEmergencyContacts();

    console.log("Contacts found:", contacts.length);

    const results = [];

    for (const contact of contacts) {
      console.log("Calling contact:", contact.name, contact.phone);

      const result = await startEmergencyCall(
        contact.phone,
        contact.id,
        contact.name
      );

      console.log("Call result:", result);

      results.push({
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        success: result.success,
        sid: result.sid,
        status: result.status,
      });

      if (result.success) {
        break;
      }
    }

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error("Workflow Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Workflow failed",
    };
  }
}