import { getSettings } from "@/actions/settings.actions";
import SettingsForm from "@/components/settings/SettingsForm";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          SOS Settings
        </h1>

        <p className="text-muted-foreground">
          Configure how GuardianSOS behaves during an emergency.
        </p>
      </div>
     
     <SettingsForm settings={settings} />
      
    </div>
  );
}