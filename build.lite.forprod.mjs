import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, 'blog');
const TEMP_MOVE_DIR = path.join(BLOG_DIR, '.tempmove');

// Get all blog directories sorted by date (newest first)
const getBlogDirectories = async () => {
  try {
    const items = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    const blogDirs = items
      .filter(
        (item) =>
          item.isDirectory() &&
          !item.name.startsWith('.') &&
          item.name !== 'authors.yml'
      )
      .map((item) => item.name)
      .filter((name) => /^\d{4}-\d{2}-\d{2}-/.test(name)) // Only date-prefixed directories
      .sort((a, b) => b.localeCompare(a)); // Sort newest first

    return blogDirs;
  } catch (error) {
    console.error(chalk.red('Error reading blog directory:'), error.message);
    return [];
  }
};

// Move all but last N blog posts to temp directory
export const moveBlogsToTemp = async (keepCount = 10) => {
  console.log(
    chalk.blue(
      `🗂️  Moving all but last ${keepCount} blog posts to temp directory...`
    )
  );

  try {
    const blogDirs = await getBlogDirectories();

    if (blogDirs.length <= keepCount) {
      console.log(
        chalk.yellow(
          `📝 Only ${blogDirs.length} blog posts found, keeping all.`
        )
      );
      return;
    }

    // Ensure temp directory exists
    await fs.mkdir(TEMP_MOVE_DIR, { recursive: true });

    // Move older blog posts (all except the first keepCount)
    const blogsToMove = blogDirs.slice(keepCount);

    console.log(
      chalk.cyan(
        `📦 Moving ${blogsToMove.length} blog posts to temp directory...`
      )
    );

    for (const blogDir of blogsToMove) {
      const sourcePath = path.join(BLOG_DIR, blogDir);
      const destPath = path.join(TEMP_MOVE_DIR, blogDir);

      try {
        await fs.rename(sourcePath, destPath);
        console.log(chalk.gray(`   Moved: ${blogDir}`));
      } catch (error) {
        console.error(
          chalk.red(`   Failed to move ${blogDir}:`),
          error.message
        );
      }
    }

    console.log(
      chalk.green(
        `✅ Successfully moved ${blogsToMove.length} blog posts to temp directory`
      )
    );
    console.log(
      chalk.blue(
        `📊 Keeping ${keepCount} most recent blog posts for development`
      )
    );
  } catch (error) {
    console.error(chalk.red('❌ Error moving blogs to temp:'), error.message);
  }
};

// Restore all blog posts from temp directory back to blog directory
export const prepAndMoveBlogsFromTempLocationToActual = async () => {
  console.log(chalk.blue('🔄 Restoring blog posts from temp directory...'));

  try {
    // Check if temp directory exists
    try {
      await fs.access(TEMP_MOVE_DIR);
    } catch {
      console.log(
        chalk.yellow('📁 No temp directory found, nothing to restore.')
      );
      return;
    }

    const tempItems = await fs.readdir(TEMP_MOVE_DIR, { withFileTypes: true });
    const tempDirs = tempItems
      .filter((item) => item.isDirectory())
      .map((item) => item.name);

    if (tempDirs.length === 0) {
      console.log(
        chalk.yellow('📂 Temp directory is empty, nothing to restore.')
      );
      return;
    }

    console.log(
      chalk.cyan(
        `📦 Restoring ${tempDirs.length} blog posts from temp directory...`
      )
    );

    for (const blogDir of tempDirs) {
      const sourcePath = path.join(TEMP_MOVE_DIR, blogDir);
      const destPath = path.join(BLOG_DIR, blogDir);

      try {
        await fs.rename(sourcePath, destPath);
        console.log(chalk.gray(`   Restored: ${blogDir}`));
      } catch (error) {
        console.error(
          chalk.red(`   Failed to restore ${blogDir}:`),
          error.message
        );
      }
    }

    // Clean up empty temp directory
    try {
      const remainingItems = await fs.readdir(TEMP_MOVE_DIR);
      if (remainingItems.length === 0) {
        await fs.rmdir(TEMP_MOVE_DIR);
        console.log(chalk.gray('🗑️  Cleaned up empty temp directory'));
      }
    } catch (error) {
      console.log(
        chalk.yellow('⚠️  Could not clean up temp directory:'),
        error.message
      );
    }

    console.log(
      chalk.green(`✅ Successfully restored ${tempDirs.length} blog posts`)
    );
  } catch (error) {
    console.error(
      chalk.red('❌ Error restoring blogs from temp:'),
      error.message
    );
  }
};

// Main function that handles blog management based on mode
export const prepAndMoveFilesFromTempLocationToActual = async (
  mode = 'full'
) => {
  console.log(chalk.blue(`🚀 Preparing files for ${mode} mode...`));

  if (mode === 'lite') {
    // Move all but last 15 blog posts to temp
    await moveBlogsToTemp(15);
  } else if (mode === 'full') {
    // Restore all blog posts from temp
    await prepAndMoveBlogsFromTempLocationToActual();
  } else {
    console.log(chalk.yellow(`⚠️  Unknown mode: ${mode}, defaulting to full`));
    await prepAndMoveBlogsFromTempLocationToActual();
  }
};

// If called directly from command line
if (import.meta.url === `file://${process.argv[1]}`) {
  const mode = process.argv[2] || 'full';
  await prepAndMoveFilesFromTempLocationToActual(mode);
}
