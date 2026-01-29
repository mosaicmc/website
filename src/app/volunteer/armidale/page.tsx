import ArmidaleVolunteerPage from "../../../screens/volunteer/ArmidaleVolunteerPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/volunteer/armidale");

export default function Page() {
  return <ArmidaleVolunteerPage />;
}