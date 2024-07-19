# What's New with Enterprise-NG

## 18.1.0

## 18.1.0 Features

- `[Message]` Added info and success status option for message. ([#1698](https://github.com/infor-design/enterprise-ng/issues/1698))
- `[Datagrid]` Added setting called addCellLayoutClass option to remove datagrid-cell-layout from expandable rows. ([#1524](https://github.com/infor-design/enterprise-ng/issues/1524))
- `[Datagrid]` Added `searched` event for toolbar searchfield. ([EP#8814](https://github.com/infor-design/enterprise/issues/8814))

## 18.1.0 Fixes

- `[Datagrid]` Added all existing properties in `SohoDataGridCellChangeEvent`. ([#1199](https://github.com/infor-design/enterprise-ng/issues/1199))
- `[Datepicker]` Fixed readonly not updating when datepicker is in form. ([#1735](https://github.com/infor-design/enterprise-ng/issues/1735))
- `[Module Nav]` Fixed roles not being updated when changed before `AfterViewInit`. ([#1686](https://github.com/infor-design/enterprise-ng/issues/1677))
- `[Popupmenu]` Updated example page to test bug on popupmenu title. ([#1700](https://github.com/infor-design/enterprise-ng/issues/1700))
- `[Tabs]` Fix on `beforeCloseCallback` and updated example page. ([#1697](https://github.com/infor-design/enterprise-ng/issues/1697))

## 18.0.0

## 18.0.0 Fixes

- `[Card]` Added missing `selected` and `deselected` events. ([#1684](https://github.com/infor-design/enterprise-ng/issues/1684))
- `[Datepicker]` Fixed readonly state when called from disabled method. ([#1702](https://github.com/infor-design/enterprise-ng/issues/1702))
- `[Mask]` Fixed placeholder value being duplicated on number input. ([#1686](https://github.com/infor-design/enterprise-ng/issues/1686))
- `[Monthview]` Fixed `monthview` not updating after changing activeDate. ([#1659](https://github.com/infor-design/enterprise-ng/issues/1659))
- `[Monthview]` Fixed monthview not updating after changing activeDate. ([#1659](https://github.com/infor-design/enterprise-ng/issues/1659))
- `[Popupmenu]` Updated example page to fix multiselect. ([#8623](https://github.com/infor-design/enterprise-ng/issues/8623))

## 17.8.0 Notes

- `[General]` Added new dependencies and updated to NG 18. And made dependencies peer dependencies. ([#1705](https://github.com/infor-design/enterprise-ng/issues/1705))

## 17.8.0 Features

- `[ContextualActionPanel/Modal]` Added new settings `propagateStyle` and `compactPanel`. ([#1594](https://github.com/infor-design/enterprise-ng/issues/1594))
- `[Datagrid]` Updated example page to test personalize columns setting. ([EP#8138](https://github.com/infor-design/enterprise/issues/8138))

## 17.7.0

## 17.7.0 Features

- `[Card]` Added missing `selected` and `deselected` events. ([#1684](https://github.com/infor-design/enterprise-ng/issues/1684))
- `[Modal]` Added `buttonsetTextWidth` option to specify width of the `buttonset` text in the modal. ([EP#8639](https://github.com/infor-design/enterprise/issues/8639))

## 17.7.0 Fixes

- `[Dropdown]` Fixed setFocus method to work also when there is no label associated with the dropdown. ([#1673](https://github.com/infor-design/enterprise-ng/issues/1673))
- `[FieldFilter]` Fixed field filter reset method not clearing on NG. ([#1641](https://github.com/infor-design/enterprise-ng/issues/1641))
- `[Spinbox]` Updated type for step and fixed increase/decrease buttons not getting disabled when value passed with `ngControl` was matching min/max value. ([#1680](https://github.com/infor-design/enterprise-ng/issues/1680))

## 17.6.0

## 17.6.0 Features

- `[Button]` Added typings for generative button and updated example page. ([EP#8541](https://github.com/infor-design/enterprise/issues/8541))
- `[Lookup]` Added `placeholder` setting for filter `searchfield`. ([EP#8416](https://github.com/infor-design/enterprise/issues/8416))
- `[Module Nav]` Added `disableSwitcher` and `disabled` setting for Module Nav and Module Nav Switcher. ([EP#8381](https://github.com/infor-design/enterprise/issues/8381))
- `[Tabs]` Added `noFocus` parameter for selected method in Tabs component. ([#1647](https://github.com/infor-design/enterprise-ng/issues/1647))

## 17.6.0 Fixes

- `[Actionsheet]` Updated type in `actions` parameter. ([#1632](https://github.com/infor-design/enterprise-ng/issues/1632))
- `[Dropdown]` Added example page for `dropdown` with `width` and `maxWidth` settings. ([#1619](https://github.com/infor-design/enterprise-ng/issues/1619))
- `[Dropdown/Lookup]` Added `noMarginWrapper` setting for `dropdown` and `lookup` components. ([#8492](https://github.com/infor-design/enterprise/issues/8492))
- `[Tabs]` Fixed `beforeactivated` event not cancelling activation of tabs properly. ([#1578](https://github.com/infor-design/enterprise-ng/issues/1578))
- `[Timeline]` Updated example page of cards workspace. ([EP#8524](https://github.com/infor-design/enterprise/issues/8524))

## 17.5.0

## 17.5.0 Fixes

- `[ContextualActionPanel]` Added typings and definitions for detail contents. ([EP#8112](https://github.com/infor-design/enterprise/issues/8112))
- `[EmptyMessage]` Added missing empty state icons. ([#1636](https://github.com/infor-design/enterprise-ng/issues/1636))
- `[TabsModule]` Added setting `maxWidth` for tabs for long titles. ([EP#8017](https://github.com/infor-design/enterprise-ng/issues/8017))

## 17.4.0

## 17.4.0 Features

- `[Datagrid]` Added `disableTooltip` column setting. ([EP#8252](https://github.com/infor-design/enterprise/issues/8252))
- `[Lookup]` Added `cssClass` setting. ([EP#8206](https://github.com/infor-design/enterprise/issues/8206))
- `[Pager]` Added ability to set active page. ([#1571](https://github.com/infor-design/enterprise-ng/issues/1571))
- `[Tabs]` Added `validate` setting to disable/enable error icon. ([EP#8254](https://github.com/infor-design/enterprise/issues/8254))

## 17.4.0 Fixes

- `[BusyIndicator]` Added optional settings in the updated method. ([#1602](https://github.com/infor-design/enterprise-ng/issues/1602))
- `[Datagrid]` Added NG handle for hideContextualToolbar method. ([EP#8352](https://github.com/infor-design/enterprise/issues/8352))
- `[Pager]` Fixed dataset not updated correctly. ([#1554](https://github.com/infor-design/enterprise-ng/issues/1554))

## 17.1.0

### 17.1.0 Features

- `[Datagrid]` Added `multiselect` formatter and updated example page. ([#1573](https://github.com/infor-design/enterprise-ng/issues/1573))
- `[Tabs]` Fixed tabs item sortable and updated example page ([#1480](https://github.com/infor-design/enterprise-ng/issues/1480))

### 17.1.0 Fixes

- `[General]` Added 4.90 release
- `[Datagrid]` Added fix to button types and errors in wizard. ([#1598](https://github.com/infor-design/enterprise-ng/issues/1598))
- `[Datagrid]` Fixed tab key navigation when using actionable mode when having editor or formatter. ([EP#8141](https://github.com/infor-design/enterprise/issues/8141))
- `[Pie/Donut]` Fixed rendering issues when having bordered class in the widget. ([EP#8164](https://github.com/infor-design/enterprise/issues/8164))
- `[Tabs]` Fixed an error in tabs where it is not sortable. ([#1480](https://github.com/infor-design/enterprise-ng/issues/1480))

## 17.0.0

### 17.0.0 Features

- `[General]` Upgraded to Angular 17. See the "Introducing Angular v17" blog post for more information: <https://blog.angular.io/introducing-angular-v17-4d7033312e4b>. Also includes all 16.9.0 features ([#1589](https://github.com/infor-design/enterprise/issues/1589))

### 17.0.0 Fixes

- `[Datagrid]` Added example page to test bug when row updates on a cell with a custom component. ([#1564](https://github.com/infor-design/enterprise-ng/issues/1564))
- `[Toolbar]` Refresh toolbar when `updated` method is called. ([#1569](https://github.com/infor-design/enterprise/issues/1569))
- `[Wizard]` Added typings for the buttons input on the wizard's button bar, and also made the 'hidden' change backwardly compatible. ([#1598](https://github.com/infor-design/enterprise/issues/1598))

## 16.9.0

### 16.9.0 Features

- `[Datagrid]` Added ability for expandable and summary rows to be updated after cell update. ([#8058](https://github.com/infor-design/enterprise/issues/8058))
- `[Datagrid]` Added example page for vertical scroll in list style. ([#7879](https://github.com/infor-design/enterprise/issues/7879))
- `[Monthview]` Updated example page to showcase change of day in `monthview`. ([#1565](https://github.com/infor-design/enterprise-ng/issues/1565))
- `[TimePicker]` Fixed time picker to allow icon button to be clickable after reenabling. ([#1567](https://github.com/infor-design/enterprise-ng/issues/1567))
- `[General]` Added Enterprise 4.89.0 version

### 16.9.0 Fixes

- `[Datagrid]` Fix on dataset creating a new array on update. ([#7995](https://github.com/infor-design/enterprise/issues/7995))

## 16.8.0

### 16.8.0 Fixes

- `[Cards]` Fixed an issue with initialization. ([#7804](https://github.com/infor-design/enterprise/issues/7804))
- `[Datepicker]` Fixed readonly state when called from disabled method. ([#1540](https://github.com/infor-design/enterprise-ng/issues/1540))
- `[ModuleNav]` Added types for new mobile setting. ([#7804](https://github.com/infor-design/enterprise/issues/7804))

## 16.7.0

### 16.7.0 Fixes

- `[Modal]` Added type for icons. ([#1544](https://github.com/infor-design/enterprise-ng/issues/1544))
- `[ModuleNav]` Added `listcontextmenu` event. ([#7822](https://github.com/infor-design/enterprise/issues/7822))
- `[ModuleNav]` Changed targeting of `soho-accordion`` display rules. ([#1559](https://github.com/infor-design/enterprise-ng/issues/1559))

## 16.6.0

### 16.6.0 Fixes

- `[Datagrid]` Updated data type of cell in `drilldown` click event. ([EP#7473](https://github.com/infor-design/enterprise/issues/7473))
- `[Dropdown]` Fixed icons not rendering properly in Dropdown. ([#1425](https://github.com/infor-design/enterprise-ng/issues/1425))
- `[Popupmenu]` Added Example for `Multiselect` and `Singleselect`. ([EP#7556](https://github.com/infor-design/enterprise/issues/7556))
- `[Datagrid]` Added tooltipOptions for Column Settings. ([EP#7473](https://github.com/infor-design/enterprise/issues/7473))
- `[Module Nav]` Add `enableOutsideClick` for collapse/hide of menu when content is clicked. ([EP#7786](https://github.com/infor-design/enterprise/issues/7786))
- `[Module Nav Switcher]` Added noSearch setting to pass through to nav switcher ([#1535](https://github.com/infor-design/enterprise-ng/issues/1535))

## 16.5.0

### 16.5.0 Fixes

- `[Homepage/Widget]` Added card settings in widget component. ([#1502](https://github.com/infor-design/enterprise-ng/issues/1502))
- `[Module Nav Switcher]` Improve Angular/EP component lifecycle. ([#1477](https://github.com/infor-design/enterprise-ng/issues/1477))
- `[Datepicker]` Added custom validation for Date picker component. ([#1512](https://github.com/infor-design/enterprise-ng/issues/1512))
- `[Datagrid]` Added missing headerTooltip setting. ([#1514](https://github.com/infor-design/enterprise-ng/issues/1514))

## 16.4.1

### 16.4.1 Fixes

- `[General]` Added 4.84.0 EP version.
- `[Module Nav]` Add Module Nav Component wrappers and replace the app menu with the Module Nav menu. ([#1477](https://github.com/infor-design/enterprise-ng/issues/1477))
- `[Images]` Added an example page for Image with click handler. ([EP#7007](https://github.com/infor-design/enterprise/issues/7007))
- `[Lookup]` Updated example page for `datagrid` editor. ([#7403](https://github.com/infor-design/enterprise/issues/7403))
- `[General]` Added 4.84.0 EP version.
- `[General] Added 4.84.0 EP version.
- `[ProcessIndicator]` Added process indicator demo. ([EP#7583](https://github.com/infor-design/enterprise/issues/75837007))

## 16.3.1

### 16.3.1 Features / Fixes

- `[Weekview]` Added stacked view wrapper and example. ([#7373](https://github.com/infor-design/enterprise/issues/7373))
- `[Card]` Added new settings and typings for card component. ([#7379](https://github.com/infor-design/enterprise/issues/7379))
- `[General]` Added new NG 16 to the library. ([1481](https://github.com/infor-design/enterprise/issues/1481))

## 15.4.8

### 15.4.8 Features

- `[General]` Added 4.84.5 version.

## 15.4.7

### 15.4.7 Features

- `[General]` Added 4.84.4 version.

## 15.4.5

### 15.4.5 Features

- `[General]` Added 4.84.3 version.
- `[Module Nav]` Add more module nav fixes. ([#1522](https://github.com/infor-design/enterprise-ng/pull/1522))
- `[Module Nav]` Add more module nav fixes. ([#1519](https://github.com/infor-design/enterprise-ng/pull/1519))

## 15.4.2

### 15.4.2 Features

- `[General]` Added 4.84.1 version.
- `[Homepage/Widget]` Added card settings in widget component. ([#1502](https://github.com/infor-design/enterprise-ng/issues/1502))
- `[Module Nav]` Add Module Nav Component wrappers and replace the app menu with the Module Nav menu. ([#1477](https://github.com/infor-design/enterprise-ng/issues/1477))
- `[Module Nav Switcher]` Improve Angular/EP component lifecycle. ([#1477](https://github.com/infor-design/enterprise-ng/issues/1477))
- `[Datepicker]` Added custom validation for `Datepicker` component. ([#1512](https://github.com/infor-design/enterprise-ng/issues/1512))
- `[Datagrid]` Added missing headerTooltip setting. ([#1514](https://github.com/infor-design/enterprise-ng/issues/1514))

## 15.4.1

### 15.4.1 Features

- `[General]` Added 4.84.1 version.
- `[Misc]` Fixed readonly bindings ([EP#1466](https://github.com/infor-design/enterprise/issues/1466))

## 15.3.0

### 15.3.0 Fixes

- `[ApplicationMenu]` Changed the app menu hamburger icon. ([1470](https://github.com/infor-design/enterprise/issues/1470))
- `[Modal]` Added Example Page with `Datepicker`. ([EP#7144](https://github.com/infor-design/enterprise/issues/7144))
- `[Pager]` Fixes a bug hiding and showing the page size selector. ([#1459](https://github.com/infor-design/enterprise/issues/1459))
- `[Textarea]` Added Example Page with `Textarea` Toggle Dirty. ([#1429](https://github.com/infor-design/enterprise-ng/issues/1429))
- `[Timepicker]` Added `Timepicker` in Example Page of Validator. ([#1435](https://github.com/infor-design/enterprise-ng/issues/1435))
- `[Tooltip]` Added settings for popover `appendTo` settings. ([EP#7220](https://github.com/infor-design/enterprise/issues/7220))

## 15.1.0

### 15.1.0 Features

- `[General]` Added 4.81.0 version.

## 15.0.5

### 15.0.5 Features

- `[Arrange]` Added a directive/wrapper for arrange component. ([#1432](https://github.com/infor-design/enterprise-ng/issues/1432))
- `[General]` Added 4.80.3 with patches

### 15.0.5 Fixes

- `[Notification]` Fixed notification throws errors when `closeAll` and `closeLatest`. ([#7276](https://github.com/infor-design/enterprise/issues/7276))

## 15.0.4

### 15.0.4 Features

- `[General]` Fixed angular version problem

## 15.0.3

### 15.0.3 Features

- `[General]` Added 4.80.2 with patches

## 15.0.2

### 15.0.2 Features

- `[General]` Added 4.80.1 with patches

## 15.0.1

### 15.0.1 Breaking Changes

- `[Icons]` The `SohoIconsEmptyComponent` can now be configured to use one of `"colorful"`, `"classic"` or `"new"` icons. By default, the newly added `"colorful"` icons will be used. To revert to the classic icons, applications must explicitly configure this:

```html
<soho-icons-empty icons="classic"></soho-icons-empty>
```

### 15.0.0 Features

- `[Chart]` Added example page for chart colors. ([EP#7084](https://github.com/infor-design/enterprise/issues/7084))
- `[Datagrid]` Added a setting to set the color of the header in `datagrid` (`dark` or `light`). ([#7008](https://github.com/infor-design/enterprise/issues/7008)) `EA`
- `[General]` Updated to NG 15 d made small fixes. See the `UPGRADING.md` guide for details. ([#1316](https://github.com/infor-design/enterprise-ng/issues/1316))
- `[Icons]` Merge old, new and "colorful" empty state icons into `SohoIconsEmptyComponent`, with the ability to force the use of colorful icons. ([#1418](https://github.com/infor-design/enterprise-ng/issues/1418))

### 15.0.0 Fixes

- `[Datepicker]` Added empty string value check in `datepicker` range. ([#1397](https://github.com/infor-design/enterprise-ng/issues/1397))

## 14.8.2

### 14.8.2 Features

- `[General]` Added 4.80.2 with patches

### 14.8.1 Features

- `[General]` Added 4.80.1 with patches

## 14.8.0

### 14.8.0 Features

- `[General]` Added 4.80.0 with new colors for header, buttons and tabs.

## 14.7.0

### 14.7.0 Features

### 14.7.0 Fixes

- `[Accordion]` Added example page to test accordion bug. ([EP#6820](https://github.com/infor-design/enterprise/issues/6820))
- `[Datagrid]` Remove unnecessary role on `datagrid`. ([#1378](https://github.com/infor-design/enterprise-ng/issues/1378))
- `[Datagrid]` Added Example Page for Add Row in `Datagrid`. ([EP#6730](https://github.com/infor-design/enterprise/issues/6730))
- `[Datagrid]` Added events from built-in pager. ([EP#1419](https://github.com/infor-design/enterprise-ng/issues/1419))
- `[Datagrid]` Fixed a bug in `datagrid` where flex toolbar is not properly destroyed. ([#1423](https://github.com/infor-design/enterprise-ng/issues/1423))
- `[Pager]` Added dataset option in pager. ([#1389](https://github.com/infor-design/enterprise-ng/issues/1389))

## 14.4.0

## 14.4.0 Features

- `[Datagrid]` Added `rowspan` in `datagrid` column setting. ([#1353](https://github.com/infor-design/enterprise-ng/issues/1353))
- `[Datagrid]` Added `fileupload` formatter in `datagrid`. ([#1372](https://github.com/infor-design/enterprise-ng/issues/1372))
- `[Pager]` Added show page selector input setting. ([#1350](https://github.com/infor-design/enterprise-ng/issues/1350))

### 14.4.0 Fixes

- `[Popupmenu]` Updated `popupmenu` demo for getSelected() example. ([#1349](https://github.com/infor-design/enterprise-ng/issues/1349))
- `[Textarea]` Updated `textarea` demo for enabling disabling example. ([EP#6773](https://github.com/infor-design/enterprise/issues/6773))

## 14.3.0

### 14.3.0 Features

- `[Calendar]` Add a setting for calendar to show and hide the legend. ([EP#6533](https://github.com/infor-design/enterprise/issues/6533))
- `[Datagrid]` Fixed a bug in `datagrid` where calling `updated` no longer worked. ([#6783](https://github.com/infor-design/enterprise/issues/6783))
- `[Datagrid]` Fixed a bug in `datagrid` where setting gridOptions no longer worked. ([#6783](https://github.com/infor-design/enterprise/issues/6783))
- `[Modal]` Update example page to test full size. ([#1358](https://github.com/infor-design/enterprise-ng/issues/1358))

### 14.3.0 Fixes

- `[Button]` Added notification badges for buttons with labels. ([#1347](https://github.com/infor-design/enterprise-ng/issues/1347))

## 14.2.0

### 14.2.0 Fixes

- `[Button]` Added setting `iconAlign` for right side icon buttons. Fixed a regression where all buttons changed the icons to the right side instead of the left. ([#1340](https://github.com/infor-design/enterprise-ng/issues/1340))
- `[Datagrid]` Added setting `timeFormat` for `datagrid` column model. ([#1333](https://github.com/infor-design/enterprise-ng/issues/1333))
- `[Datagrid]` Added `ariaDescribedBy` setting in the `datagrid` column. ([#6530](https://github.com/infor-design/enterprise/issues/6530))
- `[Datepicker]` Fixes error when legend is set before the calendar is opened. ([#1345](https://github.com/infor-design/enterprise-ng/issues/1345))
- `[Popdown]` Updated example page to test click outside event. ([#1304](https://github.com/infor-design/enterprise-ng/issues/1304))
