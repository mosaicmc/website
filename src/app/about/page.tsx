import AboutPage from "../../screens/AboutPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/about");

export default function Page() {
  return <AboutPage />;
}