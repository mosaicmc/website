import CodeOfConductPolicyPage from "../../../screens/policies/CodeOfConductPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/code-of-conduct");

export default function Page() {
  return <CodeOfConductPolicyPage />;
}