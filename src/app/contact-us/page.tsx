import LocationsPage from "../../screens/LocationsPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/contact-us");

export default function Page() {
  return <LocationsPage />;
}