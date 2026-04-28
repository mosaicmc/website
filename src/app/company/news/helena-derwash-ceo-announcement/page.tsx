import { getMetadata } from "@/app/page-metadata";
import HelenaDerwashCEOAnnouncement from "@/screens/company/HelenaDerwashCEOAnnouncement";

export const metadata = getMetadata("/company/news/helena-derwash-ceo-announcement");

export default function Page() {
  return <HelenaDerwashCEOAnnouncement />;
}
