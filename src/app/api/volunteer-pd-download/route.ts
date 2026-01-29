import { NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

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
  await fs.promises.writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const roleTitle = String(body.roleTitle ?? "").trim();
  const rawDownloadPath = String(body.downloadPath ?? "").trim();

  if (!firstName || !lastName || !email || !roleTitle || !rawDownloadPath) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const cleanedPath = rawDownloadPath.replace(/^\/+/, "");
  if (!cleanedPath || cleanedPath.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  if (!cleanedPath.startsWith("Volunteer PDs/")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

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

  return NextResponse.json(
    { downloadPath: `/${relativePath.replace(/\\/g, "/")}` },
    { status: 200 }
  );
}
