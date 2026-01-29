import AccessibilityPage from "../../screens/AccessibilityPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/accessibility");

export default function Page() {
  return <AccessibilityPage />;
}