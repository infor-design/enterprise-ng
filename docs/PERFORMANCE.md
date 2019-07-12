# Performance issues

## Menus where `attachToBody` setting is used

Setting `[attachToBody]="true"` on a menu also requires that you set `[removeOnDestroy]="true"`.

Using `attachToBody` is a requirement for menus when running on iOS/safari. But the issue is these menus keep getting created in the dom but never get cleaned up.
Using option of `[removeOnDestroy]="true"` will cause the menu elements to get cleaned up when destroyed.

*See:* datagrid-dynamic.demo.html for an example

```angular2html
<div *ngIf="displayContextMenu" class="popupmenu-wrapper" role="application" aria-hidden="true">
  <ul soho-popupmenu
    ...
    [attachToBody]="true"
    [removeOnDestroy]="true"
    ...
  >
    <li *ngFor="let item of menuItems">
      <a soho-popupmenu-label href="#">{{item.label}}</a>
    </li>
  </ul>
</div>
```
