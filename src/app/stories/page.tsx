import StoriesPage from "../../screens/StoriesPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/stories");

export default function Page() {
  return <StoriesPage />;
}