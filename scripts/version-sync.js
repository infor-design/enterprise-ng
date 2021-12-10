#!/usr/bin/env node

/**
 * @fileoverview Synchronizes the version.json file in the library with the version in the corresponding package.json.
 * @example `node ./scripts/version-sync.js`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
import fs from 'fs';
import { exec } from 'child_process';

// -------------------------------------
//   Constants
// -------------------------------------
const libPackageJsonPath = './projects/ids-enterprise-ng/package.json';
const libPackageStr = fs.readFileSync(libPackageJsonPath);
const libPackageJson = JSON.parse(libPackageStr);

const libVersionJsonPath = './projects/ids-enterprise-ng/src/version.json';
const libVersionStr = fs.readFileSync(libVersionJsonPath);
const libVersionJson = JSON.parse(libVersionStr);

const typingPackageJsonPath = './projects/ids-enterprise-typings/package.json';
const typingPackagenStr = fs.readFileSync(typingPackageJsonPath);
const typingPackageJson = JSON.parse(typingPackagenStr);

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
 * Executes the command on the cli
 * @param {string} cmd - The command
 */
function executeUpdate(cmd) {
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
