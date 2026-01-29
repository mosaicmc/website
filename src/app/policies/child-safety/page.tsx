import ChildSafetyPolicyPage from "../../../screens/policies/ChildSafetyPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/child-safety");

export default function Page() {
  return <ChildSafetyPolicyPage />;
}