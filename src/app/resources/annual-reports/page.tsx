import AnnualReportsPage from "../../../screens/resources/AnnualReportsPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/annual-reports");

export default function Page() {
  return <AnnualReportsPage />;
}