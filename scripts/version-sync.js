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
const chalk = require('chalk');

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
const libPackageJsonPath = `${rootPath}/projects/ids-enterprise-ng/package.json`;
const libPackageJson = require(libPackageJsonPath);
const libVersionJsonPath = `${rootPath}/projects/ids-enterprise-ng/src/version.json`;
const libVersionJson = require(libVersionJsonPath);
const typingPackageJsonPath = `${rootPath}/projects/ids-enterprise-typings/package.json`;
const typingPackageJson = require(typingPackageJsonPath);

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

// Synchronize the typings dependencies in the ids-enterprise-ng package
libPackageJson.dependencies['ids-enterprise-typings'] = libPackageJson.version;

const libPackageJsonStr = JSON.stringify(libPackageJson, null, 2) + '\n';
console.log(libPackageJsonStr)

// Write the file with the new version
fs.writeFile(libPackageJsonPath, libPackageJsonStr, 'utf8', () => {
  executeUpdate('git status -sb && echo \n');
});

// Synchronize the typing in the project folder with the version in the package.
typingPackageJson.version = libPackageJson.version;

const publTypingJsonStr = JSON.stringify(typingPackageJson, null, 2) + '\n';
console.log(publTypingJsonStr)
// Write the file with the new version
fs.writeFile(typingPackageJsonPath, publTypingJsonStr, 'utf8', () => {
  executeUpdate('git status -sb && echo \n');
});
