## Whats New
* 2018-05-14 - BTH - Fixed 'svg' file inclusion
* 2018-05-10 - CRL - NPM packages changes
  - The new package is now available open sourced on npmjs
  - The packages new name is `ids-enterprise-ng` and is [here](https://www.npmjs.com/package/ids-enterprise-ng) 
* 2018-05-08 - BTH - Upgraded to @angular 6.0.0 and @angular/cli 6.0.0
* 2018-05-07 - PWP - SOHO-7923: Refactored several components and directives to run outside angular
  - refactored `soho-busy-indicator.directive.ts`, `soho-button.component.ts` , `soho-context-menu.directive.ts`,
  `soho-expandablearea.component.ts`, `soho-popupmenu.component.ts`, `soho-tabs.component.ts`, and `soho-toolbar.component.ts`
  - added backward compatible `registerForEvents` input to indicate which events should be hooked up from the angular component/directive to it's soho jquery counterpart.
* 2018-04-25 - MHH - SOHO-7851: 4.0 Datagrid filter expose the filterWhenTyping setting
* 2018-04-12 - MAF - SOHO-7711: 4.0 File upload component - Refactor to support directive usage
* 2018-04-04 - MHH - SOHO-7756: Allow soho-emptymessage projection in list view
* 2018-04-02 - TJM - Removed the need for the soho-migrate script
* 2018-04-02 - PWP - Made last input components all ChangeDetectionStrategy.ONPUSH
* 2018-03-13 - TJM - Added radar wrapper
* 2018-02-06 - TJM - Upgraded to d3v4 and Soho 4.4.0 Es6 Branch including migration script
* 2018-01-23 - BTH - Upgraded to @angular/cli 1.6.5 and updated corresponding dependencies.
* 2018-01-18 - MHH - SOHO-7354: 4.0 Popdown expose the open method
* 2018-01-03 - MHH - SOHO-7296 Angular Soho DropDown - add support for showSelectAll option on multi-select
* 2018-01-02 - BTHH - PR-555 - Upgraded to @angular/cli 1.6.3.
* 2017-12-29 - TJM - Added siblings option to datagrid
* 2017-12-18 - PWP - Added wrapper for empty message component
* 2017-12-15 - CWF - SOHO-6856: Upgraded JQuery types from 2.0.46 to 3.2.16 to match our use of jQuery 3
* 2017-12-06 - MHH - SOHO-7228: Added support for lazy loading the context menu's popup menu.
* 2017-12-06 - MAF - SOHO-7216: Added support for SohoAlert.
* 2017-11-07 - BTH - SOHO-6797/SOHO-7015/SOHO-6263: Added support for component formatters and editors for datagrid.
* 2017-11-17 - BTH - PR-512 - Added 'emptyMessage' support.
* 2017-11-10 - BTH - PR-503 - Upgraded to angular-cli 1.5 and angular 5.
* 2017-11-09 - BTH - Added 'maxWidth', 'filterMode', 'moveSelected', 'showEmptyGroupHeaders', 'sourceArguments' and 'reloadSourceOnOpen' to `soho-dropdown`.
* 2017-11-03 - TJM - SOHO-6265: Added support for SOHO 'field-options'.
* 2017-10-24 - BTH - SOHO-6317: Added support for SOHO 'wizard'.
* 2017-10-18 - BTH - SOHO-5124: File Upload Advanced (`soho-fileupload-advanced`)
* 2017-10-24 - MAF - SOHO-7041: 4.0 Radiobutton demo does not disable correctly when using ngModel; added forRadioButton in soho-label.directive.
* 2017-10-11 - MAF - SOHO-6954: Add support for the maskedinput control in soho-mask.
* 2017-10-06 - PWP - PR-471 - Changed some functions in soho-datagrid.component to match recently made datagrid.js changes. See breaking changes below for details.
* 2017-09-28 - MHH - Updated Soho-editor to implement BaseControlValueAccessor
* 2017-09-07 - THM - Fixed SOHO-6746 - See breaking changes
* 2017-08-30 - PWP - Fixed breakpoints type in soho-application-menu.d.ts to match soho.
* 2017-08-16 - BTH - Fixed SOHO-5125 - `spinbox`, `datepicker`, `timepicker` and `colorpicker`.
* 2017-08-15 - BTH - Upgraded to @angular/cli 1.3.0
* 2017-08-08 - MHH - Added support for grouped headers to datagrid
* 2017-08-01 - BTH - PR-409 - Fixed use of reactive forms with soho-mask (see breaking changes)
* 2017-07-25 - PWP - PR-403 - Added collapseOnMobile input for search field on a soho-toolbar
* 2017-07-20 - PWP git - PR-399 - Added input and outputs to soho-popupmenu
* 2017-07-18 - TJM - Added a service for the about dialog like the message service. (SOHO-5630)
* 2017-07-12 - BTH - PR-382 - Added api support for the `accordion` control.
  - added `expandAll`, `collapseAll`, `toggle`, `expand`, `collapse`, `enable`, `disable`, `isDisabled` and `isExpanded`.
  - added `headers` collection to `accordion` component.
  - added ability to update options as per  existing angular wrappers.
* 2017-07-08 - BTH - Improved Veto Support for modal and message dialogs.
  - Added `dialogRef` as an argument to `beforeClose` to provide access to dialog properties.
* 2017-07-03 - BTH - Added `dirtyRows` to dataGrid.
  - Removed `getDirtyRows(...)` as this was not implemented and did not match the underlying control.
* 2017-07-05 - MH - Home Page (https://jira/browse/SOHO-6468)
  - Added basic version of the Home Page
* 2017-06-12 - PWP - Updates to `soho-expandablearea.component` and `soho-button.component`
  - Added `soho-expandable-footer` element
  - Changed `soho-expandable-header` to be optional
  - Added `expandableExpander` input to `soho-button.component` for custom expander button
  - Added `soho-expandablearea-footer-demo` to illustrate use of the custom expander button
* 2017-06-09 - BTH - Version Update (http://jira/browse/SOHO-6322)
  * Upgraded to @angular/cli 1.1.1
* 2017-06-07 - BTH - Listview Changes
  * Added `select`, `unselect` and `remove` methods.
* 2017-05-11 - KH - Changed data grid interfaces specifically, `SohoDataGridRowEvent to SohoDataGridToggleRowEvent`
* 2017-04-07 - TJM - Change to copy link/assets out of the node_modules
* 2017-03-16 - DH - Contextual Action Panel(http://jira/browse/SOHO-5909)
  * Added basic version of Contextual Action Panel
* 2017-03-08 - BTH - SwapList (http://jira/browse/SOHO-5122)
 * Added basic version of SwapList
* 2017-03-03 - BTH - Version Update
  * Upgraded to @angular/cli 1.0.0-rc.1
* 2017-02-04 - BTH - Version Update
  * Upgraded to angular-cli 1.0.0-beta-30
  * Upgraded to TypeScript 2.1.x
* 2017-02-22 - BTH - Version Update
  * Upgraded to @angular/cli 1.0.0-beta.32.3
* 2017-01-23 - BTH - Version Update
  * Upgraded to angular-cli 1.0.0-beta.26
* 2017-01-18 - BTH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.5-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.5-develop
  - Upgraded to angular-cli 1.0.0-beta.25-5
* 2016-12-23 - BTH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.4-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.4-develop
  - Upgraded to angular-cli 1.0.0-beta.24
  - Upgraded to angular 2.3.1
* 2016-11-10 - BTH - Version Update
  - Bumped version of @infor/sohoxi to 4.2.3-develop
  - Bumped version of @infor/sohoxi-angular to 4.2.3-develop
* 2016-11-07 - BTH - PR-171
  - added QUICKSTART.md for developers consuming the published NPM package
  - added DEVELOPER.md for SohoXi Angular Component developers
  - copy SohoXi CSS files to `src/assets` on build
  - added _lint_ and _code coverage_ to _unit-test_ npm script
  - automatically include SohoXi typings when consuming NPM package.
* 2016-11-04 - BTH - PR-XXX
  * Added module support for _@infor/sohoxi-angular_.
* 2016-10-13 - BTH - PR-XXX
 * added typings for listview and splitter.
 * SohoListViewComponent now uses Soho Control defaults for 'options'

### Breaking Changes

* 2018-05-08 - CRL - NPM packages changes for Enterprise Components for Angular
The `angular.json` file requires changes to reference the new packages, spefifically:
```json
"assets": [
  { 
    "glob": "**/*",
    "input": "./node_modules/ids-enterprise/dist/css",
    "output": "./assets/ids-enterprise/css"
  }
]
```
```json
"scripts": [
    "./node_modules/jquery/dist/jquery.js",
    "./node_modules/ids-enterprise/dist/js/sohoxi.js",
    "./node_modules/ids-enterprise/dist/js/cultures/en-US.js",
    "./node_modules/ids-enterprise/dist/js/d3.v4.js"
  ]
```
Applications will be need to change all import lines that specify **@infor/sohoxi-angular** to **ids-enterprise-ng**. For example:
```typescript
import { SohoButton } from 'ids-enterprise-ng';
```
**package.json** must be updated to import **ids-enterprise** and **ids-enterprise-ng**.
```json
 "ids-enterprise": "^4.7.0-dev.20180511",
 "ids-enterprise-ng": "^4.7.0-dev.20180511",
```
**index.html** may required updates if assets are being included, for example:
```html
<link rel="stylesheet" id="stylesheet" href="/assets/ids-enterprise/css/light-theme.css" type="text/css">
```
**tsconfig.json** must be updated to point to the new `ids-enterprise-ng` package.  Add `node_modules/ids-enterprise-ng/**/*` to the `include` property, as follows:

```json
"include": [
  "src/**/*",
  "node_modules/ids-enterprise-ng/**/*"
]
```
* 2018-05-08 - BTH - Upgraded to @angular 6.0.0 and @angular/cli 6.0.0  
It is recommended that consumers of the the **ids-enterprise-ng** components also upgrade their applications to version 6 of @angular and @angular/cli.  The easiest way to do this is to follow the instructions at https://update.angular.io/.

* 2018-05-07 - PWP - SOHO-7923: Refactored several components and directives to run outside angular
changed soho-busyindicator.directive.ts' 'close' event to 'complete' to match the jquery component - busyindecator.js  

* 2018-04-12 - MAF - SOHO-7711: 4.0 File upload component refactor to support directive usage - changed to <input soho-fileupload /> from <soho-fileupload>

* 2018-04-02 - TJM - This should still be working if you do include  the sohoxi-migrate-4.4.0.js.
But noted as a breaking change. In 4.6.0 we updated the Locale, Editors and Formatters so that they
will work without the migrate script. You should update your code as well. Change Locale to Soho.Locale and Editors to Soho.Editors and Formatters to Soho.Formatters. For now both types are left in but if using the one without the Soho prefix you should include sohoxi-migrate-4.4.0.js

* 2018-03-13 - TJM - The lookup's on change event did not have the data elements and was just firing with the value. This is changed, but if you were relying on the value there you may need to adjust your code to use the values attribute.

* 2017-12-15 - TJM -SOHO-6976 - Projects may need to change .angular-cli.json to pull in the newly renamed d3.v4.js script and add the sohoxi-migrate-4.4.0.js script. This is needed unless global references are changed. Globals should be moved to the Soho namespace for example Formatters -> Soho.Formatters (see SOHO-7457 for entire list).

* 2017-12-15 - CWF - PR-532 - Projects may need to update the version of `@types/jquery` in their `package.json` file to match sohoxi-angular's version: `"@types/jquery": "~3.2.16"`

* 2017-12-12 - KH  - Changed soho-accordion-pane.component.html from..

  ```angular2html
  <div class="accordion-content">
    <ng-content></ng-content>
  </div>
  ```
   to
  ```angular2html
  <ng-content></ng-content>
  ```
  The wrapper for `accordion-content` should be part of the transclusion coming from the application. For example.. accordion.demo.html
  ```angular2html
    <soho-accordion-pane>
        <div class="accordion-content">
        ... your content
      </div>
    </soho-accordion-pane>
  ```

* 2017-11-10 - BTH - PR-XXX - When using `@angular/cli` 1.5, the cli no longer automatically determines the typescript files to compile, and as `@infor/sohoxi-angular` is not distributed as a compiled package the module must be added to the top level  `tsconfig.json` for inclusion in the build.  For example:

  ```json
   "include": [
    "src/**/*",
    "node_modules/@infor/sohoxi-angular/index.ts"
   ]
  ```

* 2017-10-06 - PWP - PR-471 - Changed 2 soho-datagrid.component functions to match changes made to datagrid.js in sohoxi/PR-2049: selectedRows() now returns selected row. selectRows() selects rows.

* 2017-08-17 - TJM - Not entirely breaking but file upload should now be done without an inline label as per fileupload example. This wont break if you don't change it but will cause a loop on ie edge due to an ie edge bug if initializing it with an inline label. So change your file upload markup

* 2017-08-30 - PWP - Fixed breakpoints SohoApplicationMenuBreakPoint type in soho-application-menu.d.ts to match soho. Two settings weren't available (tablet and large) and caused the app menu to dismiss on every click. And several other options weren't defined in the type.


* 2017-08-17 - PWP - soho-personalize.d.ts - had incorrect options definition. This removes the use the `@Input() startingColor` as an option into the personalize directive. Use of `@Input() colors` is recommended instead.

* 2017-08-16 - BTH - soho-spinbox.component - hooked up value input to model, and exposed as setter.  This deprecates the original `updateVal` property - which exposed the internal function.  Old code may continue to work, but should be replaced with:

    ```
    this.spinbox.value = 90;
    ```

* 2017-08-09 - PWP - soho-popupmenu.component - moved isDisabled `@Input()` from the `<a>` anchor to the `<li>`

* 2017-08-01 - BTH - PR-409 - Changed the `pattern` attribute used by `soho-mask` to define the pattern to `sohoPattern`, this change is required otherwise this name clashes with the attribute used by the forms module.

* 2017-07-21 - PWP - PR-401 - Changed SohoPopupMenuEvent to include the original JQueryEvent as a property instead of extending from it.

    Any code relying on the jQueryEvent should reference it through the SohoContextMenuEvent and SohoPopupMenuEvent.

* 2017-07-28 - BTH - Added generic type argument onto `SohoModalDialogVetoableEventGuard`.  

    Any code using this interface should add the generic type of the dialog component, or `any` for messages.

* 2017-07-23 - BTH - Replaced `getDirtyRows(...)` with `dirtyRows()` on datagrid.  

    Any code using the original method would not have worked as expected as the code alwasy returned `[]`.

* 2017-06-01 - VW - PR-298 - Replaced enable and disable functions with disabled property to enable/disable dropdown and added readonly property.

* 2017-05-31 - PWP - Markup change needed for new tabs implementation in soho

    The soho-tabs now can only contain the tab list and require a new element `<div soho-tab-list-container>` to
    encapsulate the `<ul soho-tab-list>`.

    ```angular2html
    <div soho-tabs>
      <div soho-tab-list-container>    <-- NEW ELEMENT
        <ul soho-tab-list>
          <li soho-tab><a soho-tab-title tabId="tab1">Contracts</a></li>
          ...
        </ul>
      </div>
    </div>
    ```

    The tab panels need to be placed inside a `<div soho-tab-panel-container>` element. This markup can
    occur largely anywhere in the markup in support of header tabs. A restriction being that it cannot
    be placed in the `<div soho-tabs>` element.
    ```angular2html
    <div soho-tab-panel-container>     <-- NEW ELEMENT
      <div soho-tab-panel tabId="tab1">
        <p>tab content</p>
      </div>
      ...
    </div>
    ```
    If the `<div soho-tab-panel-container>` is not a sibling of `<ul soho-tabs>` (for example
    in the case of header tabs) then you'll need to pass in a containerElement selector as input to the
    `<div soho-tabs>`. For Example:
    ```angular2html
    <header>
      <div soho-tabs [containerElement]="#header-tab-panels">
      </div>
    </header>

    * somewhere in your document *
    <div soho-tab-panel-container id="header-tab-panels">
    </div>
    ```     

* 2017-04-19 - BTH - Changed `selectedNode` to `selectNode` to match jQuery tree widget.

* 2017-04-18 - TJM - Changed setSelectedNode method in tree component to selectedNode to match the component change.

* 2017-04-07 - TJM - PR-278

It is not necessary to use gulp anymore with the default.
I dont call this a breaking change because copy-assets will still work but you dont need it now unless you use it for something else.

a) the icons component and svg reference each other in node_modules by default
and angular cli can copy the assets out correctly.
b) To do this you will need to change .angular-cli.json to pull from the node_modules

See this commit for changes: http://git.infor.com/projects/SOHO/repos/sohoxi-angular-quickstart/commits/605ab3ec1e4541330e9eba347c0ec1964091283f

Quick start project is updated and working.
- git clone ssh://git@git.infor.com:7999/soho/sohoxi-angular-quickstart.git
- npm install (Now fast!!!)
- ng build (no copy assets needed

* 2017-05-01 - KH

     SohoToolbarComponent

    `@Output() menuItemClicked` is deprecated. Use `@Output() selected`

* 2017-04-03 - PP - PR-278

    Changed the events fired from SohoTabsComponent. Instead of the newly selected tab being
    passed into the event handler it will now be the SohoTabsEvent with the tab added into it
    as a property.

    `(activated)="onActivated($event)`

    How it was handled before:

    ```
    onActivated(tab: any) {
       console.log(tab)
    }
    ```

    How to handle it now

    ```
    onActivated(event: SohoTabsEvent) {
       console.log(event.tab)
    }
    ```

    This change was necessary so that certain soho-tabs.component functions could be used.
    ```
    onActivated(event: SohoTabsEvent) {

      // putting in timeout so the component has a chance to get the
      // jquery component instance

      setTimeout(() => {
        let tab = this.sohoTabsComponent.getTab(event, event.tab);
        let tabIndex = tab.index();
      }, 1);
    }
    ```

* 2017-03-29 - BTH - PR-275
    * **angular-cli 1.0.x**.
      * This requires the consuming application to be upgraded to angular 4 (and possible cli 1.0 too).
    * **angular 4.0.x**
      * Any usages of `template` should be changed to `ng-template`.
      *
    * *SoHoXi Assets*
      * The location of the assets for sohoxi has been changed to a sub-folder (sohoxi), to avoid poluting the `asset` folder. This should not affect consuming apps, however should be treated as guidance on how to structure a cli app.  
      * The ultimate method for managing these assets is down to the consuming app, so this change should not impact existing applications.
* 2017-03-15 - BTH - PR-261
    * Added `dialogComponent` to the prototype for `afterClose` and `closed` event callbacks.  More details in the README.
* 2017-02-22 - BTH - PR-242
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
* 2016-11-17 - KH - PR-189

    The changes for `SohoIconComponent` will cause a breaking change.
    http://git.infor.com/projects/SOHO/repos/angular-components/pull-requests/189/overview

    ```<soho-icon></soho-icon>```

    will now be

    ```<svg soho-icon></svg>```

    Wrapping the SVG was breaking numerous Sohoxi CSS rules and causing layout issues.
* 2016-10-10 - BTH - PR-118

    refactored SohoGridColumn -> SohoDataGridColumn
    refactored SohoSourceRequest -> SohoDataGridSourceRequest
    removed SohoDataGridConfiguration merged into SohoDataGridOptions
    refactored SohoResponseFunction -> SohoDataGridResponseFunction
    removed SohoDatagridSource (abstract class) for source functions

## Upgrading

Use **sohoxi-angular-quickstart** (http://git.infor.com/projects/SOHO/repos/sohoxi-angular-quickstart/browse) as a template.

Use **ng new** as a template with reference to the QUICKSTART guide.

Alternatively, read the upgrade guidelines on https://github.com/angular/angular-cli/wiki/stories-1.0-update.

The following is what I usually do:
```
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
cd c:\git
mkdir new-app
cd new-app
ng new
```
then compare the folders using **Beyond Compare** (or whatever you have).  Finally,
```
rm -rf node_modules dist
npm install
 ```
