import TamworthVolunteerPage from "../../../screens/volunteer/TamworthVolunteerPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/volunteer/tamworth");

export default function Page() {
  return <TamworthVolunteerPage />;
}