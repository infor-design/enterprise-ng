#!/usr/bin/env node

/**
 * @fileoverview A script to do different tagged releases ("beta", "rc", "final") that defaults to "dev"
 * @example `node ./scripts/release.js`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
const argv = require('yargs').argv;
const slash = require('slash');
const chalk = require('chalk');

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
const libPath = `${rootPath}/projects/ids-enterprise-ng`;
const libPackageJsonPath = `${libPath}/package.json`;
const libPackageJson = require(libPackageJsonPath);
const tagSuffixFormat = 'dev.YYYYMMDD';

// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Checks to see if the current semver version of the package
 * is a properly dated semver to prevent release "-dev" accidentally.
 * @param {string} version - The semver of the package
 */
function versionHasSuffix(version) {
  const versionTagSuffix = libPackageJson.version.split('-')[1];
  return (versionTagSuffix.length === tagSuffixFormat.length);
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
 * Log a colorful message
 * @param {string} action - An action word
 * @param {string} msg - the message
 */
function logAction(action, msg) {
  console.log(chalk.cyan(action), msg, '\n');
}

/**
 * Log a colorful error message
 * @param {string} msg - the message
 */
function logError(msg) {
  console.log(chalk.red('Error!'), msg, '\n');
}

/**
 * Execute a command to do a "alpha" version
 */
function releaseAlpha() {
  logAction('Releasing', 'a "alpha" tag...');
  const cmd = `cd ${libPath} && release-it minor --preRelease=alpha`;
  executeUpdate(cmd)
}

/**
 * Execute a command to do a "beta" version
 */
function releaseBeta() {
  logAction('Releasing', 'a "beta" tag...');
  const cmd = `cd ${libPath} && release-it minor --preRelease=beta`;
  executeUpdate(cmd)
}

/**
 * Execute a command to do a "release candidate" version
 */
function releaseRc() {
  logAction('Releasing', 'an "rc" tag...');
  if (libPackageJson.version.includes('-beta')) {
    const cmd = `cd ${libPath} && release-it --preRelease=rc`;
    executeUpdate(cmd)
  } else {
    logError('Cannot release an "rc" tag before a "beta" tag.')
  }
}

/**
 * Execute a command to do a "final release" version
 */
function releaseFinal() {
  logAction('Releasing', 'a "final" tag...');
  if (libPackageJson.version.includes('-rc')) {
    const cmd = `cd ${libPath} && release-it`;
    executeUpdate(cmd)
  } else {
    logError('Cannot release a "final" tag before an "rc" tag.')
  }
}

/**
 * Execute a command to do a "dev" version or
 * if dryRun is specified, run the pack cmd.
 */
function releaseDev() {
  logAction('Releasing', 'a "dev" tag...');
  if (versionHasSuffix(libPackageJson.version)) {
    let cmd = ['npm run build:lib'];

    if (argv.hasOwnProperty('dryRun')) {
      cmd .push('npm run pack:lib');
      logError(`DRY RUN!! using "${cmd.join(' && ')}"`);
    } else {
      cmd.push('npm publish dist/ids-enterprise-ng --tag=dev');
    }
    executeUpdate(cmd.join(' && '));
  } else {
    logError(`Cannot release a "dev" semver without a dated tag suffix (i.e. X.Y.Z-${tagSuffixFormat}).\nDid you execute "${chalk.cyan("npm run version-bump:dev")}"?`)
  }
}

// -------------------------------------
//   Main
// -------------------------------------
switch (argv.tag) {
  case 'alpha':
    releaseAlpha();
    break;
  case 'beta':
    releaseBeta();
    break;
  case 'rc':
    releaseRc();
    break;
  case 'final':
    releaseFinal();
    break;
  default:
    releaseDev();
    break;
}
