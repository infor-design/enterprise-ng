// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mochaReporter: {
      output: 'autowatch',
    },
    files: [
      { pattern: '../../node_modules/jquery/dist/jquery.js', watched: false  },
      { pattern: '../../node_modules/d3/dist/d3.js', watched: false  },
      { pattern: '../../node_modules/ids-enterprise/dist/js/sohoxi.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/en-US.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/it-IT.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/nl-NL.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/hi-IN.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/sv-SE.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/css/theme-classic-light.css', watched: false },
    ],
    preprocessors: {
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ]
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'coverage-istanbul', 'kjhtml', 'mocha']
      : ['progress', 'kjhtml', 'mocha'],
    mocha:{
      outputFile: 'tests/results.txt'
    },
    customLaunchers: {
      ChromeDebug: {
          base: 'Chrome',
          flags: [ '--remote-debugging-port=9333' ]
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless'
        ]
      }
    },
    port: 9876,
    logLevel: config.LOG_ERROR,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    captureTimeout: 23000,
    browserDisconnectTolerance: 12, //this one helps
    browserDisconnectTimeout : 23000,
    browserNoActivityTimeout : 23000,
    singleRun: true,
    restartOnFileChange: true
  });
};
