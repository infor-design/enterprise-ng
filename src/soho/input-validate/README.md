# SohoXi Angular Component : Input Validation

## Description

This directive provides access from Angular to the SohoXi `validate` JQuery control.

The `validate` control can execute the internal or custom Validation rules on an element or on a form.

### Usage

To add a `validate` to a component requires adding the module `SohoInputValidate` into the hosting component. If you
have included the top level Soho module then this will be included already.

The `validate` control can be used at the form level and at the element level. One reason an application would want to
use form level validation is to reduce the number of listeners for the `error` and `valid` events; listening at a higher
level is more efficient than listening at each input element.

For form level validation, add the following on the hosting component:

```angular2html
<form
  soho-input-validate (error)="onError($event)" (valid)="onValid($event)">
  ...
</form>
```

For element level validation, add the following on the hosting component:

```angular2html
<input
  soho-input-validate (error)="onError($event)" (valid)="onValid($event)">
```

## Methods

| Name | Description |
| --- | --- |

## Events

| Name | Description |
| --- | --- |
| error | Fires when a validation rule evaluates as an error for a field |
| valid | Fires when a validation rule evaluates as valid for a field |

## Example

### Simple form-level validation

This example shows how validation can be used on a simple form using the `validation-form-event` demo as a starting point.
It uses `Form Group` and `Form Control` to handle form state and does not use a `Validator` on the `Form Control`.

#### Template

Add the `soho-input-validate` directive to the `form` element.

```angular2html
<form [formGroup]="form"
  soho-input-validate (error)="onError($event)" (valid)="onValid($event)"
>
  ...
</form>
```

For each required field, add the `required` attribute for the `soho-label` component on the `label` element. For this example,
the model for each field contains the required property.

```angular2html
<label soho-label [required]="model.AlphaField.required" for="AlphaField">AlphaField</label>
```

For each required field, add the `data-validate` attribute containing the validation rule to be executed to the `input` element.
For this example, the `required` validation rule is being executed. The demo has expanded the `data-validate` attribute by
using the `isRequired()` method to set the attribute value.

```angular2html
<input id="AlphaField" name="AlphaField" formControlName="AlphaField"
  [(ngModel)]="model.AlphaField.value" data-validate="required"
  soho-trackdirty (pristine)="onPristine($event)" (dirty)="onDirty($event)" (afterResetDirty)="onAfterResetDirty($event)"
>
```

#### Code

Add the two `soho-input-validate` events. For this example, the events will update the corresponding `Form Control` either
setting or removing the error state using the `formControlName` attribute for the key to the `Form Control`. In this case,
the demo is only concerned about the error state of the form and not the actual error message. Applications that are
concerned about the error message could easily set the error message on the Form Control.

```typescript
onError(event: SohoInputValidateEvent) {
  this.form.controls[ event.validation.field.getAttribute('formControlName') ].setErrors({ 'inError': true });
}

onValid(event: SohoInputValidateEvent) {
  this.form.controls[ event.validation.field.getAttribute('formControlName') ].setErrors(null);
}
```

Build the `model` and `Form Group`. For this example, the `model` and `Form Control`s are created in one method for
convenience as they share the same key.

```typescript
private buildModel() {
  // build model and form group
  const group: { [key: string]: any } = [];

  Object.keys(this.dataView).map((item, index, ary) => {
    const required = this.dataView[ item ].required;

    this.model[ item ] = {
      value:    this.dataView[ item ].value,
      required: required
    };

    group[ item ] = new FormControl('');
  });

  this.form = new FormGroup(group);
  this.changeDetector.detectChanges();
}
```

Add the form state checks to enable or disable the `Save` button. For this example, the `Save` button is enabled when the
form is `valid` **and** when the form is `dirty`. Some applications may need to have either all or some of their validation
executed on the server and therefore will not need to check the form validity.

```typescript
get disableSave(): boolean {
  if (this.form.valid && this.form.dirty) {
    // enables save button
    return null;
  }

  // disables save button
  return true;
}
```

#### Testing

Using the `validation-form-event` demo, test the validation by placing focus in the AlphaField and then tabbing through
the form. For each field that has a required indicator and no value, a `Required` error should display. The Status under
each field should properly indicate its state. The `Save` button should remain disabled.

Change or remove the values on the fields. Changing a value should change the state from `pristine` to `dirty`; removing a
value should change the state from `valid` to `invalid`; putting the original value in place should change the state from
`dirty` to `pristine`.

Once all required fields have values and their Status is `dirty` and `valid`, the `Save` button should enable.

Changing or adding a `required` property in the `dataView` object should be reflected when the form reloads.

### Possible future topics

- Using a custom validator (Soho Xi)
- Using a Form Control Validator (ValidatorFn)
- Using soho-error with soho-input-validate
