#!/usr/bin/env node

// usage ./set-version.js 4.2.5

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	version = process.env.soho_next_version || process.argv[2];

if (!version) {
	console.log("[Error] Either soho_next_version should be set or version should be passed in");
	process.exit(1);
} else {
  pkg.version = version;
}

fs.writeFile(filename, JSON.stringify(pkg, null, 2), function (err) {
	if (err) return console.log(err);
	console.log('[Info] Updated version to:' + pkg.version);
});
