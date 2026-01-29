import DonatePage from "../../screens/DonatePage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/donate");

export default function Page() {
  return <DonatePage />;
}