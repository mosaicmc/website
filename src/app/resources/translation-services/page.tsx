import TranslationServicesPage from "../../../screens/resources/TranslationServicesPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/resources/translation-services");

export default function Page() {
  return <TranslationServicesPage />;
}