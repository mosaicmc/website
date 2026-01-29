import { NextResponse } from "next/server";
import { getValidatedEnv } from "../../../lib/api-env";

export async function GET() {
  const fetchFn: (input: string, init?: RequestInit) => Promise<Response> =
    (globalThis as unknown as { fetch: (input: string, init?: RequestInit) => Promise<Response> })
      .fetch;

  let token: string;
  try {
    const env = getValidatedEnv();
    token = env.EH_ATS_TOKEN;
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid environment variables", missing: { EH_ATS_TOKEN: true } },
      { status: 500 }
    );
  }

  try {
    const base = "https://api.employmenthero.com/ats/api/v1/embedded";
    const [countriesResp, departmentsResp] = await Promise.all([
      fetchFn(`${base}/countries`, { headers: { X_ATS_TOKEN: token, Accept: "application/json" } }),
      fetchFn(`${base}/departments`, { headers: { X_ATS_TOKEN: token, Accept: "application/json" } }),
    ]);

    if (!countriesResp.ok || !departmentsResp.ok) {
      const status = !countriesResp.ok ? countriesResp.status : departmentsResp.status;
      return NextResponse.json(
        { error: "Failed to fetch metadata from Employment Hero" },
        { status }
      );
    }

    const countriesJson = await countriesResp.json();
    const departmentsJson = await departmentsResp.json();

    return NextResponse.json(
      {
        countries: countriesJson?.data ?? countriesJson ?? [],
        departments: departmentsJson?.data ?? departmentsJson ?? [],
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch metadata from Employment Hero" },
      { status: 500 }
    );
  }
}
