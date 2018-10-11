# What's New with Enterprise-NG

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
