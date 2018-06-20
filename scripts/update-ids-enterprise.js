#!/usr/bin/env node

/**
 * @fileoverview Update the ids-enterprise version in both package.json instances
 * @example `node ./scripts/update-ids-enterprise.js`
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
const rootPkgJsonPath = `${rootPath}/package.json`;
const publPkgJsonPath = `${rootPath}/publish/package.json`;
const tagArr = ['dev', 'beta', 'rc', 'latest'];

// -------------------------------------
//   Functions
// -------------------------------------

/**
 * Prompt the user to choose a version tag
 * @param {array} options - The options for the prompt list
 */
function chooseVersionTag(options) {
  const questionsArr = [{
    type: 'list',
    name: 'tag',
    message: 'Choose the tag to update to:',
    choices: options
  }];

  inquirer.prompt(questionsArr).then(answers => {
    const cmd = `npm i ids-enterprise@${answers.tag} -P`;
    console.log(`Running "${cmd}"...`);
    executeUpdate(cmd);
  });
}

/**
 * Executes the command on the cli
 * @param {string} cmd - The command
 */
function executeUpdate(cmd) {
  const exec = require('child_process').exec
  const updateProcess = exec(cmd, () => {
    syncPackageJsonVersions();
  });
  updateProcess.stdout.pipe(process.stdout);
}

/**
 * Copy the ids-enterprise package version from the root package.json
 * to the publish/package.json and the write it to the file
 */
function syncPackageJsonVersions() {
  const rootPkgJson = require(rootPkgJsonPath);
  const publPkgJson = require(publPkgJsonPath);

  publPkgJson.dependencies['ids-enterprise'] = rootPkgJson.dependencies['ids-enterprise'];

  // Make sure to write the trailing line to the file
  const publPkgJsonStr = JSON.stringify(publPkgJson, null, 2) + `\n`;

  fs.writeFile(publPkgJsonPath, publPkgJsonStr, 'utf8', () => {
    console.log('updated 1 package in publish/package.json');
  });
}

// -------------------------------------
//   Main
// -------------------------------------
console.log("Update ids-enterprise version...");
chooseVersionTag(tagArr);
