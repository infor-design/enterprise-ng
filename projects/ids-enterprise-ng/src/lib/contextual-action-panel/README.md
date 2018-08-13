# SoHoXi Angular Component : Contextual Action Panel

## Description

This component provides access from Angular to the SoHoXi `contextualactionpanel` JQuery control.

Contextual Action Panel allow users to enter a few key pieces of information without moving to a different page or task.

### Usage

Creating contextual action panels requires the injection of the service `SohoContextualActionPanelService` into the hosting component.
To access this service, you will need to inject `SohoContextualActionPanelService` into the constructor of the relevant class.
If this is a class managed by Angular (such as a Component) then adding the following will work:

```typescript
constructor(private contextualActionPanelService: SohoContextualActionPanelService) {
}
```

Angular requires a placeholder component to parent the
panel component when it is instantiated.  The location of the component
is up to the calling application, but in this example the hosting component
is used.

```typescript
@ViewChild('panelPlaceholder', { read: ViewContainerRef }) placeholder: ViewContainerRef;
```

In the markup for the hosting component add:

```html
<!-- div #panelPlaceholder will contain the child component -->
<div #panelPlaceholder></div>
```

To open the panel, the `panel` is called on the `SohoContextualActionPanelService`, as follows:

```typescript
this.panel = this.contextualActionPanelService
  .panel(ExampleContexutualActionPanelComponent, this.placeholder)
  .open();
```

This returns a typed implementation of `SohoContextualActionPanelRef`.

**NOTE:**  Angular needs to be able to find the dynamic panel component for it to be able to
instantiate it, so you **MUST** add the component into the *entryComponents* of the hosting
module. For example:

```typescript
@NgModule({
  declarations: [ ContexutualActionPanelComponent],
  exports: [],
  imports: [ ..., SohoComponentsModule ],
  providers: [],
  entryComponents:[ ContexutualActionPanelComponent]
  ]
})
export class ContexutualActionPanelModule {}
```

## Methods

| Name | Description |
| --- | --- |
| `panel` | Creates a contextual actioni panel under the placeholder, based on the given component. |

## SohoContextualActionPanelRef

| Name | Description |
| --- | --- |
| `apply((c: T) => void)` | Executes the given function, with the instantiated component instance as an argument.  This is allow the concrete component to be interacted with. |
| `open()` | Opens the panel. |
| `close(boolean)` | Closes the contextual action panel, if open.  The panel is not closed fully until the 'afterClosed' event is fired. |
| `options(Sohocontextual action panelOptions)` | Applies the given Soho options to the contextual action panel, overrides all options. |
| `id(string)` | Sets the element id for the contextual action panel. |
| `title(string)` | Sets the title for the contextual action panel. |
| `buttons(Sohocontextual action panelButton[])` | Sets the button to use for the contextual action panel. |
| `content(string | JQuery)` | Defines the content of the panel, if not using an Angular component. |
| `trigger(Sohocontextual action panelTriggerType)` | Sets the trigger for the contextual action panel. |
| `beforeOpen(() => boolean)` | 'Registers a 'beforeOpen' callback, which can veto open. |
| `afterOpen(Function)` | 'Registers an 'afterOpen' callback. |
| `opened(Function)` | 'Registers an 'opened' callback - before the panel is opend. |
| `closed(Function)` | 'Registers a 'closed' callback - before panel is closed. |
| `beforeClose(() => boolean)` | 'Registers a 'beforeClose' callback, which can veto close. |
| `afterClose(Function)` | 'Registers an 'afterClose' callback. |
| `beforeDestroy(() => boolean))` | 'Registers a 'beforeDestroy' guard - vetoing the destruction. USE WITH CARE! |

## Examples

### Contextual Action Panel

This example show how a simple contextual action panel component can be instantiated.

```typescript
  this.panel = this.contextualActionPanelService
    .panel(contextualActionPanelComponent, this.placeholder)
    .buttons([{text: 'OK', click: () => { this.panel.close(); }, isDefault: true}])
    .title('My Panel')
    .open());
```

### Using `apply` to set values on the panel instance

To allow the public properties and methods of a panel to be accessed as
part of the panel creation process, the `apply` method exists on `SohoContextualActionPanelRef`
to allow the caller full access to the instance of the given component before
(or after) it is displayed, for example:

```typescript
this.contextualActionPanelService
  .panel(ContexutualActionPanelComponent, this.placeholder)
  .buttons(buttons)
  .apply((c) => { c.value = 'Hello World!'; })
  .open();
  ```

The apply methods takes a function, with the following prototype:

```typescript
(component: T) => void
```

where T is the type of the panel component.
