// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

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
      { pattern: '../../node_modules/ids-enterprise/dist/js/d3.v4.js', watched: false  },
      { pattern: '../../node_modules/ids-enterprise/dist/js/sohoxi.js', watched: false },
      { pattern: '../../node_modules/ids-enterprise/dist/js/cultures/en-US.js', watched: false },
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
      'PhantomJS_custom': {
        base: 'PhantomJS',
        debug: true
      },
       ChromeDebug: {
          base: 'Chrome',
          flags: [ '--remote-debugging-port=9333' ]
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    captureTimeout: 210000,
    browserDisconnectTolerance: 10, //this one helps
    browserDisconnectTimeout : 210000,
    browserNoActivityTimeout : 210000,
    singleRun: false
  });
};
