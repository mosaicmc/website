import EmergencyServicesPage from "../../../screens/resources/EmergencyServicesPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/emergency-services");

export default function Page() {
  return <EmergencyServicesPage />;
}