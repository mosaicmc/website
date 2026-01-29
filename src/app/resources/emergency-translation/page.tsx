import EmergencyTranslationPage from "../../../screens/resources/EmergencyTranslationPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/emergency-translation");

export default function Page() {
  return <EmergencyTranslationPage />;
}