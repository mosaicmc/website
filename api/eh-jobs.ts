type Req = { query?: Record<string, unknown> };
type Res = { status: (code: number) => Res; json: (body: unknown) => void };

import { getValidatedEnv } from "./_env.js";

export default async function handler(req: Req, res: Res) {
  const fetchFn: (input: string, init?: RequestInit) => Promise<Response> = (globalThis as unknown as { fetch: (input: string, init?: RequestInit) => Promise<Response> }).fetch;
  let orgId: string, token: string;
  try {
    const env = getValidatedEnv();
    orgId = env.EH_ORG_ID;
    token = env.EH_ATS_TOKEN;
  } catch {
    res.status(500).json({ error: "Missing or invalid environment variables" });
    return;
  }

  if (!orgId || !token) {
    res.status(500).json({ error: "Missing environment variables", missing: { EH_ORG_ID: !orgId, EH_ATS_TOKEN: !token } });
    return;
  }

  try {
    const q = req?.query || {};
    const pageIndex = (q.page_index ?? q.pageIndex ?? 1) as string | number;
    const countryCodes = (q.country_codes ?? q.countryCodes ?? "") as string;
    const departmentIds = (q.department_ids ?? q.departmentIds ?? "") as string;

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

    const url = `https://api.employmenthero.com/ats/api/v1/embedded/organisations/${orgId}/jobs` + (params.toString() ? `?${params.toString()}` : "");
    const resp = await fetchFn(url, {
      headers: {
        "X_ATS_TOKEN": token,
        "Accept": "application/json",
      },
    });

    if (!resp.ok) {
      res.status(resp.status).json({ error: "Failed to fetch jobs from Employment Hero" });
      return;
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

    res.status(200).json(out);
  } catch {
    res.status(500).json({ error: "Failed to fetch jobs from Employment Hero" });
  }
}
