#!/usr/bin/env node

// Simple console logging without complex color formatting
function log(message, color = 'reset') {
  if (color === 'cyan' || color === 'blue') {
    console.log(`\x1b[36m${message}\x1b[0m`);
  } else if (color === 'yellow') {
    console.log(`\x1b[33m${message}\x1b[0m`);
  } else if (color === 'green') {
    console.log(`\x1b[32m${message}\x1b[0m`);
  } else if (color === 'bold') {
    console.log(`\x1b[1m${message}\x1b[0m`);
  } else if (color === 'gray') {
    console.log(`\x1b[90m${message}\x1b[0m`);
  } else {
    console.log(message);
  }
}

// Supported languages
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
  log('🌍 Push Chain Translation System - Help', 'cyan');
  log('═'.repeat(60), 'gray');
  log('', 'reset');

  log('📋 Available Commands:', 'bold');
  log('', 'reset');

  // Nuke command
  log('🧹 translations:nuke', 'yellow');
  log(
    '   Clean up all auto-translated content and reset translation progress',
    'gray'
  );
  log(
    '   • Removes all autotranslate folders from language directories',
    'gray'
  );
  log('   • Cleans up translatemeta.json tracking file', 'gray');
  log('   • Preserves English source files and directory structure', 'gray');
  log('   Usage: yarn translations:nuke', 'cyan');
  log('', 'reset');

  // Generate command
  log('🚀 translations:generate', 'yellow');
  log('   Generate translations for all supported languages using AI', 'gray');
  log('   • Processes all 13 supported languages automatically', 'gray');
  log('   • Uses smart chunk-based translation with rate limiting', 'gray');
  log('   • Tracks progress and resumes from where it left off', 'gray');
  log('   Usage: yarn translations:generate', 'cyan');
  log('', 'reset');

  // Generate force command
  log('💥 translations:generate:force', 'yellow');
  log('   Clean up and regenerate all translations from scratch', 'gray');
  log('   • Combines translations:nuke + translations:generate', 'gray');
  log('   • Ensures completely fresh translation process', 'gray');
  log('   • Use when you want to start over completely', 'gray');
  log('   Usage: yarn translations:generate:force', 'cyan');
  log('', 'reset');

  // Generate specific command
  log('🎯 translations:generate:specific', 'yellow');
  log('   Generate translation for one specific language only', 'gray');
  log('   • Faster than translating all languages', 'gray');
  log('   • Perfect for testing or iterating on specific languages', 'gray');
  log(
    '   • Temporarily modifies automation script for targeted translation',
    'gray'
  );
  log('   Usage: yarn translations:generate:specific <language-code>', 'cyan');
  log('   Example: yarn translations:generate:specific es', 'cyan');
  log('', 'reset');

  log('🗣️  Supported Languages:', 'bold');
  log('', 'reset');
  Object.entries(SUPPORTED_LANGUAGES).forEach(([code, name]) => {
    log(`   ${code.padEnd(6)} - ${name}`, 'green');
  });
  log('', 'reset');

  log('⚙️  Environment Configuration:', 'bold');
  log('', 'reset');
  log('   AI Provider Settings:', 'yellow');
  log('   • AI_PROVIDER=windsurf|local           (default: windsurf)', 'gray');
  log('   • WINDSURF_API_KEY=<key>     (for Windsurf/Anthropic)', 'gray');
  log('   • LOCAL_AI_BASE_URL=<url>              (for local AI)', 'gray');
  log('   • LOCAL_AI_MODEL=<model>               (for local AI)', 'gray');
  log('', 'reset');
  log('   Translation Settings:', 'yellow');
  log('   • AI_MAX_INPUT_TOKENS=100000           (max input tokens)', 'gray');
  log(
    '   • AI_MAX_CHUNK_TOKENS=2000             (max tokens per chunk)',
    'gray'
  );
  log(
    '   • AI_CHARS_PER_TOKEN=3.5               (characters per token)',
    'gray'
  );
  log(
    '   • AI_RATE_LIMIT_PER_MINUTE=5           (API calls per minute)',
    'gray'
  );
  log(
    '   • AI_REQUEST_TIMEOUT=60000             (timeout in milliseconds)',
    'gray'
  );
  log('', 'reset');

  log('🔄 Translation Workflow:', 'bold');
  log('', 'reset');
  log('   1. Clean slate:     yarn translations:nuke', 'cyan');
  log('   2. Generate all:    yarn translations:generate', 'cyan');
  log(
    '   3. Test specific:   yarn translations:generate:specific <lang>',
    'cyan'
  );
  log('   4. Force rebuild:   yarn translations:generate:force', 'cyan');
  log('', 'reset');

  log('💡 Tips & Best Practices:', 'bold');
  log('', 'reset');
  log('   • Always test translations locally with "yarn start"', 'yellow');
  log('   • Use specific language generation for faster iteration', 'yellow');
  log('   • Check translatemeta.json to see translation progress', 'yellow');
  log('   • Set appropriate AI_REQUEST_TIMEOUT for your AI provider', 'yellow');
  log('   • Local AI may need higher timeout values than Windsurf', 'yellow');
  log('', 'reset');

  log('🐛 Troubleshooting:', 'bold');
  log('', 'reset');
  log('   • Rate limit errors: Reduce AI_RATE_LIMIT_PER_MINUTE', 'yellow');
  log('   • Timeout errors: Increase AI_REQUEST_TIMEOUT', 'yellow');
  log('   • Chunk too large: Reduce AI_MAX_CHUNK_TOKENS', 'yellow');
  log('   • Translation stuck: Run translations:nuke and try again', 'yellow');
  log('   • API errors: Check your API keys and provider settings', 'yellow');
  log('', 'reset');

  log('📁 File Structure:', 'bold');
  log('', 'reset');
  log('   static/locales/en/01-translate/     - English source chunks', 'gray');
  log(
    '   static/locales/<lang>/autotranslate/ - Auto-generated translations',
    'gray'
  );
  log(
    '   translatemeta.json                  - Translation progress tracking',
    'gray'
  );
  log('', 'reset');

  log('🔗 Related Commands:', 'bold');
  log('', 'reset');
  log(
    '   yarn start                          - Start development server',
    'cyan'
  );
  log('   yarn build                          - Build production site', 'cyan');
  log(
    '   yarn write-translations             - Generate Docusaurus i18n files',
    'cyan'
  );
  log('', 'reset');

  log('═'.repeat(60), 'gray');
  log('For more information, visit the Push Protocol documentation.', 'blue');
}

showHelp();
