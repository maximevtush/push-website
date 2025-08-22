#!/usr/bin/env node

import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ANSI color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Supported languages from the automation script
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

function showHelp() {
  log('🌍 Push Protocol Translation - Specific Language Tool', 'cyan');
  log('', 'reset');
  log('Usage:', 'bold');
  log('  yarn translations:generate:specific <language-code>', 'cyan');
  log('  node build.translation.specific.mjs <language-code>', 'cyan');
  log('', 'reset');
  log('Supported Languages:', 'bold');
  Object.entries(SUPPORTED_LANGUAGES).forEach(([code, name]) => {
    log(`  ${code.padEnd(6)} - ${name}`, 'green');
  });
  log('', 'reset');
  log('Examples:', 'bold');
  log(
    '  yarn translations:generate:specific es    # Translate to Spanish only',
    'cyan'
  );
  log(
    '  yarn translations:generate:specific hi    # Translate to Hindi only',
    'cyan'
  );
  log(
    '  yarn translations:generate:specific zh-CN # Translate to Chinese only',
    'cyan'
  );
  log('', 'reset');
  log('💡 Tips:', 'bold');
  log('  • This will only translate the specified language', 'yellow');
  log(
    '  • Use "yarn translations:generate" to translate all languages',
    'yellow'
  );
  log(
    '  • Use "yarn translations:nuke" to clean up before translating',
    'yellow'
  );
}

async function modifyAutomationScript(targetLanguage) {
  const automationScriptPath = path.join(
    __dirname,
    'build.translation.automation.mjs'
  );
  const backupPath = path.join(
    __dirname,
    'build.translation.automation.backup.mjs'
  );

  try {
    // Read the original script
    const originalContent = await fs.readFile(automationScriptPath, 'utf8');

    // Create backup
    await fs.writeFile(backupPath, originalContent, 'utf8');
    log('📋 Created backup of automation script', 'gray');

    // Modify the SUPPORTED_LANGUAGES constant to only include target language
    const modifiedContent = originalContent.replace(
      /const SUPPORTED_LANGUAGES = \{[^}]+\};/s,
      `const SUPPORTED_LANGUAGES = {\n  '${targetLanguage}': '${SUPPORTED_LANGUAGES[targetLanguage]}',\n};`
    );

    // Write modified script
    await fs.writeFile(automationScriptPath, modifiedContent, 'utf8');
    log(
      `🎯 Modified automation script to target: ${targetLanguage} (${SUPPORTED_LANGUAGES[targetLanguage]})`,
      'green'
    );

    return true;
  } catch (error) {
    log(`❌ Failed to modify automation script: ${error.message}`, 'red');
    return false;
  }
}

async function restoreAutomationScript() {
  const automationScriptPath = path.join(
    __dirname,
    'build.translation.automation.mjs'
  );
  const backupPath = path.join(
    __dirname,
    'build.translation.automation.backup.mjs'
  );

  try {
    // Check if backup exists
    const backupExists = await fs
      .access(backupPath)
      .then(() => true)
      .catch(() => false);

    if (backupExists) {
      // Restore from backup
      const backupContent = await fs.readFile(backupPath, 'utf8');
      await fs.writeFile(automationScriptPath, backupContent, 'utf8');

      // Remove backup file
      await fs.unlink(backupPath);
      log('🔄 Restored automation script from backup', 'green');
    }
  } catch (error) {
    log(`⚠️  Failed to restore automation script: ${error.message}`, 'yellow');
  }
}

function runAutomationScript() {
  return new Promise((resolve, reject) => {
    log('🚀 Starting translation automation...', 'cyan');

    const child = spawn('node', ['build.translation.automation.mjs'], {
      cwd: __dirname,
      stdio: 'inherit',
    });

    child.on('close', (code) => {
      if (code === 0) {
        log('✅ Translation automation completed successfully', 'green');
        resolve();
      } else {
        log(`❌ Translation automation failed with exit code ${code}`, 'red');
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    child.on('error', (error) => {
      log(`❌ Failed to start automation script: ${error.message}`, 'red');
      reject(error);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);

  // Show help if no arguments or help flag
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  const targetLanguage = args[0];

  // Validate language code
  if (!SUPPORTED_LANGUAGES[targetLanguage]) {
    log(`❌ Unsupported language code: ${targetLanguage}`, 'red');
    log('', 'reset');
    log('Supported languages:', 'bold');
    Object.entries(SUPPORTED_LANGUAGES).forEach(([code, name]) => {
      log(`  ${code.padEnd(6)} - ${name}`, 'green');
    });
    process.exit(1);
  }

  log('🎯 Push Protocol Translation - Specific Language Mode', 'cyan');
  log('─'.repeat(60), 'gray');
  log(
    `Target Language: ${targetLanguage} (${SUPPORTED_LANGUAGES[targetLanguage]})`,
    'bold'
  );
  log('', 'reset');

  try {
    // Step 1: Modify automation script to target specific language
    const modifySuccess = await modifyAutomationScript(targetLanguage);
    if (!modifySuccess) {
      process.exit(1);
    }

    // Step 2: Run the automation script
    await runAutomationScript();

    // Step 3: Restore original automation script
    await restoreAutomationScript();

    log('', 'reset');
    log('🎉 Specific language translation completed successfully!', 'green');
    log(
      `   Translation for ${SUPPORTED_LANGUAGES[targetLanguage]} (${targetLanguage}) is ready.`,
      'green'
    );
    log('', 'reset');
    log('💡 Next steps:', 'bold');
    log(
      '   • Check the translated files in static/locales/' +
        targetLanguage +
        '/',
      'cyan'
    );
    log('   • Run "yarn start" to test the translations locally', 'cyan');
    log(
      '   • Use "yarn translations:generate" to translate all languages',
      'cyan'
    );
  } catch (error) {
    log(`❌ Translation process failed: ${error.message}`, 'red');

    // Always try to restore the original script on error
    await restoreAutomationScript();

    process.exit(1);
  }
}

// Handle process termination to ensure cleanup
process.on('SIGINT', async () => {
  log('\n⚠️  Process interrupted, cleaning up...', 'yellow');
  await restoreAutomationScript();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  log('\n⚠️  Process terminated, cleaning up...', 'yellow');
  await restoreAutomationScript();
  process.exit(0);
});

main().catch(async (error) => {
  log(`❌ Unexpected error: ${error.message}`, 'red');
  await restoreAutomationScript();
  process.exit(1);
});
