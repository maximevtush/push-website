import chalk from 'chalk';

import { prepForDocsChangelog } from './build.docs.changelog.mjs';
import { prepAndMoveFilesFromTempLocationToActual } from './build.lite.forprod.mjs';
import { prepForPreviewDeployment } from './build.preview.mjs';

// Prep for deployment starts everything
const prepForDeployment = async (appEnv) => {
  console.log(chalk.green('Starting Custom Deployment Prebuild...'));

  // Check and move blogs back from temp location
  await prepAndMoveFilesFromTempLocationToActual('full');

  // Do changelog in docs
  await prepForDocsChangelog();

  // Do preview deployment
  await prepForPreviewDeployment(appEnv);
};

var args = process.argv.slice(2);
await prepForDeployment(args[0]);
