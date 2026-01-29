import QualityManagementPolicyPage from "../../../screens/policies/QualityManagementPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/quality-management");

export default function Page() {
  return <QualityManagementPolicyPage />;
}