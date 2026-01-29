import FAQPage from "../../../screens/resources/FAQPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/faqs");

export default function Page() {
  return <FAQPage />;
}