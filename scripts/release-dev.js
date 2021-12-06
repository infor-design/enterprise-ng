#!/usr/bin/env node

/**
 * @fileoverview Do a dev version publish
 * @example `node ./scripts/release-dev.js`
 * @example `node ./scripts/release-dev.js --dry-run`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
import argv from 'yargs';
import { exec } from 'child_process';
import slash from 'slash';
import fs from 'fs';

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
const libPath = `${rootPath}/projects/ids-enterprise-ng`;
const libPackageJsonPath = `${libPath}/package.json`;

const libPackageStr = fs.readFileSync(libPackageJsonPath);
const libPackageJson = JSON.parse(libPackageStr);

const tagSuffixFormat = 'dev.YYYYMMDD';

// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Log a colorful message
 * @param {string} action - An action word
 * @param {string} msg - the message
 */
const logAction = (action, msg) => {
  console.log(action, msg, '\n');
}

/**
 * Log a colorful error message
 * @param {string} msg - the message
 */
const logError = msg => {
  console.log('Error!', msg, '\n');
}

/**
 * Checks to see if the current semver version of the package
 * is a properly dated semver to prevent release "-dev" accidentally.
 * @param {string} version - The semver of the package
 */
const versionHasSuffix = version => {
  const versionTagSuffix = version.split('-')[1];
  return (versionTagSuffix.length === tagSuffixFormat.length);
}

/**
 * Executes the command on the cli
 * @param {string} cmd - The command
 * @param {function} callback - A callback
 */
const executeUpdate = (cmd) => {
  const updateProcess = exec(cmd, (err, stdout, stderr) => {
    if (err) {
      logError(`exec error: ${err}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
}

// -------------------------------------
//   Main
// -------------------------------------

logAction('Releasing', 'a "dev" tag...');
if (versionHasSuffix(libPackageJson.version)) {
  let cmds = ['npm run build:lib'];

  if (argv.hasOwnProperty('dryRun')) {
    cmds .push('npm run pack:lib');
    logError(`DRY RUN!! using "${cmds.join(' && ')}"`);
  } else {
    cmds.push('npm publish ./dist/ids-enterprise-ng --tag=dev');
  }
  executeUpdate(cmds.join(' && '));
} else {
  logError(`Cannot release a "dev" semver without a dated tag suffix (i.e. X.Y.Z-${tagSuffixFormat}).\nDid you execute "npm run version-bump:dev"?`)
}
