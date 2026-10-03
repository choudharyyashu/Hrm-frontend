const fs = require('fs');
const vm = require('vm');

const srcPath = 'src/config/translations.js';
const content = fs.readFileSync(srcPath, 'utf8');

// Parse current translations
const match = content.match(/export const TRANSLATIONS = (\{[\s\S]*?\});\n\n\/\*\*/);
if (!match) {
  console.error('Could not parse translations');
  process.exit(1);
}

const TRANSLATIONS = vm.runInNewContext('const T = ' + match[1] + '; result = T;');

console.log('Current counts:', {
  en: Object.keys(TRANSLATIONS.en).length,
  hi: Object.keys(TRANSLATIONS.hi).length,
  es: Object.keys(TRANSLATIONS.es).length,
  de: Object.keys(TRANSLATIONS.de).length,
  ar: Object.keys(TRANSLATIONS.ar).length
});
