import KnowledgeBasePage from "../../../screens/company/KnowledgeBasePage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/company/knowledge-base");

export default function Page() {
  return <KnowledgeBasePage />;
}