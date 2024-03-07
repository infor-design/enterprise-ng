# Infor Design Enterprise Angular Component : Tag

## Description

This component provides access from Angular to the `ids-tag` web component control.

### Web Component Usage (Recommended)

(See Web Component Docs)[https://github.com/infor-design/enterprise-wc/blob/main/src/components/ids-tag/README.md]

### Angular Usage

To add a `soho-tag` to a component requires adding the module `SohoTagModule` into the hosting component. If you
have included the top level Soho module then this will be already included.

Tags are simple span elements with the class `tag`. They can be mixed in with other elements like lists, grids and search fields.

## Methods

| Name | Description |
| --- | --- |
| updated() | updates the settings (deprecated doesn't do anything) |

## Events

| Name | Description |
| --- | --- |
| beforeRemoveTag | Fires before the tag is removed from it's container. |
| afterRemoveTag | Fires after the tag has been removed from it's container. |
| click | Fires when a dismissible tag has been clicked. |

## Example

Web Component Example

```html
<ids-tag-list>
  <ids-tag>#Tagged</ids-tag>
  <ids-tag color"secondary">#Tagged</span>
  <ids-tag color="error">Delayed</ids-tag>
  <ids-tag color="success">Open Order</span>
  <ids-tag color="warning">Help Order</ids-tag>
  <ids-tag clickable="true">#Clickable</ids-tag>
  <ids-tag dismissible="true">#Dismissible</ids-tag>
</ids-tag-list>
```

Angular example:

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
