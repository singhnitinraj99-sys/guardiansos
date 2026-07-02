import { ShieldAlert } from "lucide-react";

export default function EmptyState() {

    return (

        <div className="border rounded-xl p-12 text-center">

            <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
                No Emergency Contacts
            </h2>

            <p className="text-muted-foreground mt-2">
                Add up to five trusted contacts that GuardianSOS can notify during an emergency.
            </p>

        </div>

    );

}