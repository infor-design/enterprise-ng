# What's New with Enterprise-NG

## v7.2.0

### 7.2.0 Fixes

- `[Modal]` The modal dialog had a second wrapper added (SohoModal vs SohoModalDialog), it was decided to stick with one, the existing SohoModalDialog.  `TJM` ([Issue #776](https://github.com/infor-design/enterprise-ng/issues/776))

## v7.1.0

### 7.1.0 Fixes

- `[ContextualActionPanel]` The contextual action panel turned off all body events messing up other components attached to body so namespaced these.  `TJM` ([Issue #811](https://github.com/infor-design/enterprise-ng/issues/811))
- `[Locale]` The types for locale were not incorrect, added fixes and enhanced them with new types.  `TJM` ([I #756](https://github.com/infor-design/enterprise-ng/issues/756))
- `[Datagrid]` Added new aggregator types.  `TJM` ([#3752](https://github.com/infor-design/enterprise/issues/3752))
- `[Datepicker]` Added newly added callback to disabled dates.  `TJM` ([#3462](https://github.com/infor-design/enterprise/issues/3462))
- `[Wizard]` Prevent page refresh on selecting wizard ticks.  `BTHH` ([Pull Request #797](https://github.com/infor-design/enterprise-ng/pull/797))
- `[Utils]` Added isInViewPort utils to types.  `TJM` ([#3738](https://github.com/infor-design/enterprise/issues/3738))

## v7.0.3

### 7.0.3 Features

- `[FileUploadAdvanced]` Added support to fire event `fileremoved` for attached file removed. ([#3548](https://github.com/infor-design/enterprise/issues/3548))
- `[FileUploadAdvanced]` Added support to api settings `maxFiles` to limit number of uploads. ([#3512](https://github.com/infor-design/enterprise/issues/3512))

### 7.0.3 Fixes

- `[General]` Added 4.27.4 patch release. `TJM`
- `[General]` Bump minor version of NG. `TJM`

## v7.0.2

### 7.0.2 Fixes

- `[General]` Added 4.27.3 patch release. `TJM`

## v7.0.1

### 7.0.1 Fixes

- `[General]` Added 4.27.2 patch release. `TJM`

## v7.0.0

### 7.0.0 Fixes

- `[General]` Enabled Ivy with NG 9.1.  `BTHH` ([Issue #586](https://github.com/infor-design/enterprise-ng/issues/586))
- `[General]` Enabled Ivy with NG 9.0.  `BTHH` ([Issue #586](https://github.com/infor-design/enterprise-ng/issues/586))
- `[General]` Added numerous missing settings from 4.23 to 4.27.  `TJM` ([Pull Request 743](https://github.com/infor-design/enterprise-ng/pull/743))
- `[Datagrid]` Added missing showNewRowIndicator setting.  `TJM` ([Issue #430](https://github.com/infor-design/enterprise-ng/issues/430))
- `[DataGrid]` Added missing and/or fixed methods `validateAll`, `validateRow`, and `showRowError`.  `TJM` ([Issue #704](https://github.com/infor-design/enterprise-ng/issues/704))
- `[DataGrid]` Added `showSelectAllCheckBox` option.  `BTHH` ([Pull Request 740](https://github.com/infor-design/enterprise-ng/pull/740))
- `[DataGrid]` Added `hidePagerOnOnePage` input.  `TJM` ([Issue #771](https://github.com/infor-design/enterprise-ng/issues/771))
- `[FileUploadAdvanced]` - Added `errorMaxFilesInProcess` and `errorMaxFileSize` inputs to component, and added zone compatibility.  `BTHH` ([Pull Request XXX](https://github.com/infor-design/enterprise-ng/pull/XXX))
- `[FlexToobar]` Stopped 'more' button being activated on form submit.   `BTHH` ([Pull Request 743](https://github.com/infor-design/enterprise-ng/pull/743))
- `[Icon]` Changed to remove `Renderer2` and use `href` instead of `xlink:href`.  `BTHH` ([Issue #3611](https://github.com/infor-design/enterprise/issues/3611))
- `[Lookup]` Updated example page to add async multiselect. ([#588](https://github.com/infor-design/enterprise-ng/issues/588))
- `[Modal]` Added some missing settings and inputs. `TJM` ([#3562](https://github.com/infor-design/enterprise/issues/3562))
- `[Popdown]` Added missing isOpen method.  `TJM` ([Issue #698](https://github.com/infor-design/enterprise-ng/issues/698))
- `[Personalize]` Fixed errors and updated the theme and variant switcher to have several submenus.   `TJM/BTHH` ([Pull Request 745](https://github.com/infor-design/enterprise-ng/pull/745))
- `[Personalize]` Fixed a problem reseting the color to default and reloading the page.   `TJMH` ([Pull Request 751](https://github.com/infor-design/enterprise-ng/pull/751))
- `[ModalDialog]` - Modal dialogs can now be optionally closed when navigating. `BTHH` ([Pull Request 784](https://github.com/infor-design/enterprise-ng/pull/784))

### 7.0.0 Features

- `[Datagrid]` Added support for api setting on expand and collapse children. ([#3274](https://github.com/infor-design/enterprise/issues/3274))
- `[General]` Upgraded @angular/cli (to 9.0.x) and @angular/core (to 9.0.x).  `BTHH` ([Pull Request 578](https://github.com/infor-design/enterprise-ng/pull/578))
    - support for Node 10.13.0+
    - support for TypeScript 3.6.x & 3.7.x
    - support for Ivy (ids-enterprise-ng is not compiled using ivy)
    - `UPGRADING.md` has been updated with details on upgrading your application to angular 9.
    - there are issues with the svg icons when ivy is enabled in the hosting application, (see ([Angular Issue](https://github.com/angular/angular/issues/34256))), so Ivy will need to be disabled at this time.
- `[TextArea]` The text area will now grow on initial load and setting of data in the model. `TJM` ([#732](https://github.com/infor-design/enterprise-ng/issues/732]))
- `[Homepage]` Exposed the editing functionality to allow widgets to be resized, reordered, and removed. `CRL` ([#768](https://github.com/infor-design/enterprise-ng/issues/768))

## v6.6.4

### 6.6.4 Fixes

- `[General]` Added 4.27.4 patch release. `TJM`
- `[General]` Added showTags types in dropdown. `TJM`

## v6.6.3

### 6.6.3 Fixes

- `[General]` Added 4.27.3 patch release. `TJM`

## v6.6.2

### 6.6.2 Fixes

- `[General]` Added 4.27.2 patch release. `TJM`

## v6.6.1

- `[Icons]` Added a fix to support both `href` and `xlink:href` in icons. ([#3734](https://github.com/infor-design/enterprise/issues/3734))

## v6.6.0

### 6.6.0 Fixes

- `[General]` Adds 4.27.x release. `TJM`

## v6.5.1

### 6.5.1 Fixes

- `[General]` Adds 4.26.2 patch release. `TJM`

## v6.5.0

### 6.5.0 Fixes

- `[ContextualActionPanel]` Fixed default settings. `BTHH` ([#720](https://github.com/infor-design/enterprise-ng/issues/720]))
- `[ModalDialog]` Added 'centreTitle' to SohoModalOptions. `BTHH`  ([#721](https://github.com/infor-design/enterprise-ng/pull/721]))

### 6.5.0 Features

- `[Alert]` Added support for the id property. `DPB` ([#725](https://github.com/infor-design/enterprise-ng/issues/725]))
- `[ModalDialog]` Added 'centerTitle' to SohoModalOptions. `BTHH`  ([#721](https://github.com/infor-design/enterprise-ng/pull/721]))
- `[DropDown]` Added 'listclosed' and 'listopened' outputs to soho-dropdown. `BTHH`  ([#662](https://github.com/infor-design/enterprise-ng/issues/662]))
- `[ModalDialog]` Added 'centreTitle' to SohoModalOptions. `BTHH`  ([#721](https://github.com/infor-design/enterprise-ng/pull/721]))
- `[Searchfield]` Exposed the `collapseSize` setting for use with the IDS Enteprise Searchfield component ([#719](https://github.com/infor-design/enterprise-ng/issues/719))
- `[Demo]` Added support for running the demo app in Internet Explorer. `BTHH` ([#668](https://github.com/infor-design/enterprise-ng/issues/668]))

## v6.4.3

### 6.4.3 Fixes

- `[General]` - Added 4.25.4 patch 3505. `TJM` ([#3505](https://github.com/infor-design/enterprise/issues/3505))
- `[General]` - Added 4.25.4 patch for 3503. `TJM` ([#3503](https://github.com/infor-design/enterprise/issues/3503))

## v6.4.2

### 6.4.2 Fixes

- `[General]` - Added 4.25.2 patch. `TJM` ([#3458](https://github.com/infor-design/enterprise/issues/3458))

## v6.4.1

### 6.4.1 Fixes

- `[General]` - Added 4.25.1 patch. `TJM` ([#3458](https://github.com/infor-design/enterprise/issues/3458))

## v6.4.0

### 6.4.0 Breaking Changes

- `[Calendar]` - Removed "on" prefix on any of the inputs due to test error. `VW` ([#712](https://github.com/infor-design/enterprise-ng/pull/712))

### 6.4.0 Fixes

- `[Tree]` Expose unselected event. `MC` ([#https://github.com/infor-design/enterprise-ng/issues/670](https://github.com/infor-design/enterprise-ng/pull/https://github.com/infor-design/enterprise-ng/issues/670))
- `[Datagrid]` Correct the cssClass type on columns to accept a function. `TJM`  ([#657](https://github.com/infor-design/enterprise-ng/issues/657))

### 6.4.0 Features

- `[Week-view]` - Added weekview component and its demo. `VW` ([#661](https://github.com/infor-design/enterprise-ng/issues/661))

## v6.3.0

### 6.3.0 Fixes

- `[Modal]` Merged SohoModalModule into SohoModalDialogModule keeping current API but fixing the memory leaks. `BTHH` ([#663](https://github.com/infor-design/enterprise-ng/pull/663))
- `[Datagrid]` Added sortFunction property to SohoDataGridColumn settings. ([#664](https://github.com/infor-design/enterprise-ng/issues/664))
- `[Datagrid]` Added `enableTooltips` Input to datagrid. `BTHH` ([#674](https://github.com/infor-design/enterprise-ng/pull/674))
- `[FileUpload]` Fixed duplicate change event. `TJM` ([#672](https://github.com/infor-design/enterprise-ng/pull/672))
- `[Treegrid]` Added Cube Viewer Demo. `AA` ([#694](https://github.com/infor-design/enterprise-ng/issues/694))

## v6.2.0

### 6.2.0 Fixes

- `[Datagrid]` Added rowTemplate / expandable row example. `TJM` ([#https://github.com/infor-design/enterprise-ng/issues/606](https://github.com/infor-design/enterprise-ng/pull/https://github.com/infor-design/enterprise-ng/issues/606))
- `[Modal]` Added a new SohoModalModule that would work almost similar to SohoModalDialogModule but fixes memory leak issues. `NBCP` ([#639](https://github.com/infor-design/enterprise-ng/pull/639))
- `[Datagrid]` Made the last two options on exportToExcel optional. Note that passing in a third option is incorrect and will give you no headers in the exported file, so generally shouldnt be used. `TJM` ([#654](https://github.com/infor-design/enterprise-ng/pull/654))
- `[Datagrid]` Added the row template type and an example of expandable rows. `TJM` ([#606](https://github.com/infor-design/enterprise-ng/pull/606))
- `[Datepicker]` Removed `autoSize` option, this was added for using calendar and is now no longer used. It Should not be used. keydown output EventEmitter. `NBCP` ([#660](https://github.com/infor-design/enterprise-ng/pull/660))
- `[Dropdown]` Added keydown output EventEmitter. `NBCP` ([#658](https://github.com/infor-design/enterprise-ng/pull/658))
- `[Datagrid]` Adding soho-icon-empty-uplift component. `MHH` ([#665](https://github.com/infor-design/enterprise-ng/issues/665))

## v6.1.0

### 6.1.0 Breaking Changes

### 6.1.0 Features

- `[General]` Adds 4.22 version of ids-enterprise. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Datepicker]` Added showToday setting. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Charts]` Added contextmenu event to all chart types. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Contextual Action Panel]` Added responsive break point settings. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Pager]` Added smallPageSizeSelector option to soho-standalone-pager. `PWP` ([#612](https://github.com/infor-design/enterprise-ng/pull/612))
- `[Tabs]` Added tabs module component sample page. `EA` ([#612](https://github.com/infor-design/enterprise-ng/issues/596))
- `[Modal]` Added responsive break point settings. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Wizard]` Added ability to show short labels on the wizard. `TJM` ([#637](https://github.com/infor-design/enterprise-ng/pull/637))
- `[Tabs]` Added tabs module component sample page. `EA` ([#612](https://github.com/infor-design/enterprise-ng/issues/596))
- `[DataGrid]` Added 'type' parameter to selected event to allow event handlers to determine the source action of the event. `BTHH` ([#646](https://github.com/infor-design/enterprise-ng/pull/646))
- `[DataGrid]` Added 'setHeaderCheckboxType' method to datagrid to allow clients to control the status of the selection checkbox. `BTHH` ([#646](https://github.com/infor-design/enterprise-ng/pull/646))

### 6.1.0 Chore & Maintenance

- `[Locale]` - Added typings support for the parseDate dateFormat parameter when defined as an object. `MAF` ([#640](https://github.com/infor-design/enterprise-ng/issues/640))

### 6.1.0 Fixes

## v6.0.0

### 6.0.0 Breaking Changes

- `[Autocomplete/Dropdown]` The filter options for startsWith have been split into two options, wordStartsWith and phaseStartsWith if using startsWith change to one of these two options, the original behavior of startsWith is wordStartsWith.  `TJM` ([#1606](https://github.com/infor-design/enterprise/issues/1606))

### 6.0.0 Features

- `[Calendar]` - Added eventToolTip, iconTooltip and callback for contextMenu. `VW` ([#614](https://github.com/infor-design/enterprise-ng/pull/614))
- `[General]` Upgraded @angular/cli (to 8.0.x) and @angular/core (to 8.0.x).  `BTHH` ([Pull Request 578](https://github.com/infor-design/enterprise-ng/pull/578))
    - support for Node 10.9.0+
    - support for TypeScript 3.4.x
    - `UPGRADING.md` has been updated with details on upgrading your application to angular 8.
- `[General]` Added all settings for ids-enterprise 4.20 and 4.2.1.  `TJM` ([#555](https://github.com/infor-design/enterprise-ng/pull/555))
- `[Checkbox]` Added option to render checkbox as a `switch`. `BTHH` ([#](https://))

### 6.0.0 Chore & Maintenance

- `[Datagrid]` - Added an example showing adding a new row on last cell and hitting enter and types for onKeyDown. `TJM` ([#536](https://github.com/infor-design/enterprise-ng/pull/536))
- `[Datepicker]` - Added support for the locale option. `MAF` ([#631](https://github.com/infor-design/enterprise-ng/issues/631))
- `[HomePage]` - Added `soho-homepage-sizer` directive to set the homepage's element height. `PWP` ([#571](https://github.com/infor-design/enterprise-ng/pull/571))
- `[HomePage]` - Added `refresh` method types to the homepage API. `TJM` ([#2632](https://github.com/infor-design/enterprise/pull/2632))

### 6.0.0 Fixes

- `[Alert]` - Fixed alert type of 'confirm' to 'success' to match breaking change made in EP. `MAF` ([#431](https://github.com/infor-design/enterprise-ng/issues/431))
- `[DataGrid]` - Expose groupRowFormatter in groupable settings. ([#558](https://github.com/infor-design/enterprise-ng/issues/558))
- `[InputValidate]` - Fixed event of 'confirm' to 'success' to match breaking change made in EP. `MAF` ([#431](https://github.com/infor-design/enterprise-ng/issues/431))
- `[Dropdown]` - Removed unused and deprecated reloadOnSource settings to reduce lint errors. ([#536](https://github.com/infor-design/enterprise-ng/issues/536))

## v5.5.0

### 5.5.0 Features

- `[ApplicationMenu]` - Added role switcher demo to application menu. `VW` ([#556](https://github.com/infor-design/enterprise-ng/issues/556))
- `[DataGrid]` - Added `isRowDisabled` support to DataGrid. `BTHH` ([#472](https://github.com/infor-design/enterprise/issues/472))
- `[Calendar]` - Added first cut of read only Calendar. `PWP` ([#534](https://github.com/infor-design/enterprise-ng/pull/534))

### 5.5.0 Fixes

- `[DataGrid]` - Added `center` option for `align` on `SohoDataGridColumnGroup`. `BTHH` ([#520](https://github.com/infor-design/enterprise-ng/issues/520))
- `[DataGrid]` - Added `commitCellEdit()` function to datagrid. `PWP` ([#551](https://github.com/infor-design/enterprise-ng/pull/551))
- `[DropDown]` - Ensured events are fired even when the component is not used with ngModel. `BTHH` ([#516](https://github.com/infor-design/enterprise/issues/516))
- `[Editor]` - Changed `soho-editor` to use `html()` rather than `.val()`, fixing change event. `BTHH` ([#516](https://github.com/infor-design/enterprise-ng/issues/516))
- `[FileUpload]` - Fixed memory leak `NBCP` ([#567](https://github.com/infor-design/enterprise/issues/567))
- `[DataGrid]` - Added `center` option for `align` on `SohoDataGridColumnGroup`. `BTHH` ([#520](https://github.com/infor-design/enterprise-ng/issues/520))
- `[Datagrid]` Fixed an issue where code-block editor focus was not working. ([#526](https://github.com/infor-design/enterprise-ng/issues/526))
- `[Field Options]` - Fixed an issue where example page was showing js error. ([#2348](https://github.com/infor-design/enterprise/issues/2348))
- `[Modal]` - Redundant `modal-dialog` markup removed on hash based route navigation. ([#308](https://github.com/infor-design/enterprise/issues/308))
- `[Message]` - Close method does not close dialog. ([#554](https://github.com/infor-design/enterprise-ng/pull/554))
- `[Popupmenu, MenuButton]` - Added `removeOnDestroy` to `popupmenu` and `menu-button` components. `PWP` ([#541](https://github.com/infor-design/enterprise/issues/541))
- `[Toast]` - Added draggable and savePosition options to toast message. `PWP` ([#563](https://github.com/infor-design/enterprise-ng/issues/563))
- `[Toolbar]` - Fix for memroy leak where .more button listeners were not being removed. `PWP` ([#560](https://github.com/infor-design/enterprise-ng/issues/560))

### 5.5.0 Chore & Maintenance

## v5.4.0

### 5.4.0 Features

- `[Column Chart]` - Added the ability to use both dynamic or simple string based tooltips. `PWP` ([#496](https://github.com/infor-design/enterprise-ng/issues/496))
- `[DataGrid]` - Added `getModifiers()` and `setSortIndicator()` functions to datagrid. `PWP` ([#495](https://github.com/infor-design/enterprise-ng/issues/495))
- `[Icon & Button]` - Added ability to set an extra class on the icon to set the color. `PWP` ([#498](https://github.com/infor-design/enterprise-ng/pull/498))
- `[Personalize]` - Changed soho-personalize directive to include theme and personalization color information. `PWP` ([#493](https://github.com/infor-design/enterprise-ng/pull/493))
- `[Personalize]` - Changed soho-personalize directive to include theme and personalization color information. `PWP` ([#493](https://github.com/infor-design/enterprise-ng/pull/493))
- `[StandAlonePager]` - Added attachPageSizeMenuToBody option often needed for mobile safari. `PWP` ([#522](https://github.com/infor-design/enterprise-ng/pull/522))

### 5.4.0 Fixes

- `[Datagrid]` - Adds a onBeforeSelect call back setting to the types. `TJM` ([#472](https://github.com/infor-design/enterprise-ng/issues/472))
- `[HomePage]` - remove element node (div) from widget title selector `PWP` ([#507](https://github.com/infor-design/enterprise-ng/pull/507))
- `[Icons]` - Change name of icon 'confirm' to 'success' to match breaking change made in EP. `PWP` ([#477](https://github.com/infor-design/enterprise-ng/pull/477)) See [EP 4.15.0 changelog](https://github.com/infor-design/enterprise/blob/master/docs/CHANGELOG.md#v4150-fixes) for more details.
- `[Keyboard]` - Adds a `Soho.keyboard.pressedKeys` to see what the currently pressed keys are. `TJM` ([#472](https://github.com/infor-design/enterprise-ng/issues/472))
- `[MenuButton]` - Adds attachToBody as an  input. `PWP` ([#519](https://github.com/infor-design/enterprise-ng/pull/519))

### 5.4.0 Chore & Maintenance

- `[Toolbar]` - Added flex toolbar with datagrid demo. `BTHH` ([#474](https://github.com/infor-design/enterprise-ng/issues/474))
- `[Locale]` - Modified locale initialisation to avoid loading issues. `BTHH` ([#485](https://github.com/infor-design/enterprise-ng/issues/485))

## v5.3.0

### 5.3.0 Features

- `[AppMenu]` - Added 'isPersonalizable' input for setting the is-personalization class on the EP app-menu element. `PWP`
- `[AppMenu]` - Added new events for accordion expansion that will include the element so it can be lazily loaded. `PWP` ([#434](https://github.com/infor-design/enterprise-ng/issues/434))
- `[AppMenu]` - Added new settings for application menu switcher expand/collapse. `VW` ([#443](https://github.com/infor-design/enterprise-ng/issues/443))
- `[Calendar]` - Hooked up new `eventClick` and `eventDblClick` event. `PWP` ([#542](https://github.com/infor-design/enterprise-ng/issues/542))
- `[DataGrid]` - Added 'resetColumns' and 'personalizeColumns' to the datagrid component. `BTHH` ([#413](https://github.com/infor-design/enterprise-ng/issues/413))
- `[DataGrid]` - Added 'entereditmode', 'exiteditmode' and 'beforeentereditmode' event outputs from component. `BTHH` ([#410](https://github.com/infor-design/enterprise-ng/issues/410))
- `[DataGrid]` - Added NG support for EP tooltip callback function . `PWP` ([#470](https://github.com/infor-design/enterprise-ng/pull/470))
- `[Datepicker]` - Adds an example to show custom validation to the datepicker test page. `TJM` ([#411](https://github.com/infor-design/enterprise-ng/issues/411)
- `[DemoApp]` - Added `PersonalizeMenuComponent` example. `BTHH` ([Pull Request 425](https://github.com/infor-design/enterprise-ng/pull/425))
- `[DemoApp]` - Added open status persistence to the demo's application menu. `BTHH` ([Pull Request 425](https://github.com/infor-design/enterprise-ng/pull/425))
- `[Mask]` - Respect `groupSize` and other settings of defined locale in Mask components. `PWP` ([Pull Request 468](https://github.com/infor-design/enterprise-ng/pull/468))
- `[PopupMenu]` - Added 'isIndented' to soho-popupmenu-item. `BTHH` ([#413](https://github.com/infor-design/enterprise-ng/issues/413))
- `[General]` - Added `data-ids-enterprise-ng-version` to the html tag on module startup. `BTHH` ([Pull Request 438](https://github.com/infor-design/enterprise-ng/pull/438))
- `[Notification]` - Added notification component wrapper. ([#461](https://github.com/infor-design/enterprise-ng/issues/461))

### 5.3.0 Fixes

- `[Icons]` - Reverted removal of `soho-icons-ext` to conform to semantic version conventions. `BTHH` ([#458](https://github.com/infor-design/enterprise-ng/pull/458)

### 4.3.0 Chore & Maintenance

- `[AppMenu]` - deprecated visibility event, use accordionExpand and accordionCollapse instead. `PWP` ([#434](https://github.com/infor-design/enterprise-ng/issues/434))

## v5.2.1

### 5.2.1 Fixes

- `[General]` - Bug fixes from updating to the latest ids-enteprise package `CRL` ([ids-enterprise@4.17.1](https://github.com/infor-design/enterprise/releases/tag/4.17.1)

## v5.2.0

### 5.2.0 Features

- `[DemoApp]` - Added ability to switch to beta of new uplift theme. NOTE: not yet to be included in your released application `PWP` ([#398](https://github.com/infor-design/enterprise-ng/issues/398))`
- `[IconsUplift]` - Added SohoIconsUpliftComponent to pull in uplift theme icons `PWP` ([#398](https://github.com/infor-design/enterprise-ng/issues/398))
- `[ListView]` - Added listview-custom-content demo to show content projected into a list view (not inside a .card) `PWP` ([Pull Request 384](https://github.com/infor-design/enterprise-ng/pull/384))
- `[ListView]` - Fixed an the `template` input because it was mapped to the wrong setting. `TJM` ([#406](https://github.com/infor-design/enterprise-ng/pull/406))
- `[ToolbarFlex]` Implemented the wrapper for the toolbar flex component. `MHH` ([Pull Request 316](https://github.com/infor-design/enterprise-ng/issues/316))
- `[Compact Form]` Implemented the wrapper for the compact form component. `TJM` ([1699](https://github.com/infor-design/enterprise-ng/issues/1699))
- `[Datagrid]` Added support for the beforerowactivated event. `TJM` ([1021](https://github.com/infor-design/enterprise-ng/issues/1699))
- `[Locale]` Added support for new api methods, for timezones, split locale and language, functions that run outside the current locale. `TJM` ([402](https://github.com/infor-design/enterprise-ng/issues/402))
- `[Locale]` Added support for the moved language location. This used to be in `Soho.Locale.cultures[this.locale]` now please use `Soho.Locale.extendTranslations`. `TJM` ([1552](https://github.com/infor-design/enterprise-ng/issues/1552))
- `[Form Compact]` Added support and directives and an eaxample of a reactive form for the new EP 4.17 Compact form styles. `TJM` ([1699](https://github.com/infor-design/enterprise-ng/issues/1699))

### 5.2.0 Fixes

- `[ListView]` - Added optional SohoListViewOptions arg to updated() function in listview.d.ts `PWP` ([Pull Request 384](https://github.com/infor-design/enterprise-ng/pull/384))
- `[Datagrid]` - Added hideable option to datagrid column typings. `MRW` ([Pull Request 408](https://github.com/infor-design/enterprise-ng/pull/408))

### 5.2.0 Chore & Maintenance

- `[IconsExt]` - Removed SohoIconsExtendedComponent as all icons are included in SohoIconsComponent `PWP` ([#398](https://github.com/infor-design/enterprise-ng/issues/398))
- `[General]` Updated to use Enterprise 4.17 release. `TJM` ([CHANGELOG](https://github.com/infor-design/enterprise/blob/master/docs/CHANGELOG.md))

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
- `[General]` Upgraded @angular/cli (to 7.3.2) and @angular/core (to 7.2.5). `BTHH` ([Pull Request 386](https://github.com/infor-design/enterprise-ng/pull/386))

### 5.1.0 Fixes

- `[Accordion]` - Fixed expand/collapse issue on initial load, icon was always showing a collapsed state. Fixed broken dynamic demo. `KOH` ([Pull Request 390](https://github.com/infor-design/enterprise-ng/pull/390))
- `[Accordion]` - refactored to use `ngZone` - This effects the constructor and how often change detection is called. `BTHH` ([Pull Request 290](https://github.com/infor-design/enterprise-ng/pull/290))
- `[ColorPicker]` - added configuration option for customColor to have the ability to input colors outside the allowed color options. `JT` ([Pull Request 301])
- `[DataGrid]` - changed emptyMessage setter so it will remove any empty message if passed a null or undefined. `PWP` ([Pull Request 305](https://github.com/infor-design/enterprise-ng/pull/305))
- `[DatePicker]` - remove configuration for customValidation. `JT` ([Pull Request 300])
- `[ListView]` - added safety checks for both `clearAllSelected()` and `toggleAll()` methods. `NBCP` ([Pull Request 364](https://github.com/infor-design/enterprise-ng/pull/364))
- `[TextArea]` - added configuration option for maxLength so it will have a restriction in maximum character input. `JT` ([Pull Request 302])
- `[TextArea]` - added configuration option for maxGrow so it will expand if the characters exceed the height of the textarea. `JT` ([Pull Request 302])
- `[TextArea]` - input events now cause ngModel update events to be fired. `BTHH` ([Pull Request 345](https://github.com/infor-design/enterprise-ng/pull/345))
- `[TrackDirty]` - added exportAs directive property.

### 5.1.0 Chore & Maintenance

- `[Accordion]` - Added `accordion-dynamic.demo` to show how to create dynamic contents. `BTHH` ([Pull Request 290](https://github.com/infor-design/enterprise-ng/pull/290))
    - 'accordion demo' is now a lazy loaded module.
- `[General]` - Upgraded @types\jquery to 3.3.24 and changed `JQuery.Event` to `JQuery.TriggeredEvent`. `BTHH`

## v5.0.0

### 5.0.0 Features

- `[General]` Upgraded @angular/cli (to 7.0.x) and @angular/core (to 7.0.x). `BTHH` ([Pull Request 227](https://github.com/infor-design/enterprise-ng/pull/227))
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

- [`General`] NPM package now compiled into the Angular Package Format. ([Pull Request 143](https://github.com/infor-design/enterprise-ng/pull/143)) `BTHH`
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
    - Refactored `soho-autocomplete.component.ts`, `soho-checkbox.component.ts`, `color-picker.component.ts`, `soho-datepicker.component.ts`, `soho-dropdown.component.ts`, `soho-editor.component.ts`, `soho-input.component.ts`, `soho-lookup.component.ts`, `soho-radiobutton.component.ts`, `soho-slider.component.ts`, `soho-spinbox.component.ts`, `soho-textarea.component.ts` and `soho-timepicker.component.ts`, to support `value`, `disabled` and `readonly`.
- `[Several]` Updated `timepicker` and `spinbox` to use `ngZone`. This effects the constructor so may effect those using AOT. `BTHH`
- `[Several]` Added `setSelected`, `getSelected`, and `toggleSelected` to all the charts that support selection. `SJW`
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

- `[FileUpload]` File upload component - Refactor to support directive usage `MAF` ([SOHO-7711](https://jira.infor.com/browse/SOHO-7711))
- `[EmptyMessage]` Allow soho-emptymessage projection in list view `MHH` ([SOHO-7756](https://jira.infor.com/browse/SOHO-7756))
- `[General]` Made last input components all ChangeDetectionStrategy.ONPUSH `PWP`
- `[General]` Added radar wrapper `TJM`
