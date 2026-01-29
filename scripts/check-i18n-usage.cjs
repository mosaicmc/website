const fs = require('fs');
const path = require('path');

const SRC_ROOT = path.join(__dirname, '../src');
const TRANSLATIONS_PATH = path.join(__dirname, '../src/locales/en/translation.json');
const EXTS = new Set(['.ts', '.tsx']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (EXTS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function getTranslationKeys() {
  const raw = fs.readFileSync(TRANSLATIONS_PATH, 'utf8');
  return JSON.parse(raw);
}

function hasKey(obj, key) {
  const parts = key.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part];
    } else {
      return false;
    }
  }
  return true;
}

function collectKeys() {
  const keys = new Set();
  const files = walk(SRC_ROOT);
  const tRe = /\bt\(\s*['"]([^'"]+)['"]/g;
  const transRe = /i18nKey=\{?['"]([^'"]+)['"]\}?/g;

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = tRe.exec(text))) {
      keys.add(match[1]);
    }
    while ((match = transRe.exec(text))) {
      keys.add(match[1]);
    }
  }
  return keys;
}

function main() {
  const translations = getTranslationKeys();
  const usedKeys = collectKeys();
  const missing = Array.from(usedKeys).filter((key) => !hasKey(translations, key));

  if (missing.length) {
    missing.sort();
    console.error('❌ Missing translation keys detected:');
    missing.forEach((key) => console.error(`  - ${key}`));
    process.exit(1);
  }

  console.log(`✅ i18n usage check passed (${usedKeys.size} keys).`);
}

main();
