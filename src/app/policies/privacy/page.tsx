import PrivacyPolicyPage from "../../../screens/policies/PrivacyPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/privacy");

export default function Page() {
  return <PrivacyPolicyPage />;
}