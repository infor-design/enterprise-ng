/*
 This script checks the engine field in package.json. And alerts the developers
*/
const pjson = require('../package.json');
const semver = require('semver');

const nodeVersion = pjson.engines.node;
if (!semver.satisfies(process.versions.node, nodeVersion)) {
  console.log(`Required node version ${nodeVersion} not satisfied with current version ${process.versions.node}.`);
  process.exit(1);
}
