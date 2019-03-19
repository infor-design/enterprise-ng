# What's New with Enterprise-NG

## v5.2.0

### 5.2.0 Features

- `[ListView]` - Added listview-custom-content demo to show content projected into a list view (not inside a .card) `PWP`  ([Pull Request 384](https://github.com/infor-design/enterprise-ng/pull/384))
- `[ToolbarFlex]` Implemented the wrapper for the toolbar flex component.  `MHH` ([Pull Request 316](https://github.com/infor-design/enterprise-ng/issues/316))

### 5.2.0 Fixes

- `[ListView]` - Added optional SohoListViewOptions arg to updated() function in listview.d.ts `PWP`  ([Pull Request 384](https://github.com/infor-design/enterprise-ng/pull/384))

### 5.2.0 Chore & Maintenance

## v5.1.0

### 5.1.0 Features

- `[AutoComplete]` Added caseSensitive option to autocomplete component `PWP` ([362](https://github.com/infor-design/enterprise-ng/issues/362))
- `[Blockgrid]` Added activateBlock and selectBlocks apis to blockgrid component `PWP` ([362](https://github.com/infor-design/enterprise-ng/issues/362))
- `[DataGrid]` 4.0 Datagrid expose error row clear functions `PWP` ([#314](https://github.com/infor-design/enterprise-ng/issues/314))
- `[DataGrid]` Added a few missing toolbar options to the types. `TJM` ([#336](https://github.com/infor-design/enterprise-ng/issues/336))
- `[DataGrid]` Added headerAlign option to datagrid column. `PWP` ([#304](https://github.com/infor-design/enterprise-ng/issues/304))
- `[DataGrid]` Added safety check on clearFilter for random errors. `TJM` ([#374](https://github.com/infor-design/enterprise-ng/issues/374))
- `[DataGrid]` Added missing filterConditions type to datagrid column. This allows you to edit the filter dropdown conditions. `TJM` ([#350](https://github.com/infor-design/enterprise-ng/issues/350))
- `[DataGrid]` Removed unused enum SohoGridColumnFilterTypes. If using this you should use `filterType: 'text'` instead. `TJM` ([#350](https://github.com/infor-design/enterprise-ng/issues/350))
- `[DatePicker]` Added firstDayOfWeek option to date picker component `PWP` ([362](https://github.com/infor-design/enterprise-ng/issues/362))
- `[General]` Upgraded @angular/cli (to 7.3.2) and @angular/core (to 7.2.5).  `BTHH` ([Pull Request 386](https://github.com/infor-design/enterprise-ng/pull/386))

### 5.1.0 Fixes

- `[Accordion]` - Fixed expand/collapse issue on initial load, icon was always showing a collapsed state. Fixed broken dynamic demo. `KOH` ([Pull Request 390](https://github.com/infor-design/enterprise-ng/pull/390))
- `[Accordion]` - refactored to use `ngZone` - This effects the constructor and how often change detection is called. `BTHH` ([Pull Request 290](https://github.com/infor-design/enterprise-ng/pull/290))
- `[ColorPicker]` - added configuration option for customColor to have the ability to input colors outside the allowed color options. `JT` ([Pull Request 301])
- `[DataGrid]` - changed emptyMessage setter so it will remove any empty message if passed a null or undefined. `PWP` ([Pull Request 305](https://github.com/infor-design/enterprise-ng/pull/305))
- `[DatePicker]` - remove configuration for customValidation. `JT` ([Pull Request 300])
- `[ListView]` - added safety checks for both `clearAllSelected()` and `toggleAll()` methods. `NBCP`  ([Pull Request 364](https://github.com/infor-design/enterprise-ng/pull/364))
- `[TextArea]` - added configuration option for maxLength so it will have a restriction in maximum character input. `JT` ([Pull Request 302])
- `[TextArea]` - added configuration option for maxGrow so it will expand if the characters exceed the height of the textarea. `JT` ([Pull Request 302])
- `[TextArea]` - input events now cause ngModel update events to be fired. `BTHH`  ([Pull Request 345](https://github.com/infor-design/enterprise-ng/pull/345))
- `[TrackDirty]` - added exportAs directive property.

### 5.1.0 Chore & Maintenance

- `[Accordion]` - Added `accordion-dynamic.demo` to show how to create dynamic contents. `BTHH` ([Pull Request 290](https://github.com/infor-design/enterprise-ng/pull/290))
    - 'accordion demo' is now a lazy loaded module.
- `[General]` - Upgraded @types\jquery to 3.3.24 and changed `JQuery.Event` to `JQuery.TriggeredEvent`. `BTHH`

## v5.0.0

### 5.0.0 Features

- `[General]` Upgraded @angular/cli (to 7.0.x) and @angular/core (to 7.0.x).  `BTHH` ([Pull Request 227](https://github.com/infor-design/enterprise-ng/pull/227))
    - support for Node 10
    - support for TypeScript 3.x
    - `UPGRADING.md` has been updated with details on upgrading your application to angular 7.
- `[General]` Upgraded Typescript (to 3.1.x). `BTHH`
    - `@types/jquery` has been updated to 3.3.21.
- `[App]` Added a service to control renderLoop. A global timer used by enterprise to control animations. See index.html for usage example. See app.component.ts for example on how to manually start. ([#214](https://github.com/infor-design/enterprise-ng/issues/214)) `KOH`
- `[General]` Added Breakpoints typedef for ids-enterprise breakpoints.js api ([#258](https://github.com/infor-design/enterprise-ng/issues/258))`PWP`
- `[Message]` Add new settings for message dialog (alert/info type) ([#245](https://github.com/infor-design/enterprise-ng/issues/245)) `TJM`
- `[Editor]` Add new icon for clear formatting button in the editor ([#245](https://github.com/infor-design/enterprise-ng/issues/245)) `TJM`
- `[Datepicker]` Added useCurrentTime setting ([#245](https://github.com/infor-design/enterprise-ng/issues/245)) `TJM`
- `[Export]` Added separator option ([#245](https://github.com/infor-design/enterprise-ng/issues/245)) `TJM`
- `[EmptyMessage]` Add ability to run code on click on empty message ([#245](https://github.com/infor-design/enterprise-ng/issues/245)) `TJM`

### 5.0.0 Fixes

- `[Personalize]` - Added `setTheme` and `setColors` to `SohoPersonalizeDirtective`
    - refactored to use `ngZone` - This effects the constructor and how often change detection is called. `BTHH` ([Pull Request 262](https://github.com/infor-design/enterprise-ng/pull/262))).

### 5.0.0 Chore & Maintenance

## v4.13.0

### 4.13.0 Features

### 4.13.0 Fixes

### 4.13.0 Chore & Maintenance

## v4.12.0

### 4.12.0 Features

- `[Pager]` Added pager-standalone component `PWP`
- `[DataGrid]` Added support for excel utilities to export custom dataset without Datagrid `DV`
- `[DataGrid]` Added allowSelectAcrossPages option for multiselect. ([#207](https://github.com/infor-design/enterprise-ng/issues/207)) `TJM`
- `[Dropdown]` Added onKeyDown option for dropdown key events. ([#207](https://github.com/infor-design/enterprise-ng/issues/207)) `TJM`
- `[Tree]` Added disable/enable method to the tree. ([#207](https://github.com/infor-design/enterprise-ng/issues/207)) `TJM`
- `[Column]` Added yAxis option to the column chart. ([#207](https://github.com/infor-design/enterprise-ng/issues/207)) `TJM`
- `[Dropdown]` Added a placeholder example (this was not working previously) ([#207](https://github.com/infor-design/enterprise-ng/issues/207)) `TJM`

### 4.12.0 Fixes

- `[General]` Refactored a handful of components to use `ngZone`. This effects the constructor and how often change detection is called. `PWP`

### 4.12.0 Chore & Maintenance

- `[General]` `d3` and `@types/d3` version 4.13 added as a dependency for the `ids-enterprise-ng` package.
    Developers should change their angular.json files to refer to the installed version of d3 (and their types) and not the copy in the `enterprise` folder.

## v4.11.0

### 4.11.0 Fixes

- `[TextArea]` Added null guard to `SohoTextAreaComponent` when updating character counter before component initialised. `BTHH` ([Pull Request 186](https://github.com/infor-design/enterprise-ng/pull/186))
- `[DataGrid]` Fixed `(rowremoved)` event `BTHH` ([#77](https://github.com/infor-design/enterprise-ng/issues/77))
- `[DataGrid]` Added typings for `addRow`, this may be a breaking change should incorrect arguments currently be passed. `BTHH`
- `[Button]` Support for tooltips on disabled buttons. `BTHH` ([Pull Request 199](https://github.com/infor-design/enterprise-ng/pull/199))
- `[Editor]` Refactored editor to use `ngZone`. This effects the constructor so may effect those using AOT. `BTHH` ([#164](https://github.com/infor-design/enterprise-ng/issues/164))

### 4.11.0 Chore & Maintenance

- `[General]` Upgraded @angular/cli (to 6.2.3) and @angular/core (to 6.1.8).
- `[General]` Upgraded typeScript (to 2.9.2).

## v4.10.0

### 4.10.0 Features

- [`General`] NPM package now compiled into the Angular Package Format.  ([Pull Request 143](https://github.com/infor-design/enterprise-ng/pull/143)) `BTHH`
    - See `UPGRADING.md` for upgrade information.
    - Upgraded `QUICKSTART.md` document.
    - Introduced new sub-project `ids-enterprise-ng`.
    - Moved `soho` folder to sub-project, as `lib`.
    - Refactored all components to include `/// <reference path=""/>` to typings.
    - Refactored all demo components to use `ids-enterprise-ng` package.
    - Refactored all demo selectors to start with `app-`
    - New build targets `build:lib`, `build:app`, `test:lib` and `pack:lib`.

### 4.10.0 Fixes

- `[DataGrid]` Fixed event arguments `BTHH` ([#156](https://github.com/infor-design/enterprise-ng/issues/156))
- `[DataGrid]` Refactored datagrid to use `ngZone`. This effects the constructor so may effect those using AOT. `BTHH` ([#90](https://github.com/infor-design/enterprise-ng/issues/90))
- `[StepProcess]` Changed `onSaveClose` event name to `saveClose`. `BTHH`
- `[General]` Refactored usages of `Renderer` to `Renderer2`. `BTHH`
- `[General]` Removed all explicit type JavaDoc, e.g. `@memberof`, `@type`, `{typename}`. `BTHH`
- `[General]` Fixed signature of `@HostListener` for `KeyUp`. `BTHH`

### 4.10.0 Chore & Maintenance

- `[DataGrid]` Changed use of deprecated `ReflectiveInjector` to `Injector`. `BTHH`
- `[Input]` Changed `onChange` event name to `change`. `BTHH`

## v4.9.0

### v4.9.0 Features

- `[FieldFilter]` Created the angular wrapper for the Field Filter controls `MHH`

### v4.9.0 Fixes

- `[General]` NPM package file structure changed due to switching to using one package.json file ([Pull Request 92](https://github.com/infor-design/enterprise-ng/pull/92))
- `[Component]` Example note item for future release. `INI` ([#88](https://github.com/infor-design/enterprise-ng/issues/88))
- `[Several]` Added support for ReactiveForms. `BTHH` ([#86](https://github.com/infor-design/enterprise-ng/issues/86))
    - Refactored `soho-autocomplete.component.ts`, `soho-checkbox.component.ts`, `color-picker.component.ts`, `soho-datepicker.component.ts`, `soho-dropdown.component.ts`, `soho-editor.component.ts`, `soho-input.component.ts`, `soho-lookup.component.ts`, `soho-radiobutton.component.ts`, `soho-slider.component.ts`, `soho-spinbox.component.ts`, `soho-textarea.component.ts` and `soho-timepicker.component.ts`,  to support `value`, `disabled` and `readonly`.
- `[Several]` Updated `timepicker` and `spinbox` to use `ngZone`. This effects the constructor so may effect those using AOT. `BTHH`
- `[Several]` Added `setSelected`, `getSelected`, and `toggleSelected` to all the charts that support selection.   `SJW`
- `[Several]` Updated `soho-alert.directive.ts` to support the icon type and `soho-input-validate.directive.ts` to support the icon event. Both were refactored to use `ngZone`. This effects the constructor so may effect those using AOT. `MAF` ([#90](https://github.com/infor-design/enterprise-ng/issues/90))
- `[Datepicker]` Added support for running out of ngZone. This effects the constructor so may effect those using AOT. `TJM` ([#44](https://github.com/infor-design/enterprise-ng/issues/44))
- `[Datepicker]` Updating the typings in soho-datepicker.d.ts to better reflect the datepicker.js in enterprise, and exposed all the datepicker.js options. This may effect users who are now passing in the incorrect option types for soho-datepicker. `MHH` ([#145](https://github.com/infor-design/enterprise-ng/issues/145))

### v4.9.0 Chore & Maintenance

- `[General]` Added a markdown linter for documentation consistency

## v4.7.0

### v4.7.0 Features

- `[General]` Upgraded to latest angular/cli release (Version 6) `BTH`
- `[Tag]` Added Tag support `BTH`
- `[General]` The new package is now available open sourced on ([npmjs](https://www.npmjs.com/package/ids-enterprise-ng)) , the new package name is `ids-enterprise-ng`
- `[Datagrid]` 4.0 Datagrid filter expose the filterWhenTyping setting `MHH` ([SOHO-7851](https://jira.infor.com/browse/SOHO-7851))

### 4.7.0 Fixes

- `[ColorPicker]` Updated colorpicker to use ngZone and added a few missing settings. This effects the constructor so may effect those using AOT. `TJM`
- `[Svg]` Fixed 'svg' file inclusion `BTH`

### v4.7.0 Chore & Maintenance

- `[Several]` Refactored `soho-busy-indicator.directive.ts`, `soho-button.component.ts` , `soho-context-menu.directive.ts`, `soho-expandablearea.component.ts`, `soho-popupmenu.component.ts`, `soho-tabs.component.ts`, and `soho-toolbar.component.ts` added backward compatible `registerForEvents` input to indicate which events should be hooked up from the angular component/directive to it's soho jquery counterpart. `PWP`

## v4.6.0

### v4.6.0 Fixes

- `[FileUpload]`  File upload component - Refactor to support directive usage `MAF` ([SOHO-7711](https://jira.infor.com/browse/SOHO-7711))
- `[EmptyMessage]` Allow soho-emptymessage projection in list view `MHH` ([SOHO-7756](https://jira.infor.com/browse/SOHO-7756))
- `[General]` Made last input components all ChangeDetectionStrategy.ONPUSH `PWP`
- `[General]` Added radar wrapper `TJM`
