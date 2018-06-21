#!/usr/bin/env node

/**
 * @fileoverview Append the date to the publish/package.json version to have a date
 * @example `node ./scripts/version-add-date.js`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
const fs = require('fs');
const inquirer = require('inquirer');
const slash = require('slash');

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
const publishPackageJsonPath = `${rootPath}/publish/package.json`;
const publishPackageJson = require(publishPackageJsonPath);
const todaysDate = formatDate(new Date());
const versionTag = 'dev';

// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Format the date as YYYYMMDD
 * @param {date} date
 */
function formatDate (date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('');
}

/**
 * Executes the command on the cli
 * @param {string} cmd - The command
 */
function executeUpdate(cmd) {
  const exec = require('child_process').exec
  const updateProcess = exec(cmd);
  updateProcess.stdout.pipe(process.stdout);
}

/**
 * Extract the base semver from a valid semver string
 * @param {string} str - The version from the package.json
 * @return {string} - The base version, i.e. "X.Y.Z-dev"
 */
function getBaseVersion(str) {
  return str.substr(0, str.indexOf(versionTag) + versionTag.length);
}

// -------------------------------------
//   Main
// -------------------------------------
if (publishPackageJson.version.indexOf('-dev') === -1) {
  console.log('Error! Cannot append date to non-dev version. Are you on the master branch?');
  return false;
}

publishPackageJson.version = `${getBaseVersion(publishPackageJson.version)}.${todaysDate}`;
const publPkgJsonStr = JSON.stringify(publishPackageJson, null, 2) + '\n';

// Write the file with the new version
fs.writeFile(publishPackageJsonPath, publPkgJsonStr, 'utf8', () => {
  executeUpdate('git status -sb && echo \n');
});
