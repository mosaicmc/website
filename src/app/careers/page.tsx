import { redirect } from "next/navigation";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/careers");

export default function Page() {
  redirect("/company/careers");
}