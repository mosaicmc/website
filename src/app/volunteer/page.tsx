import VolunteerLandingPage from "../../screens/volunteer/VolunteerLandingPage";
import { getMetadata } from "@/app/page-metadata";

export const metadata = getMetadata("/volunteer");

export default function Page() {
  return <VolunteerLandingPage />;
}

