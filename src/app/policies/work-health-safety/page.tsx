import WorkHealthSafetyPolicyPage from "../../../screens/policies/WorkHealthSafetyPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/work-health-safety");

export default function Page() {
  return <WorkHealthSafetyPolicyPage />;
}