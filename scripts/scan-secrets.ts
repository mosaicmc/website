import fs from "fs";
import path from "path";

type Finding = { file: string; line: number; match: string; rule: string };

const root = process.cwd();
const ignoreDirs = new Set([
  "node_modules",
  "dist",
  ".git",
  "public/annual-reports",
  "public/brochures",
  "test-results",
  "media",
]);

const rules: Array<{ name: string; regex: RegExp }> = [
  { name: "stripe_secret_key", regex: /sk_(live|test)_[A-Za-z0-9]{16,}/ },
  { name: "hardcoded_eh_ats_token", regex: /EH_ATS_TOKEN\s*[:=]\s*["'][^"']+["']/ },
  { name: "generic_token_variable", regex: /\b(token|secret|apiKey|apikey)\s*[:=]\s*["'][A-Za-z0-9_-]{20,}["']/i },
];

function walk(dir: string, out: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(root, full);
    if (e.isDirectory()) {
      const skip = Array.from(ignoreDirs).some((p) => rel.startsWith(p));
      if (skip) continue;
      walk(full, out);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if ([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".env"].includes(ext)) {
        out.push(full);
      }
    }
  }
  return out;
}

function scanFile(file: string): Finding[] {
  const txt = fs.readFileSync(file, "utf8");
  const lines = txt.split(/\r?\n/);
  const findings: Finding[] = [];
  lines.forEach((lineText, idx) => {
    for (const r of rules) {
      const m = lineText.match(r.regex);
      if (m) {
        findings.push({ file, line: idx + 1, match: m[0], rule: r.name });
      }
    }
  });
  return findings;
}

function main() {
  const files = walk(root);
  const all: Finding[] = [];
  for (const f of files) {
    try {
      all.push(...scanFile(f));
    } catch {
      // ignore read errors
    }
  }
  if (all.length) {
    console.error("Sensitive patterns detected:");
    for (const f of all) {
      console.error(`- [${f.rule}] ${path.relative(root, f.file)}:${f.line} → ${f.match}`);
    }
    process.exit(1);
  } else {
    console.log("No sensitive patterns detected.");
  }
}

main();
