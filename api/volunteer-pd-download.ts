import * as fs from "fs";
import * as path from "path";

type ReqBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  roleTitle?: string;
  downloadPath?: string;
};

type Req = { method?: string; body?: ReqBody };
type Res = { status: (code: number) => Res; json: (body: unknown) => void };

type Submission = {
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  downloadPath: string;
  createdAt: string;
};

async function appendSubmission(entry: Submission) {
  const dataDir = path.join(process.cwd(), "data");
  const dataFile = path.join(dataDir, "volunteer-pd-downloads.json");

  await fs.promises.mkdir(dataDir, { recursive: true });

  let existing: Submission[] = [];
  try {
    const raw = await fs.promises.readFile(dataFile, "utf8");
    const json = JSON.parse(raw);
    if (Array.isArray(json)) {
      existing = json as Submission[];
    }
  } catch {
    console.warn("Unable to read existing volunteer PD submissions");
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
  const roleTitle = String(body.roleTitle ?? "").trim();
  const rawDownloadPath = String(body.downloadPath ?? "").trim();

  if (!firstName || !lastName || !email || !roleTitle || !rawDownloadPath) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const cleanedPath = rawDownloadPath.replace(/^\/+/, "");
  if (!cleanedPath || cleanedPath.includes("..")) {
    res.status(400).json({ error: "Invalid file path" });
    return;
  }

  if (!cleanedPath.startsWith("Volunteer PDs/")) {
    res.status(400).json({ error: "Invalid file path" });
    return;
  }

  // File existence check removed to prevent Vercel from bundling the entire public directory
  // const relativePath = cleanedPath;
  // const publicRoot = path.join(process.cwd(), "public");
  // const resolvedPublicRoot = path.resolve(publicRoot);
  // const filePath = path.join(publicRoot, relativePath);
  // const resolvedFilePath = path.resolve(filePath);
  //
  // if (!resolvedFilePath.startsWith(resolvedPublicRoot)) {
  //   res.status(400).json({ error: "Invalid file path" });
  //   return;
  // }
  //
  // try {
  //   await fs.promises.access(resolvedFilePath, fs.constants.R_OK);
  // } catch {
  //   res.status(404).json({ error: "File not found" });
  //   return;
  // }

  const relativePath = cleanedPath;

  try {
    await appendSubmission({
      firstName,
      lastName,
      email,
      roleTitle,
      downloadPath: relativePath,
      createdAt: new Date().toISOString(),
    });
  } catch {
    console.error("Unable to persist volunteer PD submission");
  }

  res.status(200).json({
    downloadPath: `/${relativePath.replace(/\\/g, "/")}`,
  });
}
