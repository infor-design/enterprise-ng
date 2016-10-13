## 4.2.2 - Minor Release
Release Date: 2016-10-31

### Whats New
* 2016-10-13 - TH - PR-XXX
 - added typings for listview and splitter.
 - SohoListViewComponent now uses Soho Control defaults for 'options'
 

### Breaking Changes
* 2016-10-10 - TH - PR-118
    refactored SohoGridColumn -> SohoDataGridColumn
    refactored SohoSourceRequest -> SohoDataGridSourceRequest
    removed SohoDataGridConfiguration merged into SohoDataGridOptions
    refactored SohoResponseFunction -> SohoDataGridResponseFunction
    removed SohoDatagridSource (abstract class) for source functions
