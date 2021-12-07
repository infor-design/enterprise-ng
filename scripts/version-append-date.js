#!/usr/bin/env node

/**
 * @fileoverview Append the date to the library package.json version
 * @example `node ./scripts/version-add-date.js`
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
  const updateProcess = exec(cmd, (err, stdout, stderr) => {
    if (err) {
      logError(`exec error: ${err}`);
      return;
    }
    console.log(stdout);
    console.log(stderr);
  });
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
if (libPackageJson.version.indexOf('-dev') === -1) {
  console.log('Error! Cannot append date to non-dev version. Are you on the master branch?');
} else {
  libPackageJson.version = `${getBaseVersion(libPackageJson.version)}.${todaysDate}`;
  const publPkgJsonStr = JSON.stringify(libPackageJson, null, 2) + '\n';

  // Write the file with the new version
  fs.writeFile(libPackageJsonPath, publPkgJsonStr, 'utf8', () => {
    executeUpdate('git status -sb && echo \n');
  });
}
