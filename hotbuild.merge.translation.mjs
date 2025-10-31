import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_DIR = path.join(
  __dirname,
  '/static/locales/en/01-translate'
);
const OUTPUT_FILE = path.join(__dirname, '/static/locales/en/translation.json');

function mergeTranslations() {
  console.log('🔄 Merging translation files...');

  // Check if translations directory exists
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    console.error(`❌ Translation directory not found: ${TRANSLATIONS_DIR}`);
    process.exit(1);
  }

  // Read all JSON files from the translations directory
  const files = fs
    .readdirSync(TRANSLATIONS_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort(); // Sort to ensure consistent merge order

  if (files.length === 0) {
    console.warn('⚠️  No JSON files found in translations directory');
    return;
  }

  console.log(
    `📁 Found ${files.length} translation files:`,
    files.map((f) => `  - ${f}`).join('\n')
  );

  // Merge all translation files
  const mergedTranslations = {};

  for (const file of files) {
    const filePath = path.join(TRANSLATIONS_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const translations = JSON.parse(content);

      // Deep merge the translations
      deepMerge(mergedTranslations, translations);
      console.log(`✅ Merged: ${file}`);
    } catch (error) {
      console.error(`❌ Error reading ${file}:`, error.message);
      process.exit(1);
    }
  }

  // Write the merged translations to the output file
  try {
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(mergedTranslations, null, 2));
    console.log(
      `✅ Successfully merged translations to: ${path.relative(process.cwd(), OUTPUT_FILE)}`
    );
  } catch (error) {
    console.error('❌ Error writing merged translations:', error.message);
    process.exit(1);
  }
}

function deepMerge(target, source) {
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      // Always create/overwrite the target key for objects
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      // Always overwrite existing keys with new values
      target[key] = source[key];
    }
  }
}

// Run the merge
mergeTranslations();
