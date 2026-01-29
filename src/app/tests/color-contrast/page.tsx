import ColorContrastTestPage from "../../../screens/tests/ColorContrastTestPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/tests/color-contrast");

export default function Page() {
  return <ColorContrastTestPage />;
}