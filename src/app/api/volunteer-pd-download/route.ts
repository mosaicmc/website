import { NextResponse } from "next/server";
import { DOWNLOAD_CATEGORIES } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const roleTitle = String(body.roleTitle ?? "").trim();
  const rawDownloadPath = String(body.downloadPath ?? "").trim();

  // Prefer explicit pageUrl from client, fallback to Referer header
  const pageUrl =
    String(body.pageUrl ?? "").trim() ||
    request.headers.get("referer") ||
    "";

  if (!firstName || !lastName || !email || !roleTitle || !rawDownloadPath) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Basic path safety
  const cleanedPath = rawDownloadPath.replace(/^\/+/, "");
  if (!cleanedPath || cleanedPath.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  // ✅ Allow both standardized and legacy PD directories
  const allowedPrefixes = ["pd/", "Volunteer PDs/"];
  const hasAllowedPrefix = allowedPrefixes.some((p) => cleanedPath.startsWith(p));
  if (!hasAllowedPrefix) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  const downloadPath = `/${cleanedPath.replace(/\\/g, "/")}`;

  // --- HubSpot submission (same form as download gate) ---
  try {
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    if (!portalId || !formId) {
      console.error("HubSpot env vars missing (volunteer-pd-download)", {
        hasPortalId: Boolean(portalId),
        hasFormId: Boolean(formId),
      });
    } else {
      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

      const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

      const hsRes = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: [
            { name: "firstname", value: firstName },
            { name: "lastname", value: lastName },
            { name: "email", value: email },
            { name: "downloaded_file_name", value: roleTitle },
            { name: "download_category", value: DOWNLOAD_CATEGORIES.VOLUNTEER_PD },
            { name: "download_page_url", value: pageUrl },
            { name: "download_url", value: encodeURI(downloadPath) },
          ],
          context: {
            pageUri: pageUrl,
            pageName: "Mosaic Volunteer PD Download",
            ...(ipAddress ? { ipAddress } : {}),
          },
        }),
      });

      if (!hsRes.ok) {
        const text = await hsRes.text().catch(() => "");
        console.error("HubSpot submit failed (volunteer-pd-download)", hsRes.status, text);
      }
    }
  } catch (e) {
    console.error("HubSpot submit exception (volunteer-pd-download)", e);
  }
  // --- end HubSpot submission ---

  return NextResponse.json({ ok: true, downloadPath }, { status: 200 });
}
