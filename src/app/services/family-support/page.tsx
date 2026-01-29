import FamilySupportPage from "../../../screens/services/FamilySupportPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/family-support");

export default function Page() {
  return <FamilySupportPage />;
}