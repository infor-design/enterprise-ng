## 4.2.5 - Minor Release
Release Date: 2016-10-31

## Whats New
* 2016-10-13 - TH - PR-XXX
  - added typings for listview and splitter.
  - SohoListViewComponent now uses Soho Control defaults for 'options'
* 2016-11-04 - TH - PR-XXX
  - Added module support for _@infor/sohoxi-angular_.
* 2016-11-07 - TH - PR-171
  - added QUICKSTART.md for developers consuming the published NPM package
  - added DEVELOPER.md for SohoXi Angular Component developers
  - copy SohoXi CSS files to `src/assets` on build
  - added _lint_ and _code coverage_ to _unit-test_ npm script
  - automatically include SohoXi typings when consuming NPM package.
* 2016-11-10 - TH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.3-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.3-develop
* 2016-12-23 - TH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.4-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.4-develop
  - Upgraded to angular-cli 1.0.0-beta.24
  - Upgraded to angular 2.3.1
* 2017-01-18 - TH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.5-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.5-develop
  - Upgraded to angular-cli 1.0.0-beta.25-5
  * Upgraded to angular 2.4.X
 * 2017-01-23 - TH - Version Update
   * Upgraded to angular-cli 1.0.0-beta.26
 * 2017-02-04 - TH - Version Update
   * Upgraded to angular-cli 1.0.0-beta-30
   * Upgraded to TypeScript 2.1.x
 * 2017-02-22 - TH - Version Update
   * Upgraded to @angular/cli 1.0.0-beta.32.3
 * 2017-03-03 - TH - Version Update
   * Upgraded to @angular/cli 1.0.0-rc.1
 * 2017-03-08 - TH - SwapList (http://jira/browse/SOHO-5122)
   * Added basic version of SwapList
 * 2017-03-16 - DH - Contextual Action Panel(http://jira/browse/SOHO-5909)
   * Added basic version of Contextual Action Panel

### Breaking Changes

* 2017-05-01 - KH

     SohoToolbarComponent

    `@Output() menuItemClicked` is deprecated. Use `@Output() selected`

* 2016-11-17 - KH - PR-189

    The changes for `SohoIconComponent` will cause a breaking change.
    http://git.infor.com/projects/SOHO/repos/angular-components/pull-requests/189/overview

    ```<soho-icon></soho-icon>```

    will now be

    ```<svg soho-icon></svg>```

    Wrapping the SVG was breaking numerous Sohoxi CSS rules and causing layout issues.

* 2016-10-10 - TH - PR-118

    refactored SohoGridColumn -> SohoDataGridColumn
    refactored SohoSourceRequest -> SohoDataGridSourceRequest
    removed SohoDataGridConfiguration merged into SohoDataGridOptions
    refactored SohoResponseFunction -> SohoDataGridResponseFunction
    removed SohoDatagridSource (abstract class) for source functions

* 2017-02-22 - TH - PR-242
  * Both the CLI and generated project have dependencies that require Node 6.9.0 or higher, together with NPM 3 or higher.
  * Summary of Changes
    * *angular-cli.json*.
      * This file has been renamed as *.angular-cli.json*
      * There are some changes to how the environment is loaded.
    * *src/tsconfig*
      * the TypeScript code is now compiled into *es6* JavaScript.
      * "es5" is now "es6"
    * *src/polyfills.js*
      * *es6* polyfills must now be added as required, specifically for IE11.
    * *package.json*
      * has a few version bumps.
    * *protractor.conf.js*
      * some changes
    * *karma.conf.js*
      * the code coverage tool has changed to use a different module, from *karma-remap-instanbul* to *coverage-instanbul*.
      * this requires a few changes (compare with a new project)
* 2017-03-15 - TH - PR-261
    * Added `dialogComponent` to the prototype for `afterClose` and `closed` event callbacks.  More details in the README.
* 2017-03-29 - TH - PR-275
    * Angular 4 and @angular/cli 1.0.0.
      
## Upgrading

When upgrading, I find the best way is to do the following:
```
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
cd c:\git
mkdir new-app
ng new
```
then compare the folders using **Beyond Compare** (or whatever you have).  Finally,
```
rm -rf node_modules dist
npm install
 ```
