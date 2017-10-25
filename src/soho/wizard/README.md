# SoHoXi Angular Component : Wizard

## Description

This component provides access from Angular to the SoHoXi `wizard` JQuery control.

Note: the current SoHo widget is not fully functional, and provides only the visual header ticks, so this control attempts to provide the minimum functionality to implement a working wizard component.

### Usage

To add a `wizard` to a component requires adding the module `SohoWizardModule` into the hosting component.  If you have included the top level SoHo module then this will be included already.

In the markup for the hosting component add:

```html
<div soho-wizard>
  <div soho-wizard-header>
    <a soho-wizard-tick tickId="step-1" current="true">One</a>
  </div>
  <div soho-wizard-pages>
    <div soho-wizard-page tickId="step-1">
    </div>
  </div>
  <div soho-wizard-buttonbar>
  </div>
</div>
```

## Properties

| Name | Description |
| `ticks` | ticks items ! NOT SUPPORTED |
| `currentTickId` | provides the id for the currently selected tick |
| `beforeActivate` | function to call before a tick is acivated to allow the transition to be vetoed. |

## Methods

| Name | Description |
| --- | --- |
| `finish()` | Moves to the last step and marks the wizard as complete. |
| `first()` | Moves to the first step, if possible. |
| `hasFinished()` | Has the wizard finished. |
| `hasNext()` | Does the wizard have a next step. |
| `hasPrevious()` | Does the wizard have a previous step. |
| `last()` | Moves to the last step, if possible. |
| `next()` | Moves to the next step, if possible. |
| `previous()` | Moves to the previous step, if popssible. |
| `reset()` | Resets the wizard. |

## Events

| Name | Description |
| --- | --- |
| `activated` | This event is fired when the step is activated. |
| `afteractivated` | This event is fired after the step has been activated. |

## Examples

### Simple Wizard Component

This example shows a simple `wizard` component with a set of steps

```html
<div class="full-width full-height scrollable-flex">
  <div soho-wizard (afteractivated)="onActivated($event)">
    <div soho-wizard-header>
      <a soho-wizard-tick tickId="select-files" current="true">Select Files</a>
      <a soho-wizard-tick tickId="target-folder">Target Folder</a>
      <a soho-wizard-tick tickId="backup-rule">Backup Rule</a>
      <a soho-wizard-tick tickId="validation-rule">Validation Rule</a>
      <a soho-wizard-tick tickId="confirmation">Confirmation</a>
      <a soho-wizard-tick tickId="result" disabled="true">Result</a>
    </div>
    <div soho-wizard-pages>
      <div soho-wizard-page tickId="select-files" style="overflow:  hidden;">
        <demo-select-files-page></demo-select-files-page>
      </div>
      <div soho-wizard-page tickId="target-folder">
        <demo-target-folder-page></demo-target-folder-page>
      </div>
      <div soho-wizard-page tickId="backup-rule">
        <demo-backup-rule-page></demo-backup-rule-page>
      </div>
      <div soho-wizard-page tickId="validation-rule">
        <p>Page 4</p>
      </div>
      <div soho-wizard-page tickId="confirmation">
        <p>Page 5</p>
      </div>
      <div soho-wizard-page tickId="result">
        <demo-result-page></demo-result-page>
      </div>
    </div>
    <div soho-wizard-buttonbar>
    </div>
  </div>
</div>
```
