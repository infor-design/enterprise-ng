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
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    mochaReporter: {
      colors: {
        success: 'white',
        info: 'orange',
        warning: 'cyan',
        error: 'bgRed',
      },
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
      { pattern: '../../node_modules/ids-enterprise/dist/css/light-theme.css', watched: false },
    ],
    preprocessors: {
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
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
          '--disable-setuid-sandbox',
          '--no-sandbox', // required to run without privileges in docker
          '--no-proxy-server',
          '--enable-logging'
        ]
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    captureTimeout: 21000,
    browserDisconnectTolerance: 10, //this one helps
    browserDisconnectTimeout : 21000,
    browserNoActivityTimeout : 21000,
    singleRun: true,
    restartOnFileChange: true
  });
};
