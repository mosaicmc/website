import GetInvolvedPage from "../../screens/GetInvolvedPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/get-involved");

export default function Page() {
  return <GetInvolvedPage />;
}