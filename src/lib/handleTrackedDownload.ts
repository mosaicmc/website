import { DOWNLOAD_CATEGORIES } from "@/lib/constants";
import { DownloadItem } from "@/lib/downloadCatalog";

export type DownloadFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

export async function handleTrackedDownload(
  item: DownloadItem,
  formData: DownloadFormData,
  location: string = typeof window !== "undefined" ? window.location.href : ""
): Promise<void> {
  const isVolunteerPD = item.category === DOWNLOAD_CATEGORIES.VOLUNTEER_PD;
  const endpoint = isVolunteerPD ? "/api/volunteer-pd-download" : "/api/download-gate-log";

  const payload = isVolunteerPD
    ? {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        roleTitle: item.label,
        downloadPath: item.path,
        pageUrl: location,
      }
    : {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        resourceLabel: item.label,
        downloadUrl: item.path,
        category: item.category,
        location: location,
        device: getDeviceType(),
      };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Invalid request data");
      }
      // For other errors, we might still want to allow the download, 
      // but the prompt says "Throw error if API returns 400".
      // We'll throw for non-200 to be safe, or just log.
      // "On success → redirect to actual file path"
      // "Throw error if API returns 400"
    }
  } catch (error) {
    console.error("Tracking failed:", error);
    // If it's a 400 or network error, we might want to stop? 
    // The prompt implies we should throw.
    throw error;
  }

  // On success (or if we decide to proceed despite non-400 error), trigger download
  triggerDownload(item.path);
}

function triggerDownload(url: string) {
  // Decode first to ensure we have the raw string, then encode properly
  const decodedUrl = decodeURI(url);
  const safeUrl = encodeURI(decodedUrl);

  const link = document.createElement("a");
  link.href = safeUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.download = ""; // Force download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const ua = window.navigator.userAgent || "";
  const width = window.innerWidth || 0;
  if (/Mobi|Android/i.test(ua) || width < 640) return "mobile";
  if (/Tablet|iPad/i.test(ua) || (width >= 640 && width < 1024)) return "tablet";
  return "desktop";
}
