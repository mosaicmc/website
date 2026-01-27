const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.join(__dirname, '../src/i18n/translations');
const SOURCE_LANG = 'en';

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

function checkCoverage() {
  console.log('📊 Checking Translation Coverage...\n');
  
  const sourcePath = path.join(TRANSLATIONS_DIR, `${SOURCE_LANG}.json`);
  if (!fs.existsSync(sourcePath)) {
    console.error('Source file not found!');
    process.exit(1);
  }

  const sourceContent = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  const sourceFlat = flattenKeys(sourceContent);
  const totalKeys = Object.keys(sourceFlat).length;

  console.log(`Total Keys in English Source: ${totalKeys}`);
  console.log('-'.repeat(50));

  const files = fs.readdirSync(TRANSLATIONS_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');

  const sections = ['nav', 'hero', 'about', 'agedCare', 'family', 'community', 'settlement', 'getInvolved', 'contact', 'resources'];

  files.forEach(file => {
    const lang = file.replace('.json', '');
    const content = JSON.parse(fs.readFileSync(path.join(TRANSLATIONS_DIR, file), 'utf8'));
    const flat = flattenKeys(content);
    
    let translatedCount = 0;
    let untranslatedCount = 0;
    
    // Check specific sections
    let sectionStats = {};

    Object.keys(sourceFlat).forEach(key => {
      const sourceVal = sourceFlat[key];
      const targetVal = flat[key];

      // If target is missing (shouldn't happen after merge) or identical to source
      // We exclude short strings (<= 3 chars) to avoid false positives on numbers or acronyms
      const isIdentical = (targetVal === sourceVal) && (typeof sourceVal === 'string' && sourceVal.length > 3);
      
      if (isIdentical) {
        untranslatedCount++;
      } else {
        translatedCount++;
      }

      // Section breakdown
      const rootKey = key.split('.')[0];
      if (!sectionStats[rootKey]) sectionStats[rootKey] = { total: 0, translated: 0 };
      sectionStats[rootKey].total++;
      if (!isIdentical) sectionStats[rootKey].translated++;
    });

    const percentage = ((translatedCount / totalKeys) * 100).toFixed(1);
    console.log(`\n🌍 ${lang.toUpperCase()}: ${percentage}% Translated (${translatedCount}/${totalKeys})`);
    
    // Print breakdown for critical sections
    console.log('   Section Breakdown:');
    sections.forEach(sec => {
      if (sectionStats[sec]) {
        const p = ((sectionStats[sec].translated / sectionStats[sec].total) * 100).toFixed(0);
        console.log(`   - ${sec}: ${p}%`);
      } else {
        // It might be nested or named differently, but we check top-level keys
      }
    });
  });
}

checkCoverage();
