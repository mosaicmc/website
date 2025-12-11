type Req = { query?: Record<string, unknown> };
type Res = { status: (code: number) => Res; json: (body: unknown) => void };

export default async function handler(req: Req, res: Res) {
  const fetchFn: (input: string, init?: RequestInit) => Promise<Response> = (globalThis as unknown as { fetch: (input: string, init?: RequestInit) => Promise<Response> }).fetch;
  const token = process.env.EH_ATS_TOKEN;

  if (!token) {
    res.status(500).json({ error: "Missing environment variables", missing: { EH_ATS_TOKEN: true } });
    return;
  }

  try {
    const base = "https://api.employmenthero.com/ats/api/v1/embedded";

    const [countriesResp, departmentsResp] = await Promise.all([
      fetchFn(`${base}/countries`, { headers: { "X_ATS_TOKEN": token, "Accept": "application/json" } }),
      fetchFn(`${base}/departments`, { headers: { "X_ATS_TOKEN": token, "Accept": "application/json" } }),
    ]);

    if (!countriesResp.ok || !departmentsResp.ok) {
      const status = !countriesResp.ok ? countriesResp.status : departmentsResp.status;
      res.status(status).json({ error: "Failed to fetch metadata from Employment Hero" });
      return;
    }

    const countriesJson = await countriesResp.json();
    const departmentsJson = await departmentsResp.json();

    res.status(200).json({
      countries: countriesJson?.data ?? countriesJson ?? [],
      departments: departmentsJson?.data ?? departmentsJson ?? [],
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch metadata from Employment Hero" });
  }
}
