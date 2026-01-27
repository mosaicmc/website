const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../src/i18n/translations');
const SOURCE_LANG = 'en';

// Helper to check if value is an object
const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

// Helper to flatten object keys
const flattenKeys = (obj, prefix = '') => {
  let keys = [];
  for (const key in obj) {
    if (isObject(obj[key])) {
      keys = keys.concat(flattenKeys(obj[key], `${prefix}${key}.`));
    } else {
      keys.push(`${prefix}${key}`);
    }
  }
  return keys;
};

// Helper to get value by dot notation
const getValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Helper to extract placeholders
const getPlaceholders = (str) => {
  if (typeof str !== 'string') return [];
  const interpolation = str.match(/{{[^}]+}}/g) || [];
  const tags = str.match(/<[^>]+>/g) || [];
  return [...interpolation, ...tags].sort();
};

const validateTranslations = () => {
  console.log('🔍 Starting translation validation...\n');
  
  const files = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.json'));
  
  if (!files.includes(`${SOURCE_LANG}.json`)) {
    console.error(`❌ Source language file ${SOURCE_LANG}.json not found!`);
    process.exit(1);
  }

  const sourceContent = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, `${SOURCE_LANG}.json`), 'utf8'));
  const sourceKeys = flattenKeys(sourceContent);
  
  let hasErrors = false;
  let hasWarnings = false;

  files.forEach(file => {
    if (file === `${SOURCE_LANG}.json`) return;
    
    const lang = file.replace('.json', '');
    console.log(`Checking ${lang}...`);
    
    const content = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, file), 'utf8'));
    const targetKeys = flattenKeys(content);
    
    // Check for missing keys
    const missingKeys = sourceKeys.filter(key => !targetKeys.includes(key));
    if (missingKeys.length > 0) {
      console.error(`  ❌ Missing ${missingKeys.length} keys:`);
      missingKeys.slice(0, 5).forEach(k => console.error(`    - ${k}`));
      if (missingKeys.length > 5) console.error(`    ... and ${missingKeys.length - 5} more`);
      hasErrors = true;
    }

    // Check values
    sourceKeys.forEach(key => {
      if (!targetKeys.includes(key)) return;
      
      const sourceVal = getValue(sourceContent, key);
      const targetVal = getValue(content, key);
      
      // Check for empty values
      if (targetVal === '' || targetVal === null || targetVal === undefined) {
        console.error(`  ❌ Empty value for key: ${key}`);
        hasErrors = true;
      }

      // Check for placeholder mismatch
      const sourcePlaceholders = getPlaceholders(sourceVal);
      const targetPlaceholders = getPlaceholders(targetVal);
      
      const missingPlaceholders = sourcePlaceholders.filter(p => !targetPlaceholders.includes(p));
      if (missingPlaceholders.length > 0) {
        console.warn(`  ⚠️  Missing placeholders in ${key}: ${missingPlaceholders.join(', ')}`);
        // hasWarnings = true; // Treat as warning for now
      }

      // Check for identical values (potential untranslated content)
      // Ignore short strings, numbers, or known identical terms
      if (typeof sourceVal === 'string' && sourceVal.length > 3 && sourceVal === targetVal) {
        // console.warn(`  ⚠️  Identical value for ${key}: "${sourceVal.substring(0, 30)}..."`);
        // hasWarnings = true;
      }
    });
    
    console.log(`  Done.\n`);
  });

  if (hasErrors) {
    console.error('❌ Validation failed with errors.');
    process.exit(1);
  } else {
    console.log('✅ Validation passed successfully!');
    if (hasWarnings) console.log('  (With some warnings to review)');
  }
};

validateTranslations();
