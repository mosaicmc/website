import CareersPage from "../../../screens/company/CareersPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/company/careers");

export default function Page() {
  return <CareersPage />;
}