import { NextResponse } from "next/server";
import { DOWNLOAD_CATEGORIES } from "@/lib/constants";

type Submission = {
  firstName: string;
  lastName: string;
  email: string;
  roleTitle: string;
  downloadPath: string;
  createdAt: string;
};

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
  const submissionData = {
    firstName,
    lastName,
    email,
    roleTitle,
    downloadPath: relativePath,
    createdAt: new Date().toISOString(),
    category: DOWNLOAD_CATEGORIES.VOLUNTEER_PD,
  };

  return NextResponse.json(
    { downloadPath: `/${relativePath.replace(/\\/g, "/")}` },
    { status: 200 }
  );
}
