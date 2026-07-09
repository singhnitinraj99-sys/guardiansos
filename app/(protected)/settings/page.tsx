import { getSettings } from "@/actions/settings.actions";
import SettingsForm from "@/components/settings/SettingsForm";
import PageHeader from "@/components/shared/PageHeader";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-8">
      <div>
          <PageHeader
                        title="SOS Settings"
                        description="Configure how GuardianSOS behaves during an emergency."
                      />
              
      
      </div>
     
     <SettingsForm settings={settings} />
      
    </div>
  );
}