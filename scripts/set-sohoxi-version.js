#!/usr/bin/env node

// usage ./set-sohoxi-version.js 4.2.5-develop

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	version = process.env.soho_next_version || process.argv[2];

if (!version) {
  console.log("[Error] Either soho_next_version should be set or version should be passed in");
  process.exit(1);
} else if (version === pkg.dependencies['@infor/sohoxi']) {
  console.log("[Error] New version cannot match current version.");
	process.exit(1);
} else {
  pkg.dependencies['@infor/sohoxi'] = version;
}

fs.writeFile(filename, JSON.stringify(pkg, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('[Info] Updated SoHo XI version to: ' + pkg.dependencies['@infor/sohoxi']);
});
