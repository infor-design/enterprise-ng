# SohoModalModule

## Description

This module provides Angular access to the SoHoXi `modal` JQuery control.

Modals allow users to view/enter information without moving to a different page or task.

## Usage

Creating modals requires the injection of the service `SohoModalService` into the hosting component.
To access this service, you will need to inject `SohoModalService` into the constructor of the relevant class.

```typescript
constructor(private modalService: SohoModalService) {
}
```

To open the dialog, call the `modal()` and `open()` method from `SohoModalService`, as follows:

```typescript
this.dialog = this.modalService
  .modal(ExampleModalDialogComponent)
  .open();
```

This returns a typed implementation of `SohoModalRef`.

**NOTE:**  Angular needs to be able to find the passed component into the `modal()` method.
So you **MUST** add the component into the *entryComponents* of the hosting module. For example:

```typescript
@NgModule({
  declarations: [ ExampleModalDialogComponent ],
  imports: [ SohoComponentsModule ],
  entryComponents: [ ExampleModalDialogComponent ]
})
export class ExampleModuleDialogModule {}
```

## Methods

### SohoModalService

| Name | Description |
| --- | --- |
| `modal<T>(component: ModalComponent<T>, settings = {} as SohoModalOptions)` | Creates a modal dialog intance that contains the given component |
| `message<T>(content: string, settings = {} as SohoModalOptions)` | Creates a modal dialog using the string content |

### SohoModalRef

| Name | Description |
| --- | --- |
| `open()` | Opens the dialog. |
| `apply(fn: (component: T) => void)` | Executes the given function, with the instantiated component instance as an argument.  This is allow the concrete component to be interacted with. |
| `close(dialogResult?: any)` | Closes the modal dialog, if open.  The dialog is not closed fully until the 'afterClosed' event is fired. |
| `options(options: SohoModalOptions)` | Applies the given Soho options to the modal, overrides all options. |
| `frameHeight(frameHeight: number)` | Sets the extra frame height for the dialog. |
| `title(title: string)` | Sets the title for the dialog. |
| `buttons(buttons: SohoModalButton[])` | Sets the button to use for the modal dialog. |
| `id(id: string)` | Sets the element id for the modal dialog. |
| `trigger(trigger: SohoModalTriggerType)` | Sets the trigger for the modal dialog. |
| `isAlert(isAlert: boolean)` | Sets the isAlert option - controls the styling and assessibility. |
| `content(content: string | JQuery)` | Defines the content of the dialog, if not using an Angular component. |
| `cssClass(cssClass: string)` | Extra CSS for the markup . |
| `autoFocus(autoFocus: boolean)` | Auto Focus the dialog. TBC |
| `opened(eventFn: Function)` | 'Registers an 'opened' callback - before the dialog is opened. |
| `afterOpen(eventFn: Function)` | 'Registers an 'afterOpen' callback. |
| `closed(eventFn: Function)` | 'Registers a 'closed' callback - before dialog is closed. |
| `afterClose(eventFn: (result: any))` | 'Registers an 'afterClose' callback that gets the dialog result. |
| `beforeOpen(() => boolean)` | 'Registers a 'beforeOpen' callback, which can veto open. USE WITH CARE! |
| `beforeClose(() => boolean)` | 'Registers a 'beforeClose' callback, which can veto the close. |
| `beforeDestroy(() => boolean))` | 'Registers a 'beforeDestroy' guard - vetoing the destruction. USE WITH CARE! |

## Examples

### Simple Modal dialog

This example show how a simple modal dialog component can be instantiated.

```typescript
  this.dialog = this.modalService
    .modal(ModalDialogComponent)
    .buttons([
      {
        text: 'OK',
        click: () => { this.dialog.close(); },
        isDefault: true
      }
    ])
    .title('My Dialog')
    .open();
```

### Simple Message dialog

```typescript
openMessage() {
  this.dialog = this.modalService
    .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
    .buttons([
      {
        text: 'Submit',
        click: () => { this.dialog.close(); },
        isDefault: true
      }
    ])
    .title('Confirmation')
    .open();
}
```

### Setting the dialog result

Setting the `dialogResult` can be achieved in several ways, the simpliest is to
use the `close` method on `SohoModalRef` in your button handler, which takes the
dialog result as an argument.  This is set on the dialog reference and then passed into
the `afterClose` event handler.

Alternatively, you can also set it via the `dialogResult` public property of your `SohoModalRef` instance.
This allow the closing of the dialog to be decoupled from the result.

The `dialogResult` could be the _model_ used by the underlying component, or a simple status
indicator, such as `OK` or `CANCELLED`.

Here is an example for a simple message returning a status as a result:

```typescript
openMessage() {
  const dialog = this.modalService
    .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
    .buttons(
      [{ text: 'No', click: () => { dialog.close('I pressed YES'); } },
       { text: 'Yes', click: () => { dialog.close('I pressed NO'); }, isDefault: true }])
    .title(this.title)
    .open()
    .afterClose(result => {
      console.log(`The result was ${result}`);
    });
}
```

### Vetoable Closure using 'beforeClose'

To veto the closure of a modal dialog, the `SohoModalRef` calls the `beforeClose` guard function.  If this function returns `false`
the dialog will not be closed.  The `beforeClose` guard can be configured on a modal (or message) dialog. In this example, the closure of
the dialog is allowed if the underlying model is valid or the dialogResult has been set to 'CANCEL' (in the cancel button).

```typescript
this.dialogRef = this.modalService
  .modal(ExampleModalDialogComponent)
  .buttons([
     { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
     { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
  .beforeClose(() => this.dialogRef.dialogComponent.isModelValid || this.dialogRef.dialogResult === 'CANCEL' );
  .open();
```

`beforeOpen` and `beforeDestroy` also works in a similar manner.

### Using `apply` to set values on the dialog instance

To allow access to the dialog component's public methods and properties, the `apply` method grants
access to the instance of the given component before (or after) it is displayed, for example:

```typescript
this.modalService
  .modal(ExampleModalDialogComponent)
  .buttons(buttons)
  .apply((c) => { c.value = 'Hello World!'; })
  .open();
```

The apply methods takes a function, with the following prototype:

```typescript
(component: T) => void
```

where T is the type of the component.
Alternatively, you can also access the component via the `componentDialog` property.

```typescript
this.dialogRef = this.modalService
  .modal(ExampleModalDialogComponent)
  .buttons(buttons);
...
this.dialogRef.componentDialog.value = 'Hello World!';
...
this.dialogRef.open();
```
