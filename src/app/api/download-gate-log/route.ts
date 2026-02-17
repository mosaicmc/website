import { NextResponse } from "next/server";
import { DOWNLOAD_CATEGORIES, DownloadCategory } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const resourceLabel = String(body.resourceLabel ?? "").trim();
  const downloadUrl = String(body.downloadUrl ?? "").trim();
  const category = body.category as DownloadCategory | undefined;
  const location = String(body.location ?? "").trim();

  if (!firstName || !lastName || !email || !downloadUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // ---- HubSpot submission (primary history tracking) ---- 
  try { 
    const portalId = process.env.HUBSPOT_PORTAL_ID; 
    const formId = process.env.HUBSPOT_FORM_ID; 

    // If env vars not present, log so we can see it in Vercel logs 
    if (!portalId || !formId) { 
      console.error("HubSpot env vars missing", { 
        hasPortalId: Boolean(portalId), 
        hasFormId: Boolean(formId), 
      }); 
    } else { 
      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`; 

      const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(); 

      // Your payload currently uses `location` as the page URL. We'll treat it as such. 
      const downloadPageUrl = location || ""; 

      // HubSpot expects exact dropdown internal values (yours are "Price List", etc.) 
      // If category is missing, default to Brochure (or change default to Price List later once frontend sends it) 
      const safeCategory = (category || DOWNLOAD_CATEGORIES.BROCHURE) as string; 

      // Make URL safe (spaces cause pain). HubSpot accepts either, but better to encode. 
      const safeDownloadUrl = downloadUrl ? encodeURI(downloadUrl) : ""; 

      const hsRes = await fetch(endpoint, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          fields: [ 
            { name: "firstname", value: firstName }, 
            { name: "lastname", value: lastName }, 
            { name: "email", value: email }, 
            { name: "downloaded_file_name", value: resourceLabel || "Unknown resource" }, 
            { name: "download_category", value: safeCategory }, 
            { name: "download_page_url", value: downloadPageUrl }, 
            { name: "download_url", value: safeDownloadUrl }, 
          ], 
          context: { 
            pageUri: downloadPageUrl, 
            pageName: "Mosaic PDF Download Gate", 
            ...(ipAddress ? { ipAddress } : {}), 
          }, 
        }), 
      }); 

      if (!hsRes.ok) { 
        const text = await hsRes.text().catch(() => ""); 
        console.error("HubSpot submit failed", hsRes.status, text); 
      } 
    } 
  } catch (e) { 
    console.error("HubSpot submit exception", e); 
  } 
  // ---- end HubSpot submission ---- 

  return NextResponse.json({ ok: true }, { status: 200 });
}
