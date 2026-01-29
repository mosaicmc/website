import NewsPage from "../../../screens/company/NewsPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/company/news");

export default function Page() {
  return <NewsPage />;
}