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


## Methods

| Name | Description |
| --- | --- |


| Name | Description |
| --- | --- |
| `selectedItems` | Returns an array of numbers, based on the index position of the selected items in the listview. |

## Events

| Name | Description |
| --- | --- |

## Examples

### Simple List View Component

This example show how a simple `listview` component.

```typescript
  
```




