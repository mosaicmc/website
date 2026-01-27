const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../src/i18n/translations');
const QA_DIR = path.join(__dirname, '../QA');
const REPORT_FILE = path.join(QA_DIR, 'translation-audit.md');
const SOURCE_LANG = 'en';

if (!fs.existsSync(QA_DIR)) {
  fs.mkdirSync(QA_DIR, { recursive: true });
}

function flattenKeys(obj, prefix = '') {
  let keys = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(keys, flattenKeys(obj[key], prefix + key + '.'));
    } else {
      keys[prefix + key] = obj[key];
    }
  }
  return keys;
}

function audit() {
  console.log('Starting translation audit...');
  const sourcePath = path.join(TRANSLATIONS_DIR, `${SOURCE_LANG}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error('Source English file not found!');
    process.exit(1);
  }

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const sourceFlat = flattenKeys(sourceContent);
  const sourceKeys = Object.keys(sourceFlat);

  let report = `# Translation Audit Report\nDate: ${new Date().toISOString()}\n\n`;
  report += `## Summary\nTotal Keys in Source (EN): ${sourceKeys.length}\n\n`;

  const files = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');
  
  files.forEach(file => {
    const lang = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, file), 'utf8'));
    const flat = flattenKeys(content);
    
    const missingKeys = [];
    const emptyKeys = [];
    const identicalKeys = []; // Potentially untranslated

    sourceKeys.forEach(key => {
      if (!(key in flat)) {
        missingKeys.push(key);
      } else if (flat[key] === "") {
        emptyKeys.push(key);
      } else if (flat[key] === sourceFlat[key] && typeof sourceFlat[key] === 'string' && sourceFlat[key].length > 5) {
        // Only flag identical if length > 5 to avoid short words/numbers
        // Exclude specific known identicals if needed, but for now list them
        identicalKeys.push(key);
      }
    });

    const coverage = ((sourceKeys.length - missingKeys.length) / sourceKeys.length * 100).toFixed(1);

    report += `### ${lang.toUpperCase()} (Coverage: ${coverage}%)\n`;
    if (missingKeys.length > 0) {
      report += `- **Missing Keys (${missingKeys.length}):**\n`;
      missingKeys.forEach(k => report += `  - \`${k}\`\n`);
    } else {
      report += `- ✅ No missing keys.\n`;
    }

    if (emptyKeys.length > 0) {
      report += `- **Empty Keys (${emptyKeys.length}):**\n`;
      emptyKeys.forEach(k => report += `  - \`${k}\`\n`);
    }

    if (identicalKeys.length > 0) {
      report += `- **Identical to English (Potential Untranslated) (${identicalKeys.length}):**\n`;
      // Limit list to top 20 to avoid bloating report
      identicalKeys.slice(0, 20).forEach(k => report += `  - \`${k}\`\n`);
      if (identicalKeys.length > 20) report += `  - ... and ${identicalKeys.length - 20} more\n`;
    }
    report += `\n`;
  });

  fs.writeFileSync(REPORT_FILE, report);
  console.log(`Audit report generated at ${REPORT_FILE}`);
}

audit();
