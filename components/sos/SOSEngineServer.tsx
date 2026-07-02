import { getSettings } from "@/actions/settings.actions";
import SOSEngine from "./SOSEngine";

export default async function SOSEngineServer() {
  const settings = await getSettings();

  return <SOSEngine settings={settings} />;
}