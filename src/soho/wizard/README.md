# SoHoXi Angular Component : Wizard

## Description

This component provides access from Angular to the SoHoXi `wizard` JQuery control.

Note: the current SoHo widget is not fullt functional, and provides only the visual header ticks, so this control attempts to provide the minimum functionality to implement a working wizard component.

### Usage

To add a `wizard` to a component requires adding the module `SohoWizardModule` into the hosting component.  If you have included the top level SoHo module them this will be included already.

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
| `ticks` | ticks items ! NOT SUPPORTED AT THIS TIME ! |

## Methods

| Name | Description |
| --- | --- |
| `last()` | Moves to the last step. |
| `finish()` | Moves to the last step and marks the wizard as complete. |
| `next()` | Moves to the next step. |
| `previous()` | Moves to the previous step. |

## Events

| Name | Description |
| --- | --- |
| `` | . |

## Examples

### Simple List View Component

This example shows a simple `wizard` component with a set of steps

```html


```
