import chalk from 'chalk';
import { execSync, spawn } from 'child_process';
import { watch } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_DIR = path.join(
  __dirname,
  '/static/locales/en/01-translate'
);

console.log(
  chalk.blue('🚀 Starting Docusaurus with translation auto-merge...')
);

// Initial merge
console.log(chalk.yellow('🔄 Running initial translation merge...'));
try {
  const mergeScript = path.join(__dirname, 'hotbuild.merge.translation.mjs');
  execSync(`node "${mergeScript}"`, { stdio: 'inherit' });
} catch (error) {
  console.error(chalk.red('❌ Initial merge failed:'), error.message);
}

// Start Docusaurus
console.log(chalk.green('🌟 Starting Docusaurus development server...'));
const docusaurus = spawn('npm', ['run', 'docusaurus', 'start'], {
  stdio: 'inherit',
  shell: true,
});

// Watch for translation file changes
console.log(chalk.blue(`👀 Watching for changes in: ${TRANSLATIONS_DIR}`));
const watcher = watch(
  TRANSLATIONS_DIR,
  { recursive: false },
  async (eventType, filename) => {
    if (filename && filename.endsWith('.json') && filename !== 'README.md') {
      console.log(chalk.cyan(`\n📝 Translation file changed: ${filename}`));
      console.log(chalk.yellow('🔄 Auto-merging translations...'));

      try {
        const mergeScript = path.join(
          __dirname,
          'hotbuild.merge.translation.mjs'
        );
        execSync(`node "${mergeScript}"`, { stdio: 'inherit' });
        console.log(
          chalk.green('✅ Translations merged! Docusaurus will hot-reload.\n')
        );
      } catch (error) {
        console.error(chalk.red('❌ Merge failed:'), error.message);
      }
    }
  }
);

// Handle process termination
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n🛑 Shutting down...'));
  watcher.close();
  docusaurus.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(chalk.yellow('\n🛑 Shutting down...'));
  watcher.close();
  docusaurus.kill('SIGTERM');
  process.exit(0);
});

docusaurus.on('close', (code) => {
  console.log(chalk.yellow(`\n📦 Docusaurus exited with code ${code}`));
  watcher.close();
  process.exit(code);
});
