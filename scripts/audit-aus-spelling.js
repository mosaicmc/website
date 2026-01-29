import fs from 'fs';
import path from 'path';

const rules = [
  { pattern: /\bcolor\b/gi, replacement: 'colour' },
  { pattern: /\bcolors\b/gi, replacement: 'colours' },
  { pattern: /\bcoloring\b/gi, replacement: 'colouring' },
  { pattern: /\bhonor\b/gi, replacement: 'honour' },
  { pattern: /\bhonors\b/gi, replacement: 'honours' },
  { pattern: /\bhonored\b/gi, replacement: 'honoured' },
  { pattern: /\bhonoring\b/gi, replacement: 'honouring' },
  { pattern: /\borganization\b/gi, replacement: 'organisation' },
  { pattern: /\borganizations\b/gi, replacement: 'organisations' },
  { pattern: /\borganize\b/gi, replacement: 'organise' },
  { pattern: /\borganizes\b/gi, replacement: 'organises' },
  { pattern: /\borganized\b/gi, replacement: 'organised' },
  { pattern: /\borganizing\b/gi, replacement: 'organising' },
  { pattern: /\bbehavior\b/gi, replacement: 'behaviour' },
  { pattern: /\bbehaviors\b/gi, replacement: 'behaviours' },
  { pattern: /\bcenter\b/gi, replacement: 'centre' },
  { pattern: /\bcenters\b/gi, replacement: 'centres' },
  { pattern: /\blicense\b/gi, replacement: 'licence' },
  { pattern: /\blicenses\b/gi, replacement: 'licences' },
  { pattern: /\blicensed\b/gi, replacement: 'licenced' },
  { pattern: /\boptimize\b/gi, replacement: 'optimise' },
  { pattern: /\boptimized\b/gi, replacement: 'optimised' },
  { pattern: /\boptimizer\b/gi, replacement: 'optimiser' },
  { pattern: /\boptimizing\b/gi, replacement: 'optimising' },
  { pattern: /\boptimization\b/gi, replacement: 'optimisation' },
  { pattern: /\bcustomize\b/gi, replacement: 'customise' },
  { pattern: /\bcustomized\b/gi, replacement: 'customised' },
  { pattern: /\bcustomizing\b/gi, replacement: 'customising' },
  { pattern: /\bcustomization\b/gi, replacement: 'customisation' },
  { pattern: /\bpersonalize\b/gi, replacement: 'personalise' },
  { pattern: /\bpersonalized\b/gi, replacement: 'personalised' },
  { pattern: /\bpersonalizing\b/gi, replacement: 'personalising' },
  { pattern: /\bcatalog\b/gi, replacement: 'catalogue' },
  { pattern: /\bcatalogs\b/gi, replacement: 'catalogues' },
  { pattern: /\btraveling\b/gi, replacement: 'travelling' },
  { pattern: /\bcanceled\b/gi, replacement: 'cancelled' },
];

const root = process.cwd();
const includeDirs = ['src', 'public', 'docs'];
const includeExts = new Set(['.tsx', '.ts', '.md', '.html']);

const findings = [];

function stripCommentsForLine(line, state) {
  if (state.inBlock) {
    const end = line.indexOf('*/');
    if (end >= 0) {
      state.inBlock = false;
      return line.slice(end + 2);
    }
    return '';
  }
  const start = line.indexOf('/*');
  if (start >= 0) {
    const end = line.indexOf('*/', start + 2);
    if (end >= 0) {
      return (line.slice(0, start) + line.slice(end + 2)).replace(/\/\/.*$/, '');
    }
    state.inBlock = true;
    return line.slice(0, start).replace(/\/\/.*$/, '');
  }
  return line.replace(/\/\/.*$/, '');
}

function matchCase(replacement, source) {
  if (source.toUpperCase() === source) return replacement.toUpperCase();
  if (source[0] && source[0] === source[0].toUpperCase() && source.slice(1) === source.slice(1).toLowerCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement.toLowerCase();
}

function shouldSkipLine(line) {
  const skipHints = ['className=', 'class=', 'bg-', 'text-', 'border-', 'from-', 'to-', 'focus:', 'hover:', 'dark:', 'aria-', '<path', '<svg'];
  return skipHints.some((h) => line.includes(h));
}

function scanFile(filePath) {
  const ext = path.extname(filePath);
  if (!includeExts.has(ext)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const commentState = { inBlock: false };
  lines.forEach((line, idx) => {
    let scanLine = line;
    if (ext === '.ts' || ext === '.tsx') scanLine = stripCommentsForLine(scanLine, commentState);
    if (!scanLine.trim()) return;
    if (shouldSkipLine(scanLine)) return;
    for (const { pattern, replacement } of rules) {
      const m = scanLine.match(pattern);
      if (m) {
        for (const hit of m) {
          findings.push({ file: filePath.replace(root + '/', ''), line: idx + 1, match: hit, suggestion: replacement });
        }
      }
    }
  });

  if (ext === '.md' || ext === '.html') {
    let updated = content;
    for (const { pattern, replacement } of rules) {
      updated = updated.replace(pattern, (m) => matchCase(replacement, m));
    }
    if (updated !== content) {
      fs.writeFileSync(filePath, updated);
    }
  }
}

function walk(dir) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return;
  for (const entry of fs.readdirSync(full)) {
    const p = path.join(full, entry);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      walk(path.join(dir, entry));
    } else {
      scanFile(p);
    }
  }
}

for (const d of includeDirs) walk(d);

const reportPath = path.join(root, 'QA', 'aus-spelling-report.md');
const header = `# Australian English Spelling Audit\n\nFindings: ${findings.length}\n\n`;
const body = findings
  .map((f) => `- ${f.file}:${f.line} — "${f.match}" → "${f.suggestion}"`)
  .join('\n');
fs.mkdirSync(path.join(root, 'QA'), { recursive: true });
fs.writeFileSync(reportPath, header + body + '\n');

if (findings.length > 0) {
  console.error(`Found ${findings.length} potential US spellings. See ${reportPath}`);
  process.exit(1);
} else {
  console.log('No US spellings found.');
}
