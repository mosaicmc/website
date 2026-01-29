import HomePage from "../screens/HomePage";
import { getMetadata } from "@/app/page-metadata";
export const metadata = getMetadata("/");

export default function Page() {
  return <HomePage />;
}
