import * as fs from "fs";
import * as path from "path";

type ReqBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  resourceLabel?: string;
  downloadUrl?: string;
  location?: string;
  device?: string;
};

type Req = { method?: string; body?: ReqBody };
type Res = { status: (code: number) => Res; json: (body: unknown) => void };

type DownloadLogEntry = {
  firstName: string;
  lastName: string;
  email: string;
  resourceLabel: string;
  downloadUrl: string;
  location: string;
  device: string;
  createdAt: string;
};

async function appendDownloadLog(entry: DownloadLogEntry) {
  const dataDir = path.join(process.cwd(), "data");
  const dataFile = path.join(dataDir, "download-gate-logs.json");

  await fs.promises.mkdir(dataDir, { recursive: true });

  let existing: DownloadLogEntry[] = [];
  try {
    const raw = await fs.promises.readFile(dataFile, "utf8");
    const json = JSON.parse(raw);
    if (Array.isArray(json)) {
      existing = json as DownloadLogEntry[];
    }
  } catch {
    console.warn("Unable to read existing download gate logs");
  }

  existing.push(entry);
  await fs.promises.writeFile(
    dataFile,
    JSON.stringify(existing, null, 2),
    "utf8",
  );
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = req.body ?? {};
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const resourceLabel = String(body.resourceLabel ?? "").trim();
  const downloadUrl = String(body.downloadUrl ?? "").trim();
  const location = String(body.location ?? "").trim();
  const device = String(body.device ?? "").trim();

  if (!firstName || !lastName || !email || !downloadUrl) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const entry: DownloadLogEntry = {
    firstName,
    lastName,
    email,
    resourceLabel: resourceLabel || "Unknown resource",
    downloadUrl,
    location: location || "Unknown location",
    device: device || "unknown",
    createdAt: new Date().toISOString(),
  };

  try {
    await appendDownloadLog(entry);
  } catch {
    console.error("Unable to persist download gate log entry");
  }

  res.status(200).json({ ok: true });
}

