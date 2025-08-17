import chalk from 'chalk';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, 'static/locales');
const SOURCE_LANG = 'en';
const TRANSLATION_FILE = 'translation.json';
const BUILD_META_FILE = path.join(__dirname, 'translatemeta.json');
const TEMP_TRANSLATE_DIR = path.join(__dirname, '01-translate');

// Supported languages with their full names
const SUPPORTED_LANGUAGES = {
  ar: 'Arabic',
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  hi: 'Hindi',
  id: 'Indonesian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  ru: 'Russian',
  tr: 'Turkish',
  vi: 'Vietnamese',
  'zh-CN': 'Chinese (Simplified)',
};

// Anthropic Claude API configuration
const WINDSURF_API_CONFIG = {
  baseUrl: 'https://api.anthropic.com/',
  apiKey: process.env.REACT_APP_WINDSURF_API_KEY,
  model: 'claude-sonnet-4-20250514',
};

/**
 * Calculate MD5 hash of a file
 */
async function calculateMD5(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.error(
      chalk.red(`❌ Error calculating MD5 for ${filePath}:`),
      error.message
    );
    throw error;
  }
}

/**
 * Load build metadata with enhanced translation tracking
 */
async function loadBuildMeta() {
  try {
    const content = await fs.readFile(BUILD_META_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // File doesn't exist or is invalid, return default
    return {
      sourceTranslationMD5: '',
      translations: {},
    };
  }
}

/**
 * Initialize temp translation directory
 */
async function initTempTranslateDir() {
  try {
    await fs.mkdir(TEMP_TRANSLATE_DIR, { recursive: true });
    console.log(
      chalk.gray(
        `📁 Initialized temp translation directory: ${TEMP_TRANSLATE_DIR}`
      )
    );
  } catch (error) {
    console.error(
      chalk.red('❌ Failed to create temp translation directory:'),
      error.message
    );
    throw error;
  }
}

/**
 * Save individual language translation to temp directory
 */
async function saveTempTranslation(languageCode, translatedContent) {
  const tempPath = path.join(TEMP_TRANSLATE_DIR, `${languageCode}.json`);

  try {
    await fs.writeFile(
      tempPath,
      JSON.stringify(translatedContent, null, 2),
      'utf8'
    );
    console.log(chalk.green(`✅ Saved ${languageCode} to temp directory`));
  } catch (error) {
    console.error(
      chalk.red(`❌ Failed to save ${languageCode} to temp directory:`),
      error.message
    );
    throw error;
  }
}

/**
 * Combine all temp translations and move to final locations
 */
async function combineAndDeployTranslations() {
  console.log(chalk.cyan('🔄 Combining and deploying all translations...'));

  const languagesToProcess = Object.keys(SUPPORTED_LANGUAGES);
  const results = { success: [], failed: [] };

  for (const languageCode of languagesToProcess) {
    const tempPath = path.join(TEMP_TRANSLATE_DIR, `${languageCode}.json`);

    try {
      // Check if temp file exists
      const tempContent = await fs.readFile(tempPath, 'utf8');
      const translatedContent = JSON.parse(tempContent);

      // Save to final location
      await saveTranslation(languageCode, translatedContent);
      results.success.push(languageCode);
    } catch (error) {
      console.error(
        chalk.red(`❌ Failed to deploy ${languageCode}:`),
        error.message
      );
      results.failed.push(languageCode);
    }
  }

  return results;
}

/**
 * Clean up temp translation directory
 */
async function cleanupTempTranslations() {
  try {
    await fs.rm(TEMP_TRANSLATE_DIR, { recursive: true, force: true });
    console.log(chalk.gray('🧹 Cleaned up temp translation directory'));
  } catch (error) {
    console.warn(
      chalk.yellow('⚠️  Failed to cleanup temp directory:'),
      error.message
    );
  }
}

/**
 * Save build metadata
 */
async function saveBuildMeta(meta) {
  try {
    await fs.writeFile(BUILD_META_FILE, JSON.stringify(meta, null, 2), 'utf8');
    console.log(
      chalk.green(
        `✅ Updated build metadata: ${path.relative(process.cwd(), BUILD_META_FILE)}`
      )
    );
  } catch (error) {
    console.error(chalk.red('❌ Error saving build metadata:'), error.message);
    throw error;
  }
}

/**
 * Check if Windsurf API is configured and accessible
 */
async function checkWindsurfAPI() {
  if (!WINDSURF_API_CONFIG.apiKey) {
    console.error(
      chalk.red('❌ WINDSURF_API_KEY environment variable is required')
    );
    console.log(chalk.yellow('💡 Set your Windsurf API key:'));
    console.log(chalk.gray('   export WINDSURF_API_KEY="your_api_key_here"'));
    console.log(
      chalk.red(
        '\n🛑 Build process halted. Please set the API key and try again.'
      )
    );
    throw new Error('WINDSURF_API_KEY environment variable is required');
  }

  try {
    // Test API connectivity with a simple translation request to validate the API key
    const testResponse = await fetch(
      `${WINDSURF_API_CONFIG.baseUrl}/v1/messages`,
      {
        method: 'POST',
        headers: {
          'x-api-key': WINDSURF_API_CONFIG.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 10,
          messages: [
            {
              role: 'user',
              content: 'Test API key validation. Respond with just "OK"',
            },
          ],
        }),
      }
    );

    if (testResponse.status === 401) {
      console.error(chalk.red('❌ Invalid or expired WINDSURF_API_KEY'));
      console.log(chalk.yellow('💡 Please check your API key:'));
      console.log(
        chalk.gray('   1. Verify the key is correct in your .env file')
      );
      console.log(chalk.gray('   2. Check if the key has expired'));
      console.log(chalk.gray('   3. Ensure you have proper API access'));
      console.log(
        chalk.red(
          '\n🛑 Build process halted. Please fix the API key and try again.'
        )
      );
      throw new Error('Invalid WINDSURF_API_KEY - authentication failed');
    }

    if (testResponse.status === 403) {
      console.error(
        chalk.red('❌ WINDSURF_API_KEY does not have required permissions')
      );
      console.log(chalk.yellow('💡 Please check your API key permissions:'));
      console.log(
        chalk.gray('   1. Ensure the key has access to chat completions')
      );
      console.log(chalk.gray('   2. Check your account limits and quotas'));
      console.log(
        chalk.red(
          '\n🛑 Build process halted. Please fix the API key permissions and try again.'
        )
      );
      throw new Error('Invalid WINDSURF_API_KEY - insufficient permissions');
    }

    if (!testResponse.ok) {
      console.warn(
        chalk.yellow(
          `⚠️  Windsurf API validation failed: ${testResponse.status} ${testResponse.statusText}`
        )
      );
      console.log(
        chalk.gray('   Proceeding anyway, will test during translation...')
      );
    } else {
      console.log(chalk.green('✅ Windsurf API key validated successfully'));
    }

    return true;
  } catch (error) {
    // If it's an API key validation error, re-throw it to halt the build
    if (error.message.includes('Invalid WINDSURF_API_KEY')) {
      throw error;
    }

    console.warn(
      chalk.yellow('⚠️  Could not connect to Windsurf API for validation')
    );
    console.log(chalk.gray(`   Error: ${error.message}`));
    console.log(
      chalk.gray('   Proceeding anyway, will test during translation...')
    );
    return true; // Continue anyway for network errors, let translation fail if needed
  }
}

/**
 * Translates text using Windsurf API
 */
async function translateWithWindsurf(
  text,
  targetLanguage,
  sourceLanguage = 'English'
) {
  const prompt = `You are a professional translator specializing in web application localization for blockchain and cryptocurrency applications.

TASK: Translate the following JSON content from ${sourceLanguage} to ${targetLanguage}.

REQUIREMENTS:
1. Maintain the exact JSON structure and key names
2. Only translate the VALUES, never the keys
3. Preserve HTML tags, placeholders like <1>, <2>, etc.
4. Keep technical terms consistent (e.g., "Push Chain", "testnet", "blockchain", "DeFi", "Web3")
5. Maintain proper context for UI elements (buttons, labels, descriptions)
6. Use appropriate formal/informal tone for the target language
7. Ensure cultural appropriateness and natural language flow
8. Keep brand names unchanged (Push Chain, Push Portal, etc.)

SOURCE JSON:
${JSON.stringify(text, null, 2)}

Return ONLY the translated JSON with the same structure:`;

  try {
    const response = await fetch(`${WINDSURF_API_CONFIG.baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': WINDSURF_API_CONFIG.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: WINDSURF_API_CONFIG.model,
        max_tokens: 8000,
        temperature: 0.1, // Low temperature for consistent translations
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Windsurf API error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    const translatedContent = result.content[0].text;

    // Parse the JSON response
    const jsonMatch = translatedContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in translation response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(
      chalk.red(`❌ Translation API error for ${targetLanguage}:`),
      error.message
    );
    throw error;
  }
}

/**
 * Translates content in chunks to handle large files
 */
async function translateInChunks(content, targetLanguage, chunkSize = 30) {
  const entries = Object.entries(content);
  const chunks = [];

  // Split into chunks
  for (let i = 0; i < entries.length; i += chunkSize) {
    chunks.push(Object.fromEntries(entries.slice(i, i + chunkSize)));
  }

  console.log(
    chalk.cyan(
      `  📦 Translating ${chunks.length} chunks for ${targetLanguage}...`
    )
  );

  const translatedChunks = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(chalk.gray(`    Chunk ${i + 1}/${chunks.length}...`));

    try {
      const translated = await translateWithWindsurf(
        chunks[i],
        SUPPORTED_LANGUAGES[targetLanguage]
      );
      translatedChunks.push(translated);

      // Add delay to respect API rate limits
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(
        chalk.red(`❌ Failed to translate chunk ${i + 1} for ${targetLanguage}`)
      );
      throw error;
    }
  }

  // Merge chunks back together
  return Object.assign({}, ...translatedChunks);
}

/**
 * Load translation file
 */
async function loadTranslation(languageCode) {
  const filePath = path.join(LOCALES_DIR, languageCode, TRANSLATION_FILE);

  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null; // File doesn't exist
    }
    throw error;
  }
}

/**
 * Save translated content to file
 */
async function saveTranslation(languageCode, translatedContent) {
  const targetDir = path.join(LOCALES_DIR, languageCode);
  const targetPath = path.join(targetDir, TRANSLATION_FILE);

  try {
    // Ensure directory exists
    await fs.mkdir(targetDir, { recursive: true });

    // Write translated content
    await fs.writeFile(
      targetPath,
      JSON.stringify(translatedContent, null, 2),
      'utf8'
    );

    console.log(chalk.green(`✅ Saved ${languageCode} translation`));
  } catch (error) {
    console.error(
      chalk.red(`❌ Failed to save ${languageCode} translation:`),
      error.message
    );
    throw error;
  }
}

/**
 * Get random keys from nested object
 */
function getRandomKeys(obj, count = 20) {
  const flattenKeys = (obj, prefix = '') => {
    let keys = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        keys = keys.concat(flattenKeys(value, fullKey));
      } else {
        keys.push({ key: fullKey, value });
      }
    }
    return keys;
  };

  const allKeys = flattenKeys(obj);
  const shuffled = allKeys.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Display side-by-side verification
 */
async function displayVerification(
  enTranslation,
  hiTranslation,
  esTranslation
) {
  console.log(chalk.blue('\n🔍 Translation Verification - Random 20 Keys'));
  console.log(chalk.gray('Please review the translations below:\n'));

  const randomKeys = getRandomKeys(enTranslation, 20);

  // Table header
  console.log(
    chalk.bold('KEY'.padEnd(40)) +
      ' | ' +
      chalk.bold('EN (English)'.padEnd(30)) +
      ' | ' +
      chalk.bold('HI (Hindi)'.padEnd(30)) +
      ' | ' +
      chalk.bold('ES (Spanish)'.padEnd(30))
  );
  console.log('-'.repeat(140));

  for (const { key } of randomKeys) {
    const enValue = getNestedValue(enTranslation, key) || 'N/A';
    const hiValue = getNestedValue(hiTranslation, key) || 'N/A';
    const esValue = getNestedValue(esTranslation, key) || 'N/A';

    // Truncate long values
    const truncate = (str, len) =>
      str.length > len ? str.substring(0, len - 3) + '...' : str;

    console.log(
      chalk.cyan(key.padEnd(40)) +
        ' | ' +
        chalk.white(truncate(String(enValue), 30).padEnd(30)) +
        ' | ' +
        chalk.yellow(truncate(String(hiValue), 30).padEnd(30)) +
        ' | ' +
        chalk.green(truncate(String(esValue), 30).padEnd(30))
    );
  }

  console.log('\n');
}

/**
 * Prompt user to continue
 */
async function promptToContinue() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      chalk.blue('Do you want to continue with these translations? (y/N): '),
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      }
    );
  });
}

/**
 * Main translation automation function
 */
async function automateTranslations() {
  console.log(chalk.blue('🌍 Starting automated translation process...'));

  // Step 1: Calculate current MD5 of source translation
  const sourceTranslationPath = path.join(
    LOCALES_DIR,
    SOURCE_LANG,
    TRANSLATION_FILE
  );

  // Check if source translation file exists
  if (
    !(await fs
      .access(sourceTranslationPath)
      .then(() => true)
      .catch(() => false))
  ) {
    console.error(
      chalk.red(
        `❌ Source translation file not found: ${sourceTranslationPath}`
      )
    );
    process.exit(1);
  }

  // Start the optimized translation process
  await automateTranslations();
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(chalk.blue('🌍 Automated Translation Builder\n'));
    console.log('Usage: node build.translation.mjs [options]\n');
    console.log('Features:');
    console.log('  • MD5 checksum tracking to skip unnecessary translations');
    console.log('  • Windsurf API integration for high-quality translations');
    console.log('  • Side-by-side verification of random keys');
    console.log('  • Automatic translatemeta.json updates\n');
    console.log('Options:');
    console.log('  -h, --help    Show this help message\n');
    console.log('Environment Variables:');
    console.log('  WINDSURF_API_KEY    Required - Your Windsurf API key');
    console.log('  WINDSURF_API_URL    Optional - Windsurf API base URL');
    return;
  }

  try {
    await automateTranslations();
  } catch (error) {
    console.error(
      chalk.red('❌ Translation automation failed:'),
      error.message
    );
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { automateTranslations, calculateMD5, loadBuildMeta, saveBuildMeta };
