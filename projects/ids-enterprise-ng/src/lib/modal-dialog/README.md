# SoHoXi Angular Component : Modal

## Description

This component provides access from Angular to the SoHoXi `modal` JQuery control.

Modal dialogs allow users to enter a few key pieces of information without moving to a different page or task.

### Usage

Creating modal dialogs requires the injection of the service `SohoModalDialogService` into the hosting component.
To access this service, you will need to inject `SohoModalDialogService` into the constructor of the relevant class.
If this is a class managed by Angular (such as a Component) then adding the following will work:

```typescript
constructor(private modalService: SohoModalDialogService) {
}
```

Angular requires a placeholder component to parent the
dialog component when it is instantiated.  The location of the component
is up to the calling application, but in this example the hosting component
is used.

```typescript
@ViewChild('dialogPlaceholder', { read: ViewContainerRef }) placeholder: ViewContainerRef;
```

In the markup for the hosting component add:

```html
<!-- div #dialogPlaceholder will contain the child component -->
<div #dialogPlaceholder></div>
```

To open the dialog, the `modal` is called on the `SohoModalDialogService`, as follows:

```typescript
this.dialog = this.modalService
  .modal(ExampleModalDialogComponent, this.placeholder)
  .open();
```

This returns a typed implementation of `SohoModalDialogRef`.

**NOTE:**  Angular needs to be able to find the dynamic dialog component for it to be able to
instantiate it, so you **MUST** add the component into the *entryComponents* of the hosting
module. For example:

```typescript
@NgModule({
  declarations: [ ExampleModalDialogComponent ],
  exports: [],
  imports: [ ..., SohoComonentsModule ],
  providers: [],
  entryComponents:[ ExampleModalDialogComponent ]
  ]
})
export class ExampleModuleDialogModule {}
```

## Methods

| Name | Description |
| --- | --- |
| `modal` | Creates a modal dialog, under the placeholder, based on the given component. |
| `message` | Creates a modal dialog using the html (or jQuery) content |

## SohoModalDialogRef

| Name | Description |
| --- | --- |
| `open()` | Opens the dialog. |
| `apply((c: T) => void)` | Executes the given function, with the instantiated component instance as an argument.  This is allow the concrete component to be interacted with. |
| `close(boolean)` | Closes the modal dialog, if open.  The dialog is not closed fully until the 'afterClosed' event is fired. |
| `options(SohoModalOptions)` | Applies the given Soho options to the modal, overrides all options. |
| `frameHeight(number)` | Sets the extra frame height for the dialog. |
| `title(string)` | Sets the title for the dialog. |
| `buttons(SohoModalButton[])` | Sets the button to use for the modal dialog. |
| `id(string)` | Sets the element id for the modal dialog. |
| `trigger(SohoModalTriggerType)` | Sets the trigger for the modal dialog. |
| `isAlert(boolean)` | Sets the isAlert option - controls the styling and assessibility. |
| `content(string | JQuery)` | Defines the content of the dialog, if not using an Angular component. |
| `cssClass(string)` | Extra CSS for the markup . |
| `autoFocus(boolean)` | Auto Focus the dialog. TBC |
| `beforeOpen(() => boolean)` | 'Registers a 'beforeOpen' callback, which can veto open. |
| `afterOpen(Function)` | 'Registers an 'afterOpen' callback. |
| `opened(Function)` | 'Registers an 'opened' callback - before the dialog is opend. |
| `beforeClose((dialogRef: SohoModalDialogRef<T>) => boolean)` | 'Registers a 'beforeClose' callback, which can veto the close. |
| `afterClose(Function)` | 'Registers an 'afterClose' callback. |
| `closed(Function)` | 'Registers a 'closed' callback - before dialog is closed. |
| `beforeDestroy(() => boolean))` | 'Registers a 'beforeDestroy' guard - vetoing the destruction. USE WITH CARE! |

## Events

| Name | Description |
| --- | --- |

## Examples

### Simple Modal dialog

This example show how a simple modal dialog component can be instantiated.

```typescript
  this.dialog = this.modalService
    .modal<ModalDialogComponent>(ModalDialogComponent, this.placeholder)
    .buttons([{text: 'OK', click: () => { this.dialog.close(); }, isDefault: true}])
    .title('My Dialog')
    .open());
```

### Simple Message dialog

```typescript
openMessage() {
  this.dialog = this.modalService
    .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
    .buttons([{text: 'Submit', click: () => { this.dialog.close(); }, isDefault: true}])
    .title('Confirmation')
    .open();
}
```

### Setting the dialog result

Setting the `dialogResult` can be achieved in several ways, the simpliest is to
use the `close` method on `SohoModalDialogRef` in your button handler, which takes the
dialog result as an argument.  This is set on the dialog reference and then passed into
the `afterClose` event handler.

Alternatively, you can call the `setDialogResult` method on the dialog reference, which
also takes a dialog result as an argument.  This allow the closing of the dialog to be
decoupled from the result.

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

To provide access to any model present on the underlying dialog component, a reference to
this component is passed to the `beforeClose`, `closed` and `afterClose` callbacks.  This
reference can then be used to interogate the public properties of that `dialogComponent`.

```typescript
dialogRef.afterClose((result: any, ref: SohoModalDialogRef<ExampleModalDialogComponent>, dialogComponent: ExampleModalDialogComponent) => {
  console.log(dialogComponent.model.someProperty);
});
```

Access to the `dialogComponent` is also possible from the `SohoModalDialogRef` using the `componentDialog` property.

### Vetoable Closure using 'beforeClose'

To veto the closure of a modal dialog, the `SohoModalDialogRef` calls the `beforeClose` guard function.  If this function returns `false`
the dialog will not be closed.  The `beforeClose` guard can be configured on a modal (or message) dialog. In this example, the closure of
the dialog is allowed if the underlying model is valid or the dialogResult has been set to 'CANCEL' (in the cancel button).

```typescript
this.modalService
  .modal(ExampleModalDialogComponent, this.placeholder)
  .buttons([
     { text: 'Cancel', click: () => { dialogRef.close('CANCEL'); } },
     { text: 'Submit', click: () => { dialogRef.close('SUBMIT'); }, isDefault: true }])
  .beforeClose( (dialogRef) => dialogRef.dialogComponent.isModelValid || dialogRef.dialogResult === 'CANCEL' );
  .open();
```

The `beforeClose` guard function is defined as follows:

```typescript
(dialogRef: SohoModalDialogRef<T>) => boolean;
```

Alternatively, the dialog component can implement the `SohoModalDialogVetoableEventGuard`
interface, see the application demos for an example.

### Using `apply` to set values on the dialog instance

To allow the public properties and methods of a dialog to be accessed as
part of the dialog creation process, the `apply` method exists on `SohoModalDialogRef`
to allow the caller full access to the instance of the given component before
(or after) it is displayed, for example:

```typescript
this.modalService
  .modal(ExampleModalDialogComponent, this.placeholder)
  .buttons(buttons)
  .apply((c) => { c.value = 'Hello World!'; })
  .open();
  ```

The apply methods takes a function, with the following prototype:

```typescript
(component: T) => void
```

where T is the type of the dialog component.
