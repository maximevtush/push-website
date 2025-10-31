#!/usr/bin/env node

import chalk from 'chalk';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateTranslationPrompt } from './build.translation.prompt.mjs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCALES_DIR = path.join(__dirname, 'static/locales');
const SOURCE_LANG = 'en';
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

/**
 * Discover available chunk files
 */
async function discoverChunkFiles(sourceDir) {
  try {
    const files = await fs.readdir(sourceDir);
    return files.filter(file => file.endsWith('.json')).sort();
  } catch (error) {
    console.error(chalk.red(`❌ Error reading source directory: ${error.message}`));
    return [];
  }
}

/**
 * Main function to show translation prompt
 */
async function showTranslationPrompt() {
  console.log(chalk.blue('🔍 Translation Prompt Viewer'));
  console.log(chalk.gray('─'.repeat(60)));

  // Get command line arguments
  const args = process.argv.slice(2);
  const targetLanguage = args[0];
  const chunkFile = args[1];

  // Validate arguments
  if (!targetLanguage || !SUPPORTED_LANGUAGES[targetLanguage]) {
    console.log(chalk.red('❌ Please specify a valid target language.'));
    console.log(chalk.yellow('Usage: yarn translations:show:prompt <language> [chunk-file]'));
    console.log(chalk.yellow('Available languages:'));
    Object.entries(SUPPORTED_LANGUAGES).forEach(([code, name]) => {
      console.log(chalk.gray(`  ${code} - ${name}`));
    });
    process.exit(1);
  }

  const languageName = SUPPORTED_LANGUAGES[targetLanguage];

  try {
    // Discover available chunks
    const chunkFiles = await discoverChunkFiles(SOURCE_CHUNKS_DIR);
    
    if (chunkFiles.length === 0) {
      console.error(chalk.red('❌ No chunk files found in source directory'));
      process.exit(1);
    }

    // Use specified chunk or first available chunk
    const selectedChunk = chunkFile || chunkFiles[0];
    
    if (!chunkFiles.includes(selectedChunk)) {
      console.log(chalk.red(`❌ Chunk file "${selectedChunk}" not found.`));
      console.log(chalk.yellow('Available chunks:'));
      chunkFiles.forEach(chunk => {
        console.log(chalk.gray(`  ${chunk}`));
      });
      process.exit(1);
    }

    // Load source content
    const chunkPath = path.join(SOURCE_CHUNKS_DIR, selectedChunk);
    const sourceContent = JSON.parse(await fs.readFile(chunkPath, 'utf8'));

    // Generate and display prompt
    console.log(chalk.green(`✅ Generating prompt for ${languageName} (${targetLanguage})`));
    console.log(chalk.blue(`📄 Using chunk: ${selectedChunk}`));
    console.log(chalk.gray(`📊 Source content keys: ${Object.keys(sourceContent).length}`));
    console.log(chalk.gray('─'.repeat(60)));

    const prompt = await generateTranslationPrompt(sourceContent, targetLanguage, languageName);

    // Display the prompt with syntax highlighting
    console.log(chalk.cyan('\n🤖 TRANSLATION PROMPT:'));
    console.log(chalk.gray('═'.repeat(80)));
    console.log(prompt);
    console.log(chalk.gray('═'.repeat(80)));

    // Show prompt statistics
    const promptLength = prompt.length;
    const estimatedTokens = Math.ceil(promptLength / 3.5); // Rough token estimation
    
    console.log(chalk.blue('\n📊 PROMPT STATISTICS:'));
    console.log(chalk.gray(`   Characters: ${promptLength.toLocaleString()}`));
    console.log(chalk.gray(`   Estimated tokens: ${estimatedTokens.toLocaleString()}`));
    console.log(chalk.gray(`   Target language: ${languageName} (${targetLanguage})`));
    console.log(chalk.gray(`   Source chunk: ${selectedChunk}`));

  } catch (error) {
    console.error(chalk.red('❌ Error generating prompt:'), error.message);
    process.exit(1);
  }
}

// Run the script
showTranslationPrompt().catch(error => {
  console.error(chalk.red('❌ Script failed:'), error.message);
  process.exit(1);
});
