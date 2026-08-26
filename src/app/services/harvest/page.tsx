import HarvestPage from "../../../screens/services/HarvestPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/services/harvest");

export default function Page() {
  return (
    <HarvestPage
      employerHubspotPortalId={process.env.HARVEST_EMPLOYER_HUBSPOT_PORTAL_ID ?? ""}
      employerHubspotFormId={process.env.HARVEST_EMPLOYER_HUBSPOT_FORM_ID ?? ""}
    />
  );
}
