import { NextResponse } from "next/server";
import { getValidatedEnv } from "../../../lib/api-env";

export async function GET(request: Request) {
  const fetchFn: (input: string, init?: RequestInit) => Promise<Response> =
    (globalThis as unknown as { fetch: (input: string, init?: RequestInit) => Promise<Response> })
      .fetch;

  let orgId: string;
  let token: string;
  try {
    const env = getValidatedEnv();
    orgId = env.EH_ORG_ID;
    token = env.EH_ATS_TOKEN;
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid environment variables" },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const pageIndex = searchParams.get("page_index") || searchParams.get("pageIndex") || "1";
    const countryCodes = searchParams.get("country_codes") || searchParams.get("countryCodes") || "";
    const departmentIds = searchParams.get("department_ids") || searchParams.get("departmentIds") || "";

    const params = new URLSearchParams();
    if (pageIndex) params.set("page_index", String(pageIndex));
    if (countryCodes) {
      for (const c of String(countryCodes).split(",").map((x) => x.trim()).filter(Boolean)) {
        params.append("country_codes[]", c);
      }
    }
    if (departmentIds) {
      for (const d of String(departmentIds).split(",").map((x) => x.trim()).filter(Boolean)) {
        params.append("department_ids[]", d);
      }
    }

    const url =
      `https://api.employmenthero.com/ats/api/v1/embedded/organisations/${orgId}/jobs` +
      (params.toString() ? `?${params.toString()}` : "");

    const resp = await fetchFn(url, {
      headers: {
        X_ATS_TOKEN: token,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!resp.ok) {
      return NextResponse.json(
        { error: "Failed to fetch jobs from Employment Hero" },
        { status: resp.status }
      );
    }

    const json = await resp.json();
    const data = json?.data || json;
    const out = {
      data: {
        items: data?.items ?? data?.results ?? [],
        page_index: data?.page_index ?? 1,
        item_per_page: data?.item_per_page ?? data?.items_per_page ?? 0,
        total_items: data?.total_items ?? 0,
        total_pages: data?.total_pages ?? 0,
      },
    };

    return NextResponse.json(out, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch jobs from Employment Hero" },
      { status: 500 }
    );
  }
}
