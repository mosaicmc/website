import AgedCarePage from "../../../screens/services/AgedCarePage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/aged-care");

export default function Page() {
  return <AgedCarePage />;
}