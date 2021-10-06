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
const rootPackageJsonPath = `${rootPath}/package.json`;
const libPackageJsonPath = `${rootPath}/projects/ids-enterprise-ng/package.json`;
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
    const cmd = `npm i ids-enterprise@${answers.tag} -P --save-exact`;
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
    copySvgIcons();
  });
  updateProcess.stdout.pipe(process.stdout);
}

/**
 * Copy the ids-enterprise package version from the root package.json
 * to the library package.json and the write it to the file
 */
function syncPackageJsonVersions() {
  const rootPackageJson = require(rootPackageJsonPath);
  const libPackageJson = require(libPackageJsonPath);

  libPackageJson.dependencies['ids-enterprise'] = rootPackageJson.dependencies['ids-enterprise'];

  // Make sure to write the trailing line to the file
  const libPackageJsonStr = JSON.stringify(libPackageJson, null, 2) + `\n`;

  fs.writeFile(libPackageJsonPath, libPackageJsonStr, 'utf8', () => {
    console.log('updated 1 package in package.json');
  });
}

/**
 * Copy the svg icon blocks into the soho-icons component.
 */
function copySvgIcons() {
  const sourcePath = `${rootPath}/node_modules/ids-enterprise/dist/svg/`;
  const destPath = `${rootPath}/src/app/icon/`;
  const destPathLib = `${rootPath}/projects/ids-enterprise-ng/src/lib/icon/`;
  const copy = function (fileName) {
    fs.copyFile(sourcePath + fileName, destPath + fileName, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`updated 1 file src/app/icon/${fileName}`);
      }
    });
    fs.copyFile(sourcePath + fileName, destPathLib + fileName, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`updated 1 file /projects/ids-enterprise-ng/src/lib/icon/${fileName}`);
      }
    });
  };

  copy('theme-new-svg.html');
  copy('theme-new-svg-empty.html');
  copy('theme-classic-svg.html');
  copy('theme-classic-svg-empty.html');
}

// -------------------------------------
//   Main
// -------------------------------------
console.log('Update ids-enterprise version...');
chooseVersionTag(tagArr);
