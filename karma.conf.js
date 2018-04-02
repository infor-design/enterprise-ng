// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter'),
      require('karma-bamboo-reporter')
    ],
    client:{
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
      { pattern: './node_modules/jquery/dist/jquery.js', watched: false  },
      { pattern: './node_modules/@infor/sohoxi/dist/js/d3.v4.js', watched: false  },
      { pattern: './node_modules/@infor/sohoxi/dist/js/sohoxi.js', watched: false },
      { pattern: './node_modules/@infor/sohoxi/dist/js/cultures/en-US.js', watched: false },
      { pattern: './src/test.ts', watched: false },
      { pattern: './node_modules/@infor/sohoxi/dist/css/light-theme.css', watched: false },
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
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
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome' ],
    browserDisconnectTimeout : 20000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    browserNoActivityTimeout : 100000, //default 10000
    singleRun: false
  });
};
