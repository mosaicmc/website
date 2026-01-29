import { redirect } from "next/navigation";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/contact");

export default function Page() {
  redirect("/contact-us");
}