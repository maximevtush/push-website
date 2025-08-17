#!/usr/bin/env node

import chalk from 'chalk';
import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, 'static/locales');
const SOURCE_LANG = 'en';
const TRANSLATION_FILE = 'translation.json';
const BUILD_META_FILE = path.join(__dirname, 'buildmeta.json');
const TEMP_TRANSLATE_DIR = path.join(__dirname, '01-translate');
const SOURCE_CHUNKS_DIR = path.join(LOCALES_DIR, SOURCE_LANG, '01-translate');

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

// AI Provider configuration
const AI_PROVIDER = process.env.AI_PROVIDER || 'windsurf';

// Windsurf/Anthropic API configuration
const WINDSURF_CONFIG = {
  apiKey: process.env.REACT_APP_WINDSURF_API_KEY,
  baseUrl: 'https://api.anthropic.com',
  model: 'claude-sonnet-4-20250514',
};

// Local AI configuration (OpenWebUI/Ollama)
const LOCAL_AI_CONFIG = {
  apiKey: process.env.LOCAL_AI_API_KEY || '', // Optional for local setups
  baseUrl: process.env.LOCAL_AI_BASE_URL || 'http://localhost:11434',
  model: process.env.LOCAL_AI_MODEL || 'llama3.1',
};

// Get current AI configuration based on provider
function getAIConfig() {
  const provider = process.env.AI_PROVIDER || 'windsurf';
  const timeout = parseInt(process.env.AI_REQUEST_TIMEOUT) || 60000; // Default 60 seconds

  if (provider === 'windsurf') {
    return {
      provider: 'windsurf',
      apiKey: process.env.REACT_APP_WINDSURF_API_KEY,
      baseUrl: 'https://api.anthropic.com',
      model: 'claude-3-5-sonnet-20241022',
      timeout,
    };
  } else if (provider === 'local') {
    return {
      provider: 'local',
      apiKey: process.env.LOCAL_AI_API_KEY, // Optional
      baseUrl: process.env.LOCAL_AI_BASE_URL,
      model: process.env.LOCAL_AI_MODEL || 'llama3.1',
      timeout,
    };
  } else {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

// Rate limiting configuration - configurable via environment
const RATE_LIMIT = {
  maxCallsPerMinute: parseInt(process.env.AI_RATE_LIMIT_PER_MINUTE) || 5,
  callTimes: [],
};

// Token counting and chunk size validation - configurable via environment
const TOKEN_LIMITS = {
  maxInputTokens: parseInt(process.env.AI_MAX_INPUT_TOKENS) || 100000,
  maxChunkTokens: parseInt(process.env.AI_MAX_CHUNK_TOKENS) || 2000,
  avgCharsPerToken: parseFloat(process.env.AI_CHARS_PER_TOKEN) || 3.5,
};

// Rate limiting helper function
function waitForRateLimit() {
  const now = Date.now();
  const oneMinuteAgo = now - 60000; // 60 seconds ago

  // Remove calls older than 1 minute
  RATE_LIMIT.callTimes = RATE_LIMIT.callTimes.filter(
    (time) => time > oneMinuteAgo
  );

  // If we've made 5 calls in the last minute, wait
  if (RATE_LIMIT.callTimes.length >= RATE_LIMIT.maxCallsPerMinute) {
    const oldestCall = RATE_LIMIT.callTimes[0];
    const waitTime = oldestCall + 60000 - now;
    return Math.max(0, waitTime);
  }

  return 0;
}

// Record API call for rate limiting
function recordApiCall() {
  RATE_LIMIT.callTimes.push(Date.now());
}

/**
 * Estimate token count for text content
 */
function estimateTokens(text) {
  if (!text || typeof text !== 'string') return 0;

  // JSON has more structural overhead (brackets, quotes, commas)
  // Use conservative estimate
  return Math.ceil(text.length / TOKEN_LIMITS.avgCharsPerToken);
}

/**
 * Check if a chunk is too large for translation
 */
function isChunkTooLarge(chunkContent) {
  const jsonString = JSON.stringify(chunkContent, null, 2);
  const estimatedTokens = estimateTokens(jsonString);

  console.log(chalk.gray(`  📊 Estimated tokens: ${estimatedTokens}`));

  return estimatedTokens > TOKEN_LIMITS.maxChunkTokens;
}

/**
 * Recursively split JSON object into smaller chunks (3+ levels deep)
 */
function splitLargeChunk(chunkContent, chunkFileName, maxDepth = 5) {
  console.log(chalk.yellow(`📦 Splitting large chunk: ${chunkFileName}`));

  /**
   * Recursive function to split nested objects
   */
  function splitRecursively(obj, keyPath, depth = 0) {
    const chunks = [];
    const keys = Object.keys(obj);

    for (const key of keys) {
      const currentPath = keyPath ? `${keyPath}-${key}` : key;
      const subChunk = { [key]: obj[key] };
      const subChunkString = JSON.stringify(subChunk, null, 2);
      const subChunkTokens = estimateTokens(subChunkString);

      if (subChunkTokens <= TOKEN_LIMITS.maxChunkTokens) {
        // Chunk is small enough, add it
        chunks.push({
          content: subChunk,
          name: `${chunkFileName}-${currentPath}`,
          tokens: subChunkTokens,
        });
      } else if (
        depth < maxDepth &&
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Chunk is too large but we can split deeper
        console.log(
          chalk.blue(
            `  ${'  '.repeat(depth)}🔄 Level ${depth + 1}: Splitting ${currentPath} (${subChunkTokens} tokens)...`
          )
        );

        const deeperChunks = splitRecursively(obj[key], currentPath, depth + 1);

        if (deeperChunks.length > 0) {
          // Successfully split deeper
          chunks.push(...deeperChunks);
        } else {
          // Could not split deeper, include as-is
          console.log(
            chalk.yellow(
              `  ${'  '.repeat(depth)}💡 Cannot split ${currentPath} further, including anyway`
            )
          );
          chunks.push({
            content: subChunk,
            name: `${chunkFileName}-${currentPath}`,
            tokens: subChunkTokens,
          });
        }
      } else {
        // Chunk is too large but cannot split further (max depth reached or not an object)
        const reason =
          depth >= maxDepth ? 'max depth reached' : 'not a splittable object';
        console.log(
          chalk.yellow(
            `  ${'  '.repeat(depth)}⚠️  ${currentPath} too large (${subChunkTokens} tokens), ${reason}`
          )
        );
        chunks.push({
          content: subChunk,
          name: `${chunkFileName}-${currentPath}`,
          tokens: subChunkTokens,
        });
      }
    }

    return chunks;
  }

  // Start recursive splitting from top level
  const result = splitRecursively(chunkContent, '', 0);

  console.log(
    chalk.blue(
      `✂️  Split into ${result.length} sub-chunks (max depth: ${maxDepth})`
    )
  );
  return result;
}

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
 * Dynamically discover all chunk files from en/01-translate directory
 */
async function discoverChunkFiles() {
  try {
    const files = await fs.readdir(SOURCE_CHUNKS_DIR);
    const chunkFiles = files.filter((file) => file.endsWith('.json')).sort(); // Maintain consistent order

    console.log(
      chalk.gray(
        `📁 Discovered ${chunkFiles.length} chunk files in ${SOURCE_CHUNKS_DIR}`
      )
    );
    return chunkFiles;
  } catch (error) {
    console.error(
      chalk.red('❌ Failed to discover chunk files:'),
      error.message
    );
    throw error;
  }
}

/**
 * Calculate MD5 hash for all chunk files combined
 */
async function calculateChunksMD5(chunkFiles) {
  try {
    let combinedContent = '';

    for (const chunkFile of chunkFiles) {
      const chunkPath = path.join(SOURCE_CHUNKS_DIR, chunkFile);
      const content = await fs.readFile(chunkPath, 'utf8');
      combinedContent += `${chunkFile}:${content}`;
    }

    return crypto.createHash('md5').update(combinedContent).digest('hex');
  } catch (error) {
    console.error(chalk.red('❌ Error calculating chunks MD5:'), error.message);
    throw error;
  }
}

/**
 * Calculate MD5 hash for individual chunk file
 */
async function calculateChunkMD5(chunkFile) {
  try {
    const chunkPath = path.join(SOURCE_CHUNKS_DIR, chunkFile);
    const content = await fs.readFile(chunkPath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (error) {
    console.error(
      chalk.red(`❌ Error calculating MD5 for ${chunkFile}:`),
      error.message
    );
    throw error;
  }
}

/**
 * Load build metadata with enhanced chunk-level tracking
 */
async function loadBuildMeta() {
  try {
    const content = await fs.readFile(BUILD_META_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // File doesn't exist or is invalid, return default
    return {
      sourceChunksMD5: '',
      translations: {},
      chunks: {},
    };
  }
}

/**
 * Save build metadata
 */
async function saveBuildMeta(buildMeta) {
  await fs.writeFile(BUILD_META_FILE, JSON.stringify(buildMeta, null, 2));
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
 * Save translation to final location
 */
async function saveTranslation(languageCode, translatedContent) {
  const targetDir = path.join(LOCALES_DIR, languageCode);
  const targetPath = path.join(targetDir, TRANSLATION_FILE);

  try {
    await fs.mkdir(targetDir, { recursive: true });
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
 * Validate AI provider API configuration
 */
async function checkAIProvider() {
  const config = getAIConfig();

  console.log(
    chalk.blue(`🤖 Using AI Provider: ${config.provider.toUpperCase()}`)
  );

  if (config.provider === 'windsurf' && !config.apiKey) {
    console.error(
      chalk.red(
        '❌ WINDSURF_API_KEY environment variable is required for Windsurf provider'
      )
    );
    console.log(chalk.yellow('💡 Set your Windsurf API key:'));
    console.log(
      chalk.gray('   export REACT_APP_WINDSURF_API_KEY="your_api_key_here"')
    );
    console.log(
      chalk.red(
        '\n🛑 Build process halted. Please set the API key and try again.'
      )
    );
    throw new Error('WINDSURF_API_KEY environment variable is required');
  }

  if (config.provider === 'local' && !config.baseUrl) {
    console.error(
      chalk.red(
        '❌ LOCAL_AI_BASE_URL environment variable is required for local provider'
      )
    );
    console.log(chalk.yellow('💡 Set your local AI endpoint:'));
    console.log(
      chalk.gray('   export LOCAL_AI_BASE_URL="http://localhost:11434"')
    );
    console.log(
      chalk.red(
        '\n🛑 Build process halted. Please set the endpoint and try again.'
      )
    );
    throw new Error('LOCAL_AI_BASE_URL environment variable is required');
  }

  try {
    // Check rate limit before making API call
    const waitTime = waitForRateLimit();
    if (waitTime > 0) {
      console.log(
        chalk.yellow(
          `⏳ Rate limit: waiting ${Math.ceil(waitTime / 1000)}s before API validation...`
        )
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    // Record this API call
    recordApiCall();

    // Test API connectivity based on provider
    const config = getAIConfig();
    let testResponse;

    if (config.provider === 'windsurf') {
      testResponse = await fetch(`${config.baseUrl}/v1/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': config.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.model,
          max_tokens: 4096,
          messages: [
            {
              role: 'user',
              content: 'Test API key validation. Respond with just "OK"',
            },
          ],
        }),
      });
    } else {
      // Local AI (OpenWebUI/Ollama) test
      const baseUrl = config.baseUrl.endsWith('/')
        ? config.baseUrl.slice(0, -1)
        : config.baseUrl;
      testResponse = await fetch(`${baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
        },
        body: JSON.stringify({
          model: config.model,
          prompt: 'Test connection. Respond with just "OK"',
          stream: false,
        }),
      });
    }

    if (testResponse.status === 401) {
      const providerName =
        config.provider === 'windsurf'
          ? 'WINDSURF_API_KEY'
          : 'LOCAL_AI_API_KEY';
      console.error(chalk.red(`❌ Invalid or expired ${providerName}`));
      console.log(chalk.yellow('💡 Please check your API configuration:'));
      console.log(
        chalk.gray(
          '   1. Verify the configuration is correct in your .env file'
        )
      );
      console.log(chalk.gray('   2. Check if the key/endpoint is valid'));
      console.log(chalk.gray('   3. Ensure you have proper API access'));
      console.log(
        chalk.red(
          '\n🛑 Build process halted. Please fix the API configuration and try again.'
        )
      );
      throw new Error(`Invalid ${providerName} - authentication failed`);
    }

    if (!testResponse.ok) {
      throw new Error(
        `${config.provider} API test failed: ${testResponse.status} ${testResponse.statusText}`
      );
    }

    console.log(
      chalk.green(
        `✅ ${config.provider.toUpperCase()} API validated successfully`
      )
    );
    return true;
  } catch (error) {
    if (error.message.includes('authentication failed')) {
      throw error; // Re-throw authentication errors
    }
    console.error(
      chalk.red(`❌ Failed to validate ${config.provider.toUpperCase()} API:`),
      error.message
    );
    throw new Error(
      `${config.provider.toUpperCase()} API validation failed: ${error.message}`
    );
  }
}

/**
 * Translate content using configured AI provider
 */
async function translateContent(sourceContent, targetLanguage, languageName) {
  // Check rate limit before making API call
  const waitTime = waitForRateLimit();
  if (waitTime > 0) {
    console.log(
      chalk.yellow(
        `⏳ Rate limit: waiting ${Math.ceil(
          waitTime / 1000
        )}s before translating to ${languageName}...`
      )
    );
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  // Record this API call
  recordApiCall();

  try {
    const config = getAIConfig();
    const prompt = `You are a professional translator. Translate the following JSON object from English to ${languageName} (${targetLanguage}).

IMPORTANT RULES:
1. Maintain the exact same JSON structure and keys
2. Only translate the VALUES, never the keys
3. Preserve all formatting, HTML tags, and special characters
4. Keep technical terms and brand names unchanged
5. Ensure cultural appropriateness for ${languageName} speakers
6. Return ONLY the translated JSON object, no additional text

Source JSON to translate:
${JSON.stringify(sourceContent, null, 2)}`;

    let response;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      if (config.provider === 'windsurf') {
        response = await fetch(`${config.baseUrl}/v1/messages`, {
          method: 'POST',
          headers: {
            'x-api-key': config.apiKey,
            'Content-Type': 'application/json',
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: config.model,
            max_tokens: 4000,
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
          }),
          signal: controller.signal,
        });
      } else {
        // Local AI (OpenWebUI/Ollama)
        const baseUrl = config.baseUrl.endsWith('/')
          ? config.baseUrl.slice(0, -1)
          : config.baseUrl;
        response = await fetch(`${baseUrl}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }),
          },
          body: JSON.stringify({
            model: config.model,
            prompt: prompt,
            stream: false,
          }),
          signal: controller.signal,
        });
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      throw new Error(
        `${config.provider} API error: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    let translatedContent;

    if (config.provider === 'windsurf') {
      translatedContent = result.content[0].text;
    } else {
      translatedContent = result.response;
    }

    // Parse the JSON response with improved error handling
    const jsonMatch = translatedContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in translation response');
    }

    let jsonString = jsonMatch[0];

    // Try to fix common JSON formatting issues
    try {
      return JSON.parse(jsonString);
    } catch (parseError) {
      console.warn(
        chalk.yellow(
          `⚠️  Initial JSON parse failed for ${targetLanguage}, attempting to fix...`
        )
      );

      // Common fixes for malformed JSON
      // 1. Remove trailing commas
      jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');

      // 2. Fix unescaped quotes in values
      jsonString = jsonString.replace(
        /"([^"]*?)"([^":,}\]]*?)"([^":,}\]]*?)"/g,
        '"$1\\"$2\\"$3"'
      );

      // 3. Remove any text after the final closing brace
      const lastBraceIndex = jsonString.lastIndexOf('}');
      if (lastBraceIndex !== -1) {
        jsonString = jsonString.substring(0, lastBraceIndex + 1);
      }

      try {
        const parsed = JSON.parse(jsonString);
        console.log(
          chalk.green(
            `✅ Successfully fixed and parsed JSON for ${targetLanguage}`
          )
        );
        return parsed;
      } catch (secondError) {
        console.error(
          chalk.red(
            `❌ Failed to parse JSON for ${targetLanguage} even after fixes:`
          )
        );
        console.error(chalk.gray('Original error:'), parseError.message);
        console.error(chalk.gray('Second error:'), secondError.message);
        console.error(
          chalk.gray('JSON snippet:'),
          jsonString.substring(0, 500) + '...'
        );
        throw new Error(`JSON parsing failed: ${parseError.message}`);
      }
    }
  } catch (error) {
    console.error(
      chalk.red(`❌ Translation API error for ${targetLanguage}:`),
      error.message
    );
    throw error;
  }
}

/**
 * Deep merge objects - properly combines nested objects instead of overwriting
 */
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        // Both are objects, merge them recursively
        result[key] = deepMerge(result[key], source[key]);
      } else {
        // Otherwise, use the source value
        result[key] = source[key];
      }
    }
  }

  return result;
}

/**
 * Count keys recursively in a nested object
 */
function countKeys(obj, path = '') {
  let count = 0;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        count += countKeys(obj[key], currentPath);
      } else {
        count++;
      }
    }
  }

  return count;
}

/**
 * Validate that translated language has same number of keys as English
 */
function validateTranslationKeys(englishContent, translatedContent, language) {
  const englishKeyCount = countKeys(englishContent);
  const translatedKeyCount = countKeys(translatedContent);

  console.log(
    chalk.blue(`🔍 Key count validation for ${language.toUpperCase()}:`)
  );
  console.log(`   English keys: ${englishKeyCount}`);
  console.log(`   ${language} keys: ${translatedKeyCount}`);

  if (englishKeyCount === translatedKeyCount) {
    console.log(chalk.green(`✅ Key count matches for ${language}`));
    return true;
  } else {
    const difference = Math.abs(englishKeyCount - translatedKeyCount);
    const status = translatedKeyCount > englishKeyCount ? 'extra' : 'missing';
    console.log(
      chalk.red(
        `❌ Key count mismatch for ${language}: ${difference} ${status} keys`
      )
    );
    return false;
  }
}

/**
 * Show verification samples
 */
async function showVerificationSamples(sourceContent, languages) {
  console.log(chalk.cyan('\n🔍 Translation Verification Samples:'));
  console.log(chalk.gray('─'.repeat(80)));

  // Get 20 random keys for verification
  const allKeys = Object.keys(sourceContent);
  const randomKeys = allKeys.sort(() => 0.5 - Math.random()).slice(0, 20);

  // Load Hindi and Spanish translations for comparison
  try {
    const hiPath = path.join(LOCALES_DIR, 'hi', TRANSLATION_FILE);
    const esPath = path.join(LOCALES_DIR, 'es', TRANSLATION_FILE);

    const hiContent = JSON.parse(await fs.readFile(hiPath, 'utf8'));
    const esContent = JSON.parse(await fs.readFile(esPath, 'utf8'));

    console.log(
      chalk.blue('Key'.padEnd(25)) +
        chalk.green('English'.padEnd(25)) +
        chalk.yellow('Hindi'.padEnd(25)) +
        chalk.cyan('Spanish')
    );
    console.log(chalk.gray('─'.repeat(100)));

    for (const key of randomKeys) {
      const enValue = (sourceContent[key] || '').substring(0, 22);
      const hiValue = (hiContent[key] || '').substring(0, 22);
      const esValue = (esContent[key] || '').substring(0, 22);

      console.log(
        chalk.blue(key.substring(0, 22).padEnd(25)) +
          chalk.green(enValue.padEnd(25)) +
          chalk.yellow(hiValue.padEnd(25)) +
          chalk.cyan(esValue)
      );
    }

    console.log(chalk.gray('─'.repeat(100)));

    // Prompt user to continue
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise((resolve) => {
      rl.question(
        chalk.yellow('Do you want to continue with the build? (y/N): '),
        resolve
      );
    });

    rl.close();

    if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
      console.log(chalk.yellow('⏹️  Build cancelled by user'));
      process.exit(0);
    }
  } catch (error) {
    console.warn(
      chalk.yellow('⚠️  Could not load verification samples:'),
      error.message
    );
  }
}
/**
 * Main function to automate translations with dynamic chunk-based tracking
 */
async function automateTranslations() {
  console.log(
    chalk.blue('🌍 Starting smart iterative chunk-based translation...')
  );

  try {
    // Step 1: Discover chunk files dynamically
    const SOURCE_CHUNKS_DIR = path.join(
      process.cwd(),
      'static',
      'locales',
      'en',
      '01-translate'
    );
    const chunkFiles = await discoverChunkFiles(SOURCE_CHUNKS_DIR);
    console.log(
      chalk.gray(
        `📁 Discovered ${chunkFiles.length} chunk files in ${SOURCE_CHUNKS_DIR}`
      )
    );

    // Step 2: Calculate individual chunk checksums
    const currentChunkChecksums = {};
    for (const chunkFile of chunkFiles) {
      const chunkPath = path.join(SOURCE_CHUNKS_DIR, chunkFile);
      const chunkContent = await fs.readFile(chunkPath, 'utf8');
      currentChunkChecksums[chunkFile] = crypto
        .createHash('md5')
        .update(chunkContent)
        .digest('hex');
    }
    console.log(
      chalk.blue(`🧩 Calculated checksums for ${chunkFiles.length} chunks`)
    );

    // Display current configuration
    console.log(chalk.cyan('⚙️  Current Configuration:'));
    console.log(
      chalk.gray(
        `   • Rate Limit: ${RATE_LIMIT.maxCallsPerMinute} calls/minute`
      )
    );
    console.log(
      chalk.gray(
        `   • Max Input Tokens: ${TOKEN_LIMITS.maxInputTokens.toLocaleString()}`
      )
    );
    console.log(
      chalk.gray(
        `   • Max Chunk Tokens: ${TOKEN_LIMITS.maxChunkTokens.toLocaleString()}`
      )
    );
    console.log(
      chalk.gray(`   • Chars per Token: ${TOKEN_LIMITS.avgCharsPerToken}`)
    );
    console.log(
      chalk.gray(
        `   • Request Timeout: ${parseInt(process.env.AI_REQUEST_TIMEOUT) || 60000}ms`
      )
    );

    // Step 3: Load build metadata
    const buildMeta = await loadBuildMeta();
    if (!buildMeta.enChunks) buildMeta.enChunks = {};
    if (!buildMeta.languageChunks) buildMeta.languageChunks = {};

    // Step 4: Initialize languageChunks structure for all languages and chunks
    console.log(chalk.blue('🏗️ Initializing languageChunks structure...'));
    for (const languageCode of Object.keys(SUPPORTED_LANGUAGES)) {
      if (!buildMeta.languageChunks[languageCode]) {
        buildMeta.languageChunks[languageCode] = {};
        console.log(chalk.gray(`  ➕ Created language entry: ${languageCode}`));
      }

      // Ensure all discovered chunks exist for this language
      for (const chunkFile of chunkFiles) {
        if (!buildMeta.languageChunks[languageCode][chunkFile]) {
          buildMeta.languageChunks[languageCode][chunkFile] = {
            translated: false,
            checksum: null,
            lastUpdated: null,
          };
          console.log(
            chalk.gray(`    ➕ Added chunk ${languageCode}/${chunkFile}`)
          );
        }
      }
    }

    // Step 5: Detect changed chunks and update English checksums
    const changedChunks = [];
    for (const chunkFile of chunkFiles) {
      const currentChecksum = currentChunkChecksums[chunkFile];
      const storedChecksum = buildMeta.enChunks[chunkFile]?.checksum;

      if (currentChecksum !== storedChecksum) {
        changedChunks.push(chunkFile);
        console.log(chalk.yellow(`🔄 Changed chunk detected: ${chunkFile}`));

        // Update English chunk checksum
        buildMeta.enChunks[chunkFile] = {
          checksum: currentChecksum,
          lastUpdated: new Date().toISOString(),
        };
      }
    }

    if (changedChunks.length === 0) {
      console.log(
        chalk.green(
          '✅ No chunks changed. Checking translation completeness...'
        )
      );
    } else {
      console.log(
        chalk.yellow(
          `🔄 ${changedChunks.length} chunks changed. Will invalidate affected translations...`
        )
      );

      // Step 6: ONLY invalidate translations for chunks that actually changed
      for (const chunkFile of changedChunks) {
        for (const languageCode of Object.keys(SUPPORTED_LANGUAGES)) {
          // Mark this specific changed chunk as needing translation
          buildMeta.languageChunks[languageCode][chunkFile].translated = false;
          buildMeta.languageChunks[languageCode][chunkFile].checksum = null;
          buildMeta.languageChunks[languageCode][chunkFile].lastUpdated = null;
          console.log(
            chalk.gray(
              `  ↳ Invalidated ${languageCode}/${chunkFile} (chunk changed)`
            )
          );
        }
      }
    }

    // Save buildmeta.json with updated chunk information before AI validation
    if (changedChunks.length > 0) {
      console.log(chalk.blue('💾 Saving updated chunk information...'));
      await saveBuildMeta(buildMeta);
    }

    // Step 6: Validate AI Provider
    await checkAIProvider();

    // Step 7: Process each language with smart chunk-by-chunk translation
    const languagesToProcess = Object.keys(SUPPORTED_LANGUAGES);
    const results = { success: [], failed: [], skipped: [] };
    let completed = 0;
    const total = languagesToProcess.length;

    console.log(
      chalk.cyan(
        `\n🚀 Processing ${total} languages with smart chunk detection...`
      )
    );
    console.log(chalk.gray('─'.repeat(50)));

    for (const languageCode of languagesToProcess) {
      const languageName = SUPPORTED_LANGUAGES[languageCode];
      const progress = `[${completed + 1}/${total}]`;

      console.log(
        chalk.blue(`${progress} 🔄 ${languageName} (${languageCode})...`)
      );

      try {
        // Initialize language chunk tracking
        if (!buildMeta.languageChunks[languageCode]) {
          buildMeta.languageChunks[languageCode] = {};
        }

        // Determine which chunks need translation for this language
        const chunksToTranslate = [];
        for (const chunkFile of chunkFiles) {
          const chunkStatus = buildMeta.languageChunks[languageCode][chunkFile];
          if (!chunkStatus || !chunkStatus.translated) {
            chunksToTranslate.push(chunkFile);
          }
        }

        if (chunksToTranslate.length === 0) {
          console.log(
            chalk.gray(
              `${progress} ⏭️  ${languageName} - all chunks up to date, skipping`
            )
          );
          results.skipped.push(languageCode);
        } else {
          console.log(
            chalk.blue(
              `${progress} 📦 Translating ${chunksToTranslate.length}/${chunkFiles.length} chunks for ${languageCode}...`
            )
          );

          // Create autotranslate directory for this language
          const autoTranslateDir = path.join(
            process.cwd(),
            'static',
            'locales',
            languageCode,
            'autotranslate'
          );
          await fs.mkdir(autoTranslateDir, { recursive: true });

          let allChunksSuccess = true;

          // Translate each needed chunk individually
          for (let i = 0; i < chunksToTranslate.length; i++) {
            const chunkFile = chunksToTranslate[i];
            const chunkProgress = `    [${i + 1}/${chunksToTranslate.length}]`;

            try {
              console.log(chalk.gray(`${chunkProgress} 🔄 ${chunkFile}...`));

              // Load individual chunk file
              const chunkPath = path.join(SOURCE_CHUNKS_DIR, chunkFile);
              const chunkContent = JSON.parse(
                await fs.readFile(chunkPath, 'utf8')
              );

              // Check if chunk is too large for translation
              if (isChunkTooLarge(chunkContent)) {
                console.log(
                  chalk.yellow(
                    `📦 Chunk ${chunkFile} is too large, splitting...`
                  )
                );

                // Split large chunk into smaller sub-chunks
                const subChunks = splitLargeChunk(chunkContent, chunkFile);

                // Translate each sub-chunk individually
                let combinedTranslation = {};

                for (let j = 0; j < subChunks.length; j++) {
                  const subChunk = subChunks[j];
                  const subChunkProgress = `${chunkProgress}.${j + 1}`;

                  console.log(
                    chalk.gray(
                      `${subChunkProgress} 🔄 ${subChunk.name} (${subChunk.tokens} tokens)...`
                    )
                  );

                  // Translate this specific sub-chunk
                  const translatedSubChunk = await translateContent(
                    subChunk.content,
                    languageCode,
                    languageName
                  );

                  // Merge sub-chunk translation into combined result
                  combinedTranslation = {
                    ...combinedTranslation,
                    ...translatedSubChunk,
                  };

                  console.log(
                    chalk.green(
                      `${subChunkProgress} ✅ ${subChunk.name} completed`
                    )
                  );
                }

                // Save combined translated chunk
                const translatedChunkPath = path.join(
                  autoTranslateDir,
                  chunkFile
                );
                await fs.writeFile(
                  translatedChunkPath,
                  JSON.stringify(combinedTranslation, null, 2),
                  'utf8'
                );

                console.log(
                  chalk.blue(
                    `📦 Combined ${subChunks.length} sub-chunks into ${chunkFile}`
                  )
                );
              } else {
                // Translate this specific chunk normally
                const translatedChunk = await translateContent(
                  chunkContent,
                  languageCode,
                  languageName
                );

                // Save translated chunk to autotranslate directory
                const translatedChunkPath = path.join(
                  autoTranslateDir,
                  chunkFile
                );
                await fs.writeFile(
                  translatedChunkPath,
                  JSON.stringify(translatedChunk, null, 2),
                  'utf8'
                );
              }

              // Mark chunk as translated in buildmeta
              buildMeta.languageChunks[languageCode][chunkFile] = {
                translated: true,
                checksum: currentChunkChecksums[chunkFile],
                lastUpdated: new Date().toISOString(),
              };

              // CRITICAL: Save buildmeta.json immediately after each chunk
              await saveBuildMeta(buildMeta);

              console.log(
                chalk.green(
                  `${chunkProgress} ✅ ${chunkFile} completed & saved to buildmeta`
                )
              );
            } catch (chunkError) {
              console.error(
                chalk.red(`${chunkProgress} ❌ ${chunkFile} failed:`),
                chunkError.message
              );
              allChunksSuccess = false;
              break;
            }
          }

          if (allChunksSuccess) {
            // Check if ALL chunks for this language are now translated
            const allTranslated = chunkFiles.every(
              (chunkFile) =>
                buildMeta.languageChunks[languageCode][chunkFile]?.translated
            );

            if (allTranslated) {
              // ALL chunks for this language are now translated - generate final translation.json
              console.log(
                chalk.blue(
                  `${progress} 🔗 All chunks complete! Generating translation.json for ${languageCode}...`
                )
              );
              const combinedTranslation = {};

              for (const chunkFile of chunkFiles) {
                const chunkPath = path.join(autoTranslateDir, chunkFile);
                const chunkContent = JSON.parse(
                  await fs.readFile(chunkPath, 'utf8')
                );
                // Use deep merge instead of Object.assign to properly combine nested objects
                const merged = deepMerge(combinedTranslation, chunkContent);
                Object.assign(combinedTranslation, merged);
              }

              // Validate key count before saving
              let keyValidationPassed = true;
              try {
                // Combine English chunks for validation reference
                const englishCombined = {};
                for (const chunkFile of chunkFiles) {
                  const englishChunkPath = path.join(
                    SOURCE_CHUNKS_DIR,
                    chunkFile
                  );
                  const englishChunkContent = JSON.parse(
                    await fs.readFile(englishChunkPath, 'utf8')
                  );
                  const merged = deepMerge(
                    englishCombined,
                    englishChunkContent
                  );
                  Object.assign(englishCombined, merged);
                }

                keyValidationPassed = validateTranslationKeys(
                  englishCombined,
                  combinedTranslation,
                  languageCode
                );
              } catch (englishReadError) {
                console.log(
                  chalk.yellow(
                    `⚠️ Could not validate ${languageCode} keys: English chunks not found`
                  )
                );
              }

              // Save final combined translation to 01-translate directory (required by deploy)
              const finalTranslationPath = path.join(
                process.cwd(),
                '01-translate',
                `${languageCode}.json`
              );
              await fs.mkdir(path.dirname(finalTranslationPath), {
                recursive: true,
              });
              await fs.writeFile(
                finalTranslationPath,
                JSON.stringify(combinedTranslation, null, 2),
                'utf8'
              );

              console.log(
                chalk.green(
                  `${progress} ✅ ${languageName} - COMPLETE! Generated translation.json (${chunkFiles.length} chunks)`
                )
              );
            } else {
              const completedChunks = chunkFiles.filter(
                (chunkFile) =>
                  buildMeta.languageChunks[languageCode][chunkFile]?.translated
              ).length;
              console.log(
                chalk.yellow(
                  `${progress} ⏳ ${languageName} - progress: ${completedChunks}/${chunkFiles.length} chunks (${chunksToTranslate.length} just translated)`
                )
              );
            }

            results.success.push(languageCode);
          } else {
            results.failed.push(languageCode);
            console.log(
              chalk.red(
                `${progress} ❌ ${languageName} - failed during chunk processing`
              )
            );
          }
        }
      } catch (error) {
        console.error(
          chalk.red(`${progress} ❌ ${languageName} - failed:`),
          error.message
        );
        results.failed.push(languageCode);
      }

      completed++;
    }

    console.log(chalk.gray('─'.repeat(50)));

    // Step 8: Combine and deploy all translations
    if (results.success.length > 0) {
      const deployResults = await combineAndDeployTranslations();
      console.log(chalk.cyan('\n📦 Deployment Results:'));
      console.log(
        chalk.green(
          `✅ Successfully deployed: ${deployResults.success.length} languages`
        )
      );
      if (deployResults.failed.length > 0) {
        console.log(
          chalk.red(
            `❌ Failed to deploy: ${deployResults.failed.length} languages`
          )
        );
      }
    }

    // Step 9: Show results summary
    console.log(chalk.cyan('\n📊 Translation Process Summary:'));
    console.log(
      chalk.green(`✅ Successful: ${results.success.length} languages`)
    );
    console.log(
      chalk.gray(
        `⏭️  Skipped (up-to-date): ${results.skipped.length} languages`
      )
    );
    if (results.failed.length > 0) {
      console.log(chalk.red(`❌ Failed: ${results.failed.length} languages`));
      console.log(
        chalk.gray(`   Failed languages: ${results.failed.join(', ')}`)
      );
    }

    // Step 10: Show verification samples if any translations succeeded
    if (results.success.length > 0) {
      // Load first chunk as sample for verification
      const sampleChunkPath = path.join(SOURCE_CHUNKS_DIR, chunkFiles[0]);
      const sampleContent = JSON.parse(
        await fs.readFile(sampleChunkPath, 'utf8')
      );
      await showVerificationSamples(sampleContent, results.success);
    }

    // Step 11: Update build metadata with individual chunk checksums
    console.log(
      chalk.blue('📊 Updating buildmeta.json with chunk checksums...')
    );
    for (const chunkFile of chunkFiles) {
      buildMeta.enChunks[chunkFile] = {
        checksum: currentChunkChecksums[chunkFile],
        lastUpdated: new Date().toISOString(),
      };
      console.log(
        chalk.gray(
          `  ✅ Updated en chunk: ${chunkFile} (${currentChunkChecksums[chunkFile].substring(0, 8)}...)`
        )
      );
    }

    // Save buildmeta.json with updated checksums
    await saveBuildMeta(buildMeta);
    console.log(chalk.green('✅ Updated build metadata with chunk checksums'));

    // Debug: Show current buildmeta structure
    console.log(chalk.gray('🔍 buildmeta.json structure:'));
    console.log(
      chalk.gray(`  enChunks: ${Object.keys(buildMeta.enChunks).length} chunks`)
    );
    console.log(
      chalk.gray(
        `  languageChunks: ${Object.keys(buildMeta.languageChunks).length} languages`
      )
    );

    // Step 12: Cleanup temp directory
    // Files will be overwritten as needed - no cleanup required

    console.log(
      chalk.green('🎉 Optimized translation process completed successfully!')
    );
  } catch (error) {
    console.error(chalk.red('❌ Translation process failed:'), error.message);

    // Cleanup on error
    // Files will be overwritten as needed - no cleanup required
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log(
    chalk.blue('🌍 Push Protocol Translation Automation (Optimized)')
  );
  console.log(chalk.gray('─'.repeat(60)));

  // Check if source translation file exists
  const sourceTranslationPath = path.join(
    LOCALES_DIR,
    SOURCE_LANG,
    TRANSLATION_FILE
  );

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
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(
      chalk.red('❌ Translation automation failed:'),
      error.message
    );
    process.exit(1);
  });
}

export { automateTranslations };
