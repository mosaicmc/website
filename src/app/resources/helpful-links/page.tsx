import HelpfulLinksPage from "../../../screens/resources/HelpfulLinksPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/helpful-links");

export default function Page() {
  return <HelpfulLinksPage />;
}