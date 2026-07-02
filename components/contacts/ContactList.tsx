import { EmergencyContact } from "@prisma/client";
import ContactCard from "./ContactCard";

interface Props {
    contacts: EmergencyContact[];
}

export default function ContactList({
    contacts,
}: Props) {

    return (

        <div className="grid gap-4 md:grid-cols-2">

            {contacts.map((contact) => (

                <ContactCard
                    key={contact.id}
                    contact={contact}
                />

            ))}

        </div>

    );

}