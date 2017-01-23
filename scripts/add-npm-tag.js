#!/usr/bin/env node

// usage ./add-npm-tag.js develop

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	tag = process.env.bamboo_npm_tag || process.argv[2];

if (!pkg.version.includes(tag)) {
	pkg.version = pkg.version + '-' + tag;
}

fs.writeFile(filename, JSON.stringify(pkg, null, 2), function (err) {
	if (err) return console.log(err);
	console.log('[Info] Updated version to:' + pkg.version);
});

