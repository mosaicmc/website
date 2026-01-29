import WhistleblowerPolicyPage from "../../../screens/policies/WhistleblowerPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/whistleblower");

export default function Page() {
  return <WhistleblowerPolicyPage />;
}