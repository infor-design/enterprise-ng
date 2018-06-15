# SoHoXi Angular Component : ListView

## Description

This component provides access from Angular to the SoHoXi `listview` JQuery control.

The `listview` controls allow users to select an item from a list of items.

### Usage

To add a `listview` to a component requires adding the module `SohoListViewModule` into the hosting component.  If you have included the top level SoHo module them this will be included already.

In the markup for the hosting component add:

```html
<soho-listview>
  <li soho-listview-item>
    <p soho-listview-header>Item Header</p>
    <p soho-listview-subheader>Item SubHeader</p>
    <p soho-listview-micro>Item Detail</p>
  </li>
</soho-listview>
```

## Properties

| Name | Description |
| `selectedItems` | Returns an array of numbers, based on the index position of the selected items in the listview. |
| `sorted` | Returns an array of numbers, based on the index position of the selected items in the listview. |

## Methods

| Name | Description |
| --- | --- |
| `remove(index | index[])` | Remove the item(s) at the given index (or indices) from the listview. |
| `select(index | index[])` | Select the item(s) at the given index (or indices) from the listview. |
| `unselect(index | index[])` | Deselect the item(s) at the given index (or indices) from the listview. (Deprecated) use deselect. |
| `deselect(index | index[])` | Deselect the item(s) at the given index (or indices) from the listview. |
| `toggleAll()` | Toggles the current selection of all items. |
| `clearAllSelected()` | Deselects all the selected items. |

## Events

| Name | Description |
| --- | --- |
| `sorted` | Fired when the list is sorted. |
| `selected` | Fired when a row is selected. |
| `unselected` | Fired when a row is deselected. |
| `deselected` | Fired when a row is deselected. |
| `activated` | Fired when a row is activated in mixed selection mode. |
| `deactivated` | Fired when a row is deactivated in mixed selection mode. |
| `rendered` | Fired when the items are rendered, passing the dataset displayed. |

## Examples

### Simple List View Component

This example shows a simple `listview` component with a search field

```html
<div soho-listview-search *ngIf="searchable && !searchfieldRef"></div>
<div soho-listview-search *ngIf="searchable && searchfieldRef" [buildSearch]="false">
  <ng-content select="input[soho-searchfield]"></ng-content>
</div>
<ng-content select="div.[soho-listview-search]"></ng-content>
<ng-content select="soho-toolbar.contextual-toolbar,div.[soho-toolbar].contextual-toolbar"></ng-content>
<div #listview [class]="listClass">
  <ul>
    <ng-content select="li[soho-listview-item]"></ng-content>
  </ul>
</div>
```
