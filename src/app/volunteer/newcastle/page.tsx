import NewcastleVolunteerPage from "../../../screens/volunteer/NewcastleVolunteerPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/volunteer/newcastle");

export default function Page() {
  return <NewcastleVolunteerPage />;
}