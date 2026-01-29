import SettlementSupportPage from "../../../screens/services/SettlementSupportPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/settlement-support");

export default function Page() {
  return <SettlementSupportPage />;
}