#!/usr/bin/env node

var fs = require('fs'),
	filename = 'package.json',
	pkg = require('../' + filename),
	tag = process.env.bamboo_npm_tag || process.argv[2],
	version = process.env.bamboo_npm_version || process.argv[3];

pkg.dependencies['@infor/sohoxi'] = version  + '-' + tag;
pkg.version = version;

fs.writeFile(filename, JSON.stringify(pkg, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('[Info] Updated version to: ' + pkg.version);
  console.log('[Info] Updated SoHo XI version to: ' + pkg.dependencies['@infor/sohoxi']);
});
