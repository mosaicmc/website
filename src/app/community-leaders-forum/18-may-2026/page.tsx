import SharedDocumentPage from "../../../screens/shared/SharedDocumentPage";
import { getMetadata } from "@/app/page-metadata";

export const metadata = {
  ...getMetadata("/community-leaders-forum/18-may-2026"),
  title: { absolute: "Mosaic Leaders Forum — Event Summary & Way Forward" },
  alternates: { canonical: "https://www.mosaicmc.org.au/community-leaders-forum/18-may-2026" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SharedDocumentPage />;
}
