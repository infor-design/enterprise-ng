#!/usr/bin/env node

/**
 * @fileoverview Update the ids-enterprise version in both package.json instances
 * @example `node ./scripts/update-ids-enterprise.js`
 */

// -------------------------------------
//   Node Modules/Options
// -------------------------------------
import fs from 'fs';
import inquirer from 'inquirer';
import slash from 'slash';
import { exec } from 'child_process';
import { createRequire } from 'module'; // Bring in the ability to create the 'require' method

// -------------------------------------
//   Constants
// -------------------------------------
const rootPath = slash(process.cwd());
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
  const rootPackageStr = fs.readFileSync('./package.json');
  const libPackageStr = fs.readFileSync('./projects/ids-enterprise-ng/package.json');

  const rootPackageJson = JSON.parse(rootPackageStr);
  const libPackageJson = JSON.parse(libPackageStr);

  const version = JSON.parse(rootPackageStr).dependencies['ids-enterprise'];
  libPackageJson.dependencies['ids-enterprise'] = version;
  rootPackageJson.dependencies['ids-enterprise'] = version;

  // Make sure to write the trailing line to the file
  const libPackageJsonStr = JSON.stringify(libPackageJson, null, 2) + `\n`;

  fs.writeFile('./projects/ids-enterprise-ng/package.json', libPackageJsonStr, 'utf8', () => {
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
