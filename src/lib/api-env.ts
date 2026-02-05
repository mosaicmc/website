type NonEmptyString<T extends string = string> = T & { __brand: "NonEmptyString" };

export function requireEnv(name: string): NonEmptyString {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return v as NonEmptyString;
}

export function isStripeSecretKey(key?: string | null): boolean {
  if (!key) return false;
  return /^sk_(live|test)_[A-Za-z0-9]{24,}$/.test(key);
}

export function validateEmploymentHeroToken(token?: string | null): boolean {
  if (!token) return false;
  return /^[A-Za-z0-9\-_]{20,}$/.test(token);
}

export function getValidatedEnv() {
  // Employment Hero integration has been replaced by direct SEEK links
  // Keeping these as optional/empty to prevent crashes in legacy API routes
  const EH_ORG_ID = process.env.EH_ORG_ID || "";
  const EH_ATS_TOKEN = process.env.EH_ATS_TOKEN || "";

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || undefined;
  if (STRIPE_SECRET_KEY && !isStripeSecretKey(STRIPE_SECRET_KEY)) {
    console.warn("Warning: STRIPE_SECRET_KEY present but format appears invalid");
  }
  return { EH_ORG_ID, EH_ATS_TOKEN, STRIPE_SECRET_KEY };
}
