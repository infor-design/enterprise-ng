# SoHoXi Angular Component : Actionsheet

## Description

This component provides a simple, mobile-friendly list of available contextual actions.

In Desktop settings, Action Sheets are represented by Popupmenus. However, Action Sheet components can be configured to instead display a mobile-friendly view of this menu, which appears to roll out from the bottom of the viewport, and can easily be selected by touch.

### Usage

To add an `actionsheet` to a component requires adding the module `SohoActionsheetModule` into the hosting component.

In the markup for your angular component, simply add elements name `soho-actionsheet` in a div tag and add data for the `SohoActionSheetActions` interface. You can pass that to a setting `action` to show the button actions of the actionsheet in smaller viewport. Inside of it, you need to add the `soho-button` for the trigger element. e.g.,

```html
<div
  soho-actionsheet
  [actions]="actions">
  <button
    soho-button="tertiary"
    icon="more"
    data-init="false"
    ></button>
</div>
```

```typescript
actions: SohoActionsheetActions[] = [
  { icon: 'mail', text: 'Email' },
  { icon: 'user-profile', text: 'Go to Profile' },
  { icon: 'workflow', text: 'Share' },
  { icon: 'user-status-do-not-disturb', text: 'Remove' }
];
```

## inputs

The `actionsheet` component provides a number of options to contol its behaviour, and presentation.

| Name | Description |
| --- | --- |
| `actions` | Object | Provides the data (`icon`, and `text`) of the action button. |
| `attributes` | Object | Add extra attributes like id's to the toast element. For example `attributes: { name: 'id', value: 'my-unique-id' }`. |
| `showCancelButton` | Boolean | Add an extra cancel button to the actionsheet. |
| `autoFocus` | Boolean | If false the focus will not focus the first list element. (At the cost of accessibility). |
| `breakpoint` | String | Ability to display the actionsheet define in the breakpoint option. See breakpoints in utils. |
| `displayAsActionSheet` | String or Boolean | It will shows the actionsheet on `responsive`, `always` or not (false). |
| `overlayOpacity` | Number | The opacity of the overlay. Default is `0.7`. |
| `onSelect` | Function | Callback, invoked when an action is clicked. |
| `onCancel` | Function | Callback, invoked when the cancel button is clicked. |
| `tray` | Boolean | If true, it will show the tray button on top of the button actions. |
| `trayOpts` | Object | Its the object of tray options that can be used to change the background color, text, and icon of the tray. |

## Methods

| Name | Description |
| --- | --- |
| `open` | Opens the Action Sheet |
| `openPopupMenu` | Opens a simple Popupmenu containing the same actions as the sheet. |
| `destroy` | Tears down and removes any added markup and events. |
| `updated` | Triggers a UI Resync. |

## Examples

### Actionsheet with Tray Component

This example shows a simple `actionsheet` with tray component.

```html
<div class="row top-padding">
  <div class="twelve columns">
    <div class="field">
      <div soho-actionsheet
        [actions]="actions"
        [tray]="true"
        [trayOpts]="trayOpts"
        [breakpoint]="breakpoint"
        [attributes]="attributes">
        <button soho-button="tertiary"
          icon="more"
          data-init="false">
        </button>
      </div>
    </div>
  </div>
</div>
```
