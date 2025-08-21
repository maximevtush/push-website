#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load glossary from JSON file
 */
async function loadGlossary() {
  const glossaryPath = path.join(
    __dirname,
    'build.translation.automation.glossary.json'
  );

  try {
    const glossaryContent = await fs.readFile(glossaryPath, 'utf8');
    return JSON.parse(glossaryContent);
  } catch (error) {
    console.warn(
      chalk.yellow('⚠️  Could not load glossary file, using empty glossary')
    );
    return {};
  }
}

/**
 * Generate the translation prompt for a given language and content
 * This is the single source of truth for the translation prompt
 */
async function generateTranslationPrompt(sourceContent, targetLanguage, languageName) {
  // Load glossary dynamically
  const glossary = await loadGlossary();

  const prompt = `
You are a professional translator specializing in web application localization for blockchain and cryptocurrency platforms.

TASK: Translate the following JSON object from English (en) into ${languageName} (${targetLanguage}).

REQUIREMENTS:
1. Preserve the exact JSON structure — do not change keys, order, or formatting. Translate only the values.
2. Preserve placeholders exactly: HTML tags, wrapper tags (<1>…</1>, <2>…</2>), variables ({token}, {{count}}, %s, $1, :id, \\n).
3. Apply glossary rules:
   - "keep" → Do not translate; keep exactly as in source.
   - "transliterate" → Write the word in ${languageName} script as pronounced (Hinglish-style for Hindi, Katakana for Japanese, etc.).
   - If a term is neither in glossary nor a brand name, translate naturally in context.
4. Keep blockchain terms consistent across the translation.
5. Ensure UI strings (buttons, labels) remain short, natural, and usable.
6. Use an approachable, informal tone that feels natural in ${languageName}, while professional and trustworthy.
7. Adapt for cultural fit without altering technical meaning.
8. Keep language simple and clear — avoid academic phrasing.
9. Do not omit any keys or values. If empty, leave as "".
10. Output only the translated JSON object (valid JSON, UTF-8).

Glossary reference:
${JSON.stringify(glossary, null, 2)}

SOURCE JSON:
${JSON.stringify(sourceContent, null, 2)}
`;

  return prompt;
}

export { generateTranslationPrompt, loadGlossary };
