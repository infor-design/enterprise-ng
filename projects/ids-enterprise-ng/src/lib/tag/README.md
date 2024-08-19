# phnx-tag

## Description

This component provides access from Angular to the `tag` component. Tags are UI embellishments that are used to label, categorize and organize keywords surrounding some contextual element such as a form.

To add a `tag` to a component requires adding the module `PhnxTagModule` into the hosting component. If you
have included the top level Soho module then this will be already included.

Tags are simple span elements with the class `tag`. They can be mixed in with other elements like lists, grids and search fields.

## Import

```js
import { PhnxTagComponent } from 'ids-enterprise-ng';
```

## Use Cases

 Note that the tags and badges look the same but should not be used interchangeably. A badge is used mainly for alphanumeric values i.e. numbers currency ect. and should not cannot take an icon or text. For text information you can use use a tag. For icons use an icon or status icon or alert icon.

- Use when the content on your page is mapped into multiple categories and does not only fit into one hierarchical category.
- Use when you want users to contribute data to your website and let them organize their content themselves.

## Dos and Don'ts

- Overcrowd your content with tags, so people can see the items clearly.
- Don't use too many tags in order to use them clearly to capture what its tagging.

## Terminology

- **Tag**: A UI embellishments for classification
- **Clickable/Dismissible**: Tag can be closed and removed with an X button
- **Classification**: How tags are labelled with colors and text
- **Disabled**: Tag can be disabled so it cannot be followed or clicked.

## Features (With Code Examples)

A normal tag used with a component directive.

```html
<phnx-tag>#Tagged</phnx-tag>
```

The older / previous way to do this is still supported.

```html
<span phnx-tag="info">Secondary Tag</span>
<span type="info">Information Tag</span>
```

A colored tag is done by adding the `type` attribute and one of the following: secondary, error, success, caution or a hex color beginning with a # character. Formerly this was done with `phnx-tag="success"` so this is still supported but not as clean when using a component directive.

```html
<phnx-tag type="secondary">Secondary Tag</ids-tag>
```

The Tag component also has a related component called Tag List, it can be used to layout tags in a list of tags for showing classifications. It adds a bit of margin before and after and on sides. And can listen to dismiss events.

```html
<div phnx-tag-list (afterRemove)="afterRemove($event)">
  <phnx-tag href="#" [isDismissible]="true">#Dismissible</phnx-tag>
</div>
```

## Settings (Inputs)

| Name | Type | Description |
| --- | ---  | --- |
| isClickable | boolean | Turns on the functionality to make the tag clickable like a link |
| isDismissible | boolean | Turns on the functionality to add an (x) button to clear remove the tag |
| disabled | boolean | Disables the tag |
| type/phnx-tag | string | Sets the color to a internal color such as `blue` or may be a hex starting with a `#` |

## Events

| Name | Description |
| --- | --- |
| beforeRemoveTag | Fires before the tag is removed from it's container. |
| afterRemoveTag | Fires after the tag has been removed from it's container. |
| click | Fires when a tag has been clicked (if the tag does not have href='#'). |

## Methods

| Name | Description |
| --- | --- |
| updated() | updates the settings |

## Keyboard Guidelines

- <kbd>Tab/Shift+Tab</kbd>: If the tab is focusable this will focus or unfocus the tag.
- <kbd>Backspace / Alt+Del</kbd>: If the tag is dismissible then this will remove the tag.
- <kbd>Enter</kbd>: If the tag is clickable then this will follow the tag link.

## Responsive Guidelines

- Flows with padding and margin within the width and height of the parent container. Possibly scrolling as needed based on parent dimensions.

## Converting from Previous Versions (Breaking Changes)

**4.x to 5.x**

- Added ability to use a component directive `<phnx-tag>Text</phnx-tag>`.
- Add ability to set a type attribute for color `<phnx-tag type="error">Text</phnx-tag>`

## Regional Considerations

Labels should be localized in the current language. The close and link icons will flip to the alternate side in Right To Left mode. Consider that in some languages text may be a lot longer (German). And in some cases it cant be wrapped (Thai).
