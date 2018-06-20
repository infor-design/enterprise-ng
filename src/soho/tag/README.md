# Infor Design Enterpriise (SohoXi) Angular Component : Tag

## Description

This component provides access from Angular to the `tag` JQuery control.

### Usage

To add a `tag` to a component requires adding the module `SohoTagModule` into the hosting component. If you
have included the top level Soho module then this will be already included.

Tags are simple span elements with the class `tag`. They can be mixed in with other elements like lists, grids and search fields. You can optionally add a few classes to add color or status such as `error` for red, `good` to be green and `alert` for yellow. Since you should not use color alone to indicate state, this should be either supplemented with off-screen labels or visual labels near the element explaining the state.

## Methods

| Name | Description |
| --- | --- |
| updated() | updates the settings |

## Events

| Name | Description |
| --- | --- |
| beforeRemoveTag | Fires before the tag is removed from it's container. |
| afterRemoveTag | Fires after the tag has been removed from it's container. |
| click | Fires when a tag has been clicked. |

## Example

For example:

```html
<div soho-tag-list>
  <span soho-tag>#Tagged</span>
  <span soho-tag="secondary">#Tagged</span>
  <span soho-tag="error"><span class="audible">Error</span>Delayed</span>
  <span soho-tag="good">Open Order</span>
  <span soho-tag="alert"><span class="audible">Alert</span>Help Order</span>
  <a href="#" soho-tag [isClickable]="true">#Clickable</a>
  <a href="#" soho-tag [isDismissible]="true">#Clickable</a>
</div>
```
