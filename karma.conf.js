// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-remap-istanbul'),
      require('@angular/cli/plugins/karma'),
      require('karma-mocha-reporter'),
      require('karma-bamboo-reporter')
    ],
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
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['progress', 'karma-remap-istanbul', 'mocha']
              : ['progress', 'mocha'],
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
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['Chrome' ],
    browserNoActivityTimeout: 10000,
    singleRun: true
  });
};
