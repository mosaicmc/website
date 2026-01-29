import CentralCoastVolunteerPage from "../../../screens/volunteer/CentralCoastVolunteerPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/volunteer/central-coast");

export default function Page() {
  return <CentralCoastVolunteerPage />;
}