import ResourcesPage from "../../screens/ResourcesPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources");

export default function Page() {
  return <ResourcesPage />;
}