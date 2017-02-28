#!/usr/bin/env node

// usage ./set-version.js 4.2.5

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	version = process.env.soho_next_version  || process.argv[2];

if (!version) {
	console.log("[Error] Either angular_version or version should be passed in",process.argv[0], process.argv[1], process.argv[2]);
	console.log("[Error] Either angular_version or version should be passed in");
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
