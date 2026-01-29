import ServicesPage from "../../screens/ServicesPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services");

export default function Page() {
  return <ServicesPage />;
}