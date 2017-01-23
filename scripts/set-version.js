#!/usr/bin/env node

// usage ./set-version.js 4.2.5

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	version = process.env.bamboo_version || process.env.bamboo_jira_version;

if (!version) {
	console.log("[Error] Either bamboo_version or bamboo_jira_version ENV must be set.");
	process.exit(1);
} else if (version === pkg.version) {
  console.log("[Error] New version cannot match current version.");
	process.exit(1);
} else {
  pkg.version = version;
}

fs.writeFile(filename, JSON.stringify(pkg, null, 2), function (err) {
	if (err) return console.log(err);
	console.log('[Info] Updated version to:' + pkg.version);
});

