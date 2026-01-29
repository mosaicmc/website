import DiversityInclusionPolicyPage from "../../../screens/policies/DiversityInclusionPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/diversity-inclusion");

export default function Page() {
  return <DiversityInclusionPolicyPage />;
}