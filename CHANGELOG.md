## <a name="version-master">master</a>

### Fixes

- `[Component]` Example note item for future release. `INI` ([#88](https://github.com/infor-design/enterprise-ng/issues/88))

## <a name="version-4.7.0">4.7.0</a>

### <a name="version-4.7.0-features">Features</a>

- `[General]` Upgraded to latest angular/cli release (6 `BTH`
- `[Tag]` Added Tag support `BTH`
- `[General]` The new package is now available open sourced on ([npmjs](https://www.npmjs.com/package/ids-enterprise-ng)) , the new package name is `ids-enterprise-ng`
* `[Datagrid]` 4.0 Datagrid filter expose the filterWhenTyping setting `MHH` ([SOHO-7851](https://jira.infor.com/browse/SOHO-7851))

### <a name="version-4.7.0-fixes">Fixes</a>

- `[ColorPicker]` Updated colorpicker to use ngZone and added a few missing settings. This effects the constructor so may effect those using AOT. `TJM`
- `[Svg]` Fixed 'svg' file inclusion `BTH`

### <a name="version-4.7.0-chores">Chore & Maintenance</a>

- `[Several]` Refactored `soho-busy-indicator.directive.ts`, `soho-button.component.ts` , `soho-context-menu.directive.ts`,
  `soho-expandablearea.component.ts`, `soho-popupmenu.component.ts`, `soho-tabs.component.ts`, and `soho-toolbar.component.ts` added backward compatible `registerForEvents` input to indicate which events should be hooked up from the angular component/directive to it's soho jquery counterpart. `PWP`


## <a name="version-4.6.0">4.6.0</a>

### <a name="version-4.7.0-fixes">Fixes</a>

- `[FileUpload]`  File upload component - Refactor to support directive usage `MAF` ([SOHO-7711](https://jira.infor.com/browse/SOHO-7711))
- `[EmptyMessage]` Allow soho-emptymessage projection in list view `MHH` ([SOHO-7756](https://jira.infor.com/browse/SOHO-7756))
- `[General]` Made last input components all ChangeDetectionStrategy.ONPUSH `PWP`
- `[General]` Added radar wrapper `TJM`
