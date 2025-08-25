#!/usr/bin/env node

import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Default acronyms that should maintain casing
const DEFAULT_ACRONYMS = [
  'NFT',
  'DAO',
  'DeFi',
  'L1',
  'L2',
  'RPC',
  'TVL',
  'API',
  'SDK',
  'UI',
  'UX',
  'URL',
  'HTTP',
  'HTTPS',
  'JSON',
  'HTML',
  'CSS',
  'JS',
  'TS',
];

// Placeholders to preserve exactly
const PLACEHOLDER_RXS = [
  /<\d+>.*?<\/\d+>/g, // wrapper tags <1>...</1>
  /{[^}]+}/g, // {token}
  /{{\s*[^}]+\s*}}/g, // {{count}}
  /%\d*\$?s/g, // %s, %1$s
  /\$\d+/g, // $1
  /:id\b/g, // :id
  /\\n/g, // literal \n
];

// Non-Latin script languages that should be checked for English leakage
const NON_LATIN_PREF = new Set([
  'hi',
  'bn',
  'mr',
  'ne',
  'ta',
  'te',
  'kn',
  'ml',
  'pa',
  'gu',
  'ja',
  'ko',
  'ar',
  'fa',
  'ur',
  'zh',
  'zh-CN',
  'zh-Hans',
  'zh-Hant',
  'th',
  'uk',
  'ru',
  'he',
]);

// Quick helpers
const isString = (v) => typeof v === 'string';
const asciiRatio = (s) =>
  s.replace(/[^\x00-\x7F]/g, '').length / Math.max(1, s.length);
const hasLatinWordRun = (s) => /\b[a-zA-Z]{3,}\b/.test(s); // crude English word detector
const containsHelperTags = (s) => /<(?:keep|transliterate)>/i.test(s);

/**
 * Count placeholders in a string
 */
function countPlaceholders(s) {
  return PLACEHOLDER_RXS.map((rx) => (s.match(rx) || []).length);
}

/**
 * Get placeholder sequence for order comparison
 */
function placeholderSequence(s) {
  // Flatten to a sequence by placeholder kind; used to enforce order parity
  return PLACEHOLDER_RXS.flatMap((rx, i) =>
    (s.match(rx) || []).map((m) => `${i}:${m}`)
  );
}

/**
 * Create glossary maps for keep and transliterate terms
 */
function makeGlossaryMaps(glossary = []) {
  const keep = new Set();
  const translit = new Set();

  glossary.forEach(({ term, rule }) => {
    if (rule === 'keep') keep.add(term);
    else if (rule === 'transliterate') translit.add(term);
  });

  return { keep, translit };
}

/**
 * Escape string for regex
 */
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Validate translation against source
 */
export function validateTranslation(opts) {
  const {
    source,
    target,
    glossary = [],
    targetLanguage = '',
    acronyms = DEFAULT_ACRONYMS,
  } = opts;

  const checkEnglishLeakage =
    opts.checkEnglishLeakage ?? NON_LATIN_PREF.has(targetLanguage);

  const issues = [];
  const { keep: KEEP, translit: TL } = makeGlossaryMaps(glossary);

  function walk(a, b, path = []) {
    const here = path.join('.');

    // Structure & order
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        issues.push(`Array length mismatch at ${here}`);
      }
      const len = Math.min(a.length, b.length);
      for (let i = 0; i < len; i++) {
        walk(a[i], b[i], [...path, String(i)]);
      }
      return;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
      const ak = Object.keys(a);
      const bk = Object.keys(b);
      if (ak.join('|') !== bk.join('|')) {
        issues.push(
          `Key set or order mismatch at ${here} (expected ${ak.join(', ')}, got ${bk.join(', ')})`
        );
      }
      const len = Math.min(ak.length, bk.length);
      for (let i = 0; i < len; i++) {
        const k = ak[i];
        if (!(k in b)) continue;
        walk(a[k], b[k], [...path, k]);
      }
      return;
    }

    // Type parity
    if (typeof a !== typeof b) {
      issues.push(`Type mismatch at ${here}: ${typeof a} vs ${typeof b}`);
      return;
    }

    // String checks
    if (isString(a) && isString(b)) {
      // Preserve empty strings exactly
      if (a === '' && b !== '') {
        issues.push(`Empty string should remain empty at ${here}`);
      }

      // Placeholder parity (count + rough order)
      const ca = countPlaceholders(a);
      const cb = countPlaceholders(b);
      ca.forEach((n, i) => {
        if (n !== cb[i]) {
          issues.push(`Placeholder count mismatch at ${here} (pattern #${i})`);
        }
      });

      const seqA = placeholderSequence(a);
      const seqB = placeholderSequence(b);
      if (seqA.length === seqB.length) {
        // Compare order by pattern kind (ignore actual contents)
        const orderA = seqA.map((s) => s.split(':')[0]).join(',');
        const orderB = seqB.map((s) => s.split(':')[0]).join(',');
        if (orderA !== orderB) {
          issues.push(`Placeholder order drift at ${here}`);
        }
      }

      // No helper tags
      if (containsHelperTags(b)) {
        issues.push(
          `Helper tags <keep>/<transliterate> must not appear at ${here}`
        );
      }

      // Acronym casing
      acronyms.forEach((acr) => {
        const rx = new RegExp(`\\b${acr}\\b`, 'i');
        if (rx.test(b) && !new RegExp(`\\b${acr}\\b`).test(b)) {
          issues.push(`Acronym casing changed at ${here}: expected "${acr}"`);
        }
      });

      // Glossary sanity checks (lightweight heuristics)
      // KEEP terms must remain exactly if they appear standalone in source
      KEEP.forEach((term) => {
        const rx = new RegExp(`\\b${escapeRegExp(term)}\\b`);
        if (rx.test(a) && !rx.test(b)) {
          issues.push(
            `KEEP term modified at ${here}: "${term}" should remain exactly as in source`
          );
        }
      });

      // Prevent sentence-level transliteration for TL terms (non-words ok)
      if (TL.size && NON_LATIN_PREF.has(targetLanguage)) {
        // Heuristic: if >50% ASCII letters in target and target != source, flag
        if (
          checkEnglishLeakage &&
          asciiRatio(b) > 0.5 &&
          hasLatinWordRun(b) &&
          b !== a
        ) {
          issues.push(
            `Possible sentence-level transliteration (Hinglish) at ${here}; translate the sentence, transliterate only glossary terms`
          );
        }
      }

      // English leakage (non-Latin langs): allow if source==target or due to KEEP terms
      if (checkEnglishLeakage) {
        const stripped = b
          .replace(
            new RegExp(
              `\\b(${[...KEEP].map(escapeRegExp).join('|')})\\b`,
              'gi'
            ),
            ''
          )
          .trim();
        if (
          stripped &&
          asciiRatio(stripped) > 0.4 &&
          hasLatinWordRun(stripped)
        ) {
          issues.push(
            `English leakage at ${here}: found large English segments in a ${targetLanguage} translation`
          );
        }
      }
    }
  }

  walk(source, target);

  return {
    ok: issues.length === 0,
    issues,
  };
}

/**
 * Validate and potentially correct a translation (less sensitive version)
 * @param {Object} sourceContent - Original content to translate
 * @param {Object} translatedContent - Translated content to validate
 * @param {string} targetLanguage - Target language code (e.g., 'es', 'hi')
 * @param {string} languageName - Full language name (e.g., 'Spanish', 'Hindi')
 * @param {Function} translateFunction - Function to re-translate if validation fails
 * @param {Object} options - Additional validation options
 * @returns {Object} - { content: finalContent, wasValidated: boolean, wasCorrected: boolean }
 */
export async function validateAndCorrectTranslation(
  sourceContent,
  translatedContent,
  targetLanguage,
  languageName,
  translateFunction,
  options = {}
) {
  const {
    glossary = [],
    maxRetries = 1,
    showValidationDetails = true,
    strictMode = false, // Less strict by default
  } = options;

  // Initial validation with less strict settings
  const validation = validateTranslation({
    source: sourceContent,
    target: translatedContent,
    targetLanguage,
    glossary,
    checkEnglishLeakage: options.checkEnglishLeakage,
    strictMode,
  });

  // Filter out minor issues if not in strict mode
  let criticalIssues = validation.issues;
  if (!strictMode) {
    criticalIssues = validation.issues.filter((issue) => {
      // Only flag critical issues in non-strict mode
      return (
        issue.includes('Type mismatch') ||
        issue.includes('Array length mismatch') ||
        issue.includes('Key set or order mismatch') ||
        issue.includes('Placeholder count mismatch') ||
        issue.includes('Empty string should remain empty')
      );
    });
  }

  const hasCriticalIssues = criticalIssues.length > 0;

  if (!hasCriticalIssues) {
    if (showValidationDetails && validation.issues.length > 0) {
      console.log(
        chalk.green(
          `   ✅ Validation passed for ${languageName} (${validation.issues.length - criticalIssues.length} minor issues ignored)`
        )
      );
    } else if (showValidationDetails) {
      console.log(chalk.green(`   ✅ Validation passed for ${languageName}`));
    }
    return {
      content: translatedContent,
      wasValidated: true,
      wasCorrected: false,
    };
  }

  // Show only critical validation issues
  if (showValidationDetails) {
    console.log(
      chalk.yellow(
        `   ⚠️  Critical validation issues for ${languageName} (${criticalIssues.length} issues):`
      )
    );
    criticalIssues.slice(0, 2).forEach((issue) => {
      console.log(chalk.gray(`      • ${issue}`));
    });
    if (criticalIssues.length > 2) {
      console.log(
        chalk.gray(
          `      • ... and ${criticalIssues.length - 2} more critical issues`
        )
      );
    }
  }

  // Only attempt correction for critical issues
  let correctedContent = translatedContent;
  let correctionAttempts = 0;

  while (correctionAttempts < maxRetries) {
    correctionAttempts++;

    if (showValidationDetails) {
      console.log(
        chalk.blue(
          `   🔄 Attempting correction ${correctionAttempts}/${maxRetries} for ${languageName}...`
        )
      );
    }

    try {
      // Create correction prompt with only critical issues
      const correctionPrompt = `The translation has critical validation issues. Please fix the following problems:

${criticalIssues.map((issue) => `- ${issue}`).join('\n')}

Please provide a corrected translation that addresses these critical issues while maintaining the meaning and structure.`;

      // Re-translate with correction context
      correctedContent = await translateFunction(
        sourceContent,
        targetLanguage,
        languageName,
        correctionPrompt
      );

      // Validate the correction (still with less strict mode)
      const correctionValidation = validateTranslation({
        source: sourceContent,
        target: correctedContent,
        targetLanguage,
        glossary,
        checkEnglishLeakage: options.checkEnglishLeakage,
        strictMode,
      });

      const correctionCriticalIssues = strictMode
        ? correctionValidation.issues
        : correctionValidation.issues.filter((issue) => {
            return (
              issue.includes('Type mismatch') ||
              issue.includes('Array length mismatch') ||
              issue.includes('Key set or order mismatch') ||
              issue.includes('Placeholder count mismatch') ||
              issue.includes('Empty string should remain empty')
            );
          });

      if (correctionCriticalIssues.length === 0) {
        if (showValidationDetails) {
          console.log(
            chalk.green(`   ✅ Correction successful for ${languageName}`)
          );
        }
        return {
          content: correctedContent,
          wasValidated: true,
          wasCorrected: true,
        };
      } else {
        if (showValidationDetails) {
          console.log(
            chalk.yellow(
              `   ⚠️  Correction attempt ${correctionAttempts} still has ${correctionCriticalIssues.length} critical issues`
            )
          );
        }
      }
    } catch (error) {
      if (showValidationDetails) {
        console.log(
          chalk.red(
            `   ❌ Correction attempt ${correctionAttempts} failed: ${error.message}`
          )
        );
      }
    }
  }

  // If all correction attempts failed, use original translation
  if (showValidationDetails) {
    console.log(
      chalk.yellow(
        `   ⚠️  Using original translation for ${languageName} (correction failed)`
      )
    );
  }

  return {
    content: translatedContent, // Use original if correction failed
    wasValidated: true,
    wasCorrected: false,
  };
}

/**
 * Create default glossary for Push Chain terms from JSON file
 */
export function createPushChainGlossary() {
  try {
    // Use require for synchronous loading in ES modules
    const require = createRequire(import.meta.url);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const glossaryPath = path.join(
      __dirname,
      'build.translation.automation.glossary.json'
    );

    // Load glossary JSON synchronously
    const glossaryData = require(glossaryPath);

    // Convert JSON object to array format expected by validator
    return Object.entries(glossaryData).map(([term, rule]) => ({
      term,
      rule,
    }));
  } catch (error) {
    console.warn(
      'Failed to load glossary from JSON file, using fallback:',
      error.message
    );

    // Fallback to basic glossary if file loading fails
    return [
      { term: 'Push Chain', rule: 'keep' },
      { term: 'Push Portal', rule: 'keep' },
      { term: 'blockchain', rule: 'transliterate' },
      { term: 'token', rule: 'transliterate' },
      { term: 'wallet', rule: 'transliterate' },
      { term: 'NFT', rule: 'transliterate' },
      { term: 'DAO', rule: 'transliterate' },
      { term: 'DeFi', rule: 'transliterate' },
    ];
  }
}

export default {
  validateTranslation,
  validateAndCorrectTranslation,
  createPushChainGlossary,
};
