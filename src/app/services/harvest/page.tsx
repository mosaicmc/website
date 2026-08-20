import HarvestPage from "../../../screens/services/HarvestPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/harvest");

export default function Page() {
  return <HarvestPage />;
}
