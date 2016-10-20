# Soho Angular Component : Modal

## Description

This component provides acess from Angular to the Soho `modal` JQuery control.

Modal dialogs allow users to enter a few key pieces of information without moving to a different page or task. 

### Usage

Creating modal dialogs required the injection of the service `SohoModalDialogService` into the hosting component. To access 
this service, you will need to inject `SohoModalDialogService` into the constructor of the relevant class. If 
this is a class managed by Angular (such as a Component) then adding the following will work:

```typescript
constructor(private modalService: SohoModalDialogService) {
}
```
   
Angular requires a placeholder component to parent the 
dialog component when it is instantiated.  The location of the component 
is up to the calling application, but in this example the hosting componenent
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

This returns a typed implemtation of `SohoModalDialogRef`.



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
| `beforeClose(() => boolean)` | 'Registers a 'beforeClose' callback, which can veto close. |
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
this.modalService
  .modal(ModalDialogComponent, this.placeholder)
  .buttons([{text: 'OK', 
        click: (e, modal) => { modal.close(true); }, isDefault: true}
      ])
  .title('My Dialog')
  .open());
```

### Simple Message dialog

```typescript
openMessage() {
  this.modalService
    .message('<span class="longer-message">Are you sure you want to delete this page?</span>')
    .buttons([{text: 'Submit', click: (e, modal) => { modal.close(true); }, isDefault: true}])
    .title('Confirmation')
    .open();
}
```

### Using `apply` to set values on the dialog instance.

To allow the public properties and methods of a dialog to be accessed as
part of the dialog creation process, the `apply` method exists on SohoModalDialogRef to allow the caller full access to the instance of the given component before (or after) it is displayed, 
for example:

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







