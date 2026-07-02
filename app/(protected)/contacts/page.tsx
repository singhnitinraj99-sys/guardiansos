import { getContacts } from "@/actions/contact.actions";
import AddContactDialog from "@/components/contacts/AddContactDialog";
import ContactList from "@/components/contacts/ContactList";
import EmptyState from "@/components/contacts/EmptyState";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency Contacts</h1>
          <p className="text-muted-foreground">Manage trusted contacts for your safety alerts.</p>
        </div>

        <AddContactDialog />
      </div>

      <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Contact slots</p>
            <p className="text-2xl font-semibold">{contacts.length}/5</p>
          </div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {5 - contacts.length} slots left
          </span>
        </div>
      </div>

      {contacts.length === 0 ? (
        <EmptyState />
      ) : (
        <ContactList contacts={contacts} />
      )}
    </div>
  );
}
