// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
System.defaultJSExtensions = true; //tslint:disable-line

const components = [
  'application-menu',
  'busyindicator',
  'button',
  'datagrid',
  'expandablearea',
  'header',
  'icon',
  'masthead',
  'tabs',
  'toolbar',
  'tree',
];

const componentBarrels: string[] = [];

components.forEach(component => componentBarrels.push(`components/${component}`));

/** Map relative paths to URLs. */
const map: any = {
  'immutable': 'vendor/immutable/dist'
  // '@infor/sohoxi/angular': 'components'
};

/** User packages configuration. */
const packages: any = {
  'immutable': { main: 'immutable', format: 'cjs', defaultExtension: 'js' },
};
// components.forEach(component => {
//   map[`@infor/sohoxi/angular/${component}`] = `components/${component}`;
//   packages[`@infor/sohoxi/angular/${component}`] = {
//     format: 'cjs',
//     defaultExtension: 'js'
//   };
// })

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/forms',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'demoapp',
  'components',
  'utils',
  'directives',
  'services',
  ...componentBarrels
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
