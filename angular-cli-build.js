// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs
'use strict';
var fs = require('fs');
var path = require('path');

// Import the require hook. Enables us to require TS files natively.
require('ts-node/register');

/* global require, module */
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');
var Funnel = require('broccoli-funnel');
var MergeTree = require('broccoli-merge-trees');

// function buildDemoApp() {
//   return new MergeTree([
//     new Funnel('typings', {
//       destDir: 'typings'
//     }),
//     new Funnel('src', {
//       include: ['components/**/*'],
//       destDir: 'src'
//     }),
//     new Funnel('src/demoapp', {
//       destDir: 'src'
//     })
//   ]);
// }

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    // sourceDir: 'src',
    minifyJS: {
      options: {
        exclude: [
          'vendor/@infor/sohoxi/dist/js/cultures/*.js',
        ]
      }
    },
    tsCompiler: {},
    polyfills: [
      'vendor/core-js/client/core.js',
      'vendor/reflect-metadata/Reflect.js',
      'vendor/systemjs/dist/system.src.js',
      'vendor/zone.js/dist/zone.js',
      'vendor/immutable/dist/immutable.js',
      'vendor/@infor/sohoxi/dist/js/jquery-3.0.0-beta1.min.js',
      'vendor/@infor/sohoxi/dist/js/d3.min.js',
      'vendor/@infor/sohoxi/dist/js/sohoxi.min.js',
    ],
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'core-js/client/core.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      '@infor/sohoxi/dist/js/**/*.+(js|js.map)',
      '@infor/sohoxi/dist/**/*.+(css|html)',
      'immutable/dist/*.js',
    ]
  });
};
