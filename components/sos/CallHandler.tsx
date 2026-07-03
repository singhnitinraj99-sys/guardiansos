import { getPrimaryContact } from "@/actions/contact.actions";
import CallButton from "./CallButton";

export default async function CallHandler() {
  const contact = await getPrimaryContact();

  if (!contact) {
    return (
      <p className="text-center text-sm text-red-500">
        No primary contact found.
      </p>
    );
  }

  return <CallButton phone={contact.phone} />;
}