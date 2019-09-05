#!/usr/bin/env node

/**
 * @fileoverview Synchronizes the version.json file in the library with the version in the corresponding package.json.
 * @example `node ./scripts/version-sync.js`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
const fs = require('fs');
const slash = require('slash');

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
const libPackageJsonPath = `${rootPath}/projects/ids-enterprise-ng/package.json`;
const libPackageJson = require(libPackageJsonPath);
const libVersionJsonPath = `${rootPath}/projects/ids-enterprise-ng/src/version.json`;
const libVersionJson = require(libVersionJsonPath);

// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Log a colorful message
 * @param {string} action - An action word
 * @param {string} msg - the message
 */
const logAction = (action, msg) => {
  console.log(chalk.cyan(action), msg, '\n');
}

/**
 * Log a colorful error message
 * @param {string} msg - the message
 */
const logError = msg => {
  console.log(chalk.red('Error!'), msg, '\n');
}

/**
 * Executes the command on the cli
 * @param {string} cmd - The command
 */
function executeUpdate(cmd) {
  const exec = require('child_process').exec
  exec(cmd, (err, stdout, stderr) => {
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

// Synchronize the version in the src folder with the version in the package.
libVersionJson.version = libPackageJson.version;

const publVersionJsonStr = JSON.stringify(libVersionJson, null, 2) + '\n';

// Write the file with the new version
fs.writeFile(libVersionJsonPath, publVersionJsonStr, 'utf8', () => {
  executeUpdate('git status -sb && echo \n');
});
