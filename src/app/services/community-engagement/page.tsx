import CommunityEngagementPage from "../../../screens/services/CommunityEngagementPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/community-engagement");

export default function Page() {
  return <CommunityEngagementPage />;
}