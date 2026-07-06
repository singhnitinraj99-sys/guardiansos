import { EmergencyContact } from "@/lib/types/contacts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import EditContactDialog from "./EditContactDialog";
import DeleteContactDialog from "./DeleteContactDialog";
import PrimaryButton from "./PrimaryButton";
import { relationMap } from "@/lib/contact-relations";


interface Props {
  contact: EmergencyContact;
}

export default function ContactCard({ contact }: Props) {
  const relation = relationMap[contact.relation];
  const Icon = relation.icon;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{contact.name}</h3>

          <p className="text-muted-foreground">{contact.phone}</p>

          <Badge variant="secondary" className="mt-2 bg-gray-200 text-gray-950">
            <Icon className="mr-1 h-3 w-3" />
            {relation.label}
          </Badge>
        </div>

        {contact.isPrimary && <Badge>Primary</Badge>}
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {!contact.isPrimary && <PrimaryButton id={contact.id} />}

        <EditContactDialog contact={contact} />

        <DeleteContactDialog id={contact.id} name={contact.name} />
      </div>
    </Card>
  );
}