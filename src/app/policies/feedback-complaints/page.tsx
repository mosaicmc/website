import FeedbackComplaintsPolicyPage from "../../../screens/policies/FeedbackComplaintsPolicyPage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/policies/feedback-complaints");

export default function Page() {
  return <FeedbackComplaintsPolicyPage />;
}