#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
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
async function generateTranslationPrompt(
  sourceContent,
  targetLanguage,
  languageName
) {
  // Load glossary dynamically
  const glossary = await loadGlossary();

  const prompt = `
You are a professional translator specializing in web application localization for blockchain and cryptocurrency platforms.

TASK: Translate the following JSON object from English (en) into ${languageName} (${targetLanguage}).

REQUIREMENTS:
1. Preserve the exact JSON structure — do not change keys, order, or formatting. Translate only the values.
2. Preserve placeholders exactly: HTML tags, wrapper tags (<1>…</1>, <2>…</2>), variables ({token}, {{count}}, %s, $1, :id, \\n).
3. Do not add placeholders unless when they are explicitly present.
4. Apply glossary rules:
   - "keep" → Do not translate; keep exactly as in source.
   - "transliterate" → Do NOT translate the meaning of the word into the local language. 
      Instead, convert the English word into how it is pronounced and write it in the local script.

      - For Hindi and related languages: Write the English term in Hindi script, as commonly used in Hinglish.  
        Example: "blockchain" → "ब्लॉकचेन", "token" → "टोकन", "wallet" → "वॉलेट", "shared-state" → "शेयर्ड-स्टेट", "shared state" → "शेयर्ड स्टेट".  
      - For Japanese: Use Katakana for foreign loanwords.  
        Example: "blockchain" → "ブロックチェーン", "token" → "トークン", "wallet" → "ウォレット".  
      - For Arabic: Use Arabic script phonetic spelling.  
        Example: "blockchain" → "بلوكشين", "token" → "توكن".  
      - For German, Spanish, French, Italian and similar European languages: If the word is normally used in English in the crypto industry, KEEP the English spelling (do not translate).  
        Example: "blockchain" → "Blockchain", "token" → "Token".  
      - For Chinese (Simplified): Use standard transliteration or commonly adopted crypto term.  
        Example: "blockchain" → "区块链", "token" → "代币".  

      Always preserve capitalization (e.g., NFT, DAO, DeFi must remain uppercase).
   - Do not add any tags like <transliterate> or <keep> from glossary, there are included for your internal understanding. 
   - If a term is neither in glossary nor a brand name, translate naturally in context.
5. Keep blockchain terms consistent across the translation.
6. Ensure UI strings (buttons, labels) remain short, natural, and usable.
7. Use an approachable, informal tone that feels natural in ${languageName}, while professional and trustworthy.
8. Adapt for cultural fit without altering technical meaning.
9. Keep language simple and clear — avoid academic phrasing.
10. Do not omit any keys or values. If empty, leave as "".
11. Output only the translated JSON object (valid JSON, UTF-8).

Glossary reference:
${JSON.stringify(glossary, null, 2)}

SOURCE JSON:
${JSON.stringify(sourceContent, null, 2)}
`;

  return prompt;
}

export { generateTranslationPrompt, loadGlossary };
