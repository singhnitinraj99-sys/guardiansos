import { currentUser } from "@clerk/nextjs/server";

export async function verifyAdmin() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Unauthorized");
  }

  const email =
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error("Email not found");
  }

  const adminEmails =
    process.env.ADMIN_EMAILS
      ?.split(",")
      .map((email) => email.trim().toLowerCase()) ?? [];

  if (!adminEmails.includes(email.toLowerCase())) {
    throw new Error("Access denied");
  }

  return clerkUser;
}