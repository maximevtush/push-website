#!/usr/bin/env node

import fs from 'fs';
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

function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      return true;
    }
    return false;
  } catch (error) {
    log(`Error removing directory ${dirPath}: ${error.message}`, 'red');
    return false;
  }
}

function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    log(`Error removing file ${filePath}: ${error.message}`, 'red');
    return false;
  }
}

function main() {
  log('🧹 Starting translation nuke process...', 'cyan');
  log('', 'reset');

  const localesDir = path.join(__dirname, 'static', 'locales');
  const translationMetaFile = path.join(__dirname, 'translatemeta.json');

  let removedDirectories = 0;
  let totalDirectories = 0;

  // Remove all autotranslate directories
  if (fs.existsSync(localesDir)) {
    const languageDirs = fs
      .readdirSync(localesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    for (const langDir of languageDirs) {
      const autotranslateDir = path.join(localesDir, langDir, 'autotranslate');
      totalDirectories++;

      if (removeDirectory(autotranslateDir)) {
        log(`✅ Removed: ${langDir}/autotranslate`, 'green');
        removedDirectories++;
      } else {
        log(`⚠️  Not found: ${langDir}/autotranslate`, 'yellow');
      }
    }
  } else {
    log('⚠️  Locales directory not found', 'yellow');
  }

  // Remove translatemeta.json
  const metaFileRemoved = removeFile(translationMetaFile);
  if (metaFileRemoved) {
    log('✅ Removed: translatemeta.json', 'green');
  } else {
    log('⚠️  Not found: translatemeta.json', 'yellow');
  }

  log('', 'reset');
  log('📊 Summary:', 'bold');
  log(
    `   • Autotranslate directories removed: ${removedDirectories}/${totalDirectories}`,
    'cyan'
  );
  log(
    `   • Translation metadata cleaned: ${metaFileRemoved ? 'Yes' : 'No'}`,
    'cyan'
  );
  log('', 'reset');
  
  if (removedDirectories > 0 || metaFileRemoved) {
    log('🎉 Translation nuke completed successfully!', 'green');
    log('   All auto-translated content has been removed.', 'green');
    log('   English (en) source translations are preserved.', 'green');
  } else {
    log('ℹ️  No auto-translated content found to remove.', 'blue');
  }

  log('', 'reset');
  log('💡 Next steps:', 'bold');
  log(
    '   • Run "yarn translations:generate" to start fresh translations',
    'cyan'
  );
  log(
    '   • Or run "yarn translations:generate:force" to nuke and regenerate',
    'cyan'
  );
}

main();
