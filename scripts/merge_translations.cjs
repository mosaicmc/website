const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../src/i18n/translations');
const SOURCE_LANG = 'en';

function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] }); // Copy source value as placeholder
          // OR: Object.assign(output, { [key]: `[MISSING] ${source[key]}` });
        }
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function main() {
  const sourcePath = path.join(TRANSLATIONS_DIR, `${SOURCE_LANG}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file ${sourcePath} not found.`);
    process.exit(1);
  }

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const files = fs.readdirSync(TRANSLATIONS_DIR);

  files.forEach(file => {
    if (file === `${SOURCE_LANG}.json` || !file.endsWith('.json')) return;

    const targetPath = path.join(TRANSLATIONS_DIR, file);
    let targetContent = {};
    try {
      targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch (e) {
      console.warn(`Could not parse ${file}, starting with empty object.`);
    }

    const merged = deepMerge(targetContent, sourceContent);
    
    // Sort keys alphabetically for consistency
    const sorted = Object.keys(merged).sort().reduce((acc, key) => {
      acc[key] = merged[key];
      return acc;
    }, {});

    fs.writeFileSync(targetPath, JSON.stringify(sorted, null, 2) + '\n');
    console.log(`Updated ${file}`);
  });
}

main();
