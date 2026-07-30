import StoryDetailPage from "../../../screens/StoryDetailPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/stories/orien");

export default function Page() {
  return <StoryDetailPage storyId="orien" />;
}
