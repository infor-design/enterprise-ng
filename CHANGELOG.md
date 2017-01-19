## 4.2.5 - Minor Release
Release Date: 2016-10-31

### Whats New
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
 - Upgraded to angular 2.4.X

### Breaking Changes

* 2017-05-01 - KH
      
     SohoToolbarComponent
     
    `@Output() menuItemClicked` is deprecated. Use `@Output() selected`
  
* 2016-17-11 - KH - PR-189 
    
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
