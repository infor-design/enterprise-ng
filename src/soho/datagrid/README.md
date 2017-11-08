# SoHoXi Angular Component : DatsGrid

## Description

This component provides access from Angular to the SoHoXi `datagrid` control.

**Work in progress**

### Usage

## Inputs

The 'datagrid' component provides a number of options to control its behaviour, and presentation.

| Name | Description |
| --- | --- |

Changes to these properties will dynamically update the component.

## Outputs

This component fires the following events.

| Name | Description |
| --- | --- |

## Methods

| Name | Description |
| --- | --- |

## Examples



# Custom 'Angular' Cell Formatters

For more complex scenarios, support is available to use components as cell formatters.  This is done with two new properties on `SohoDataGridColumn`.

```typescript
{ id: 'price2', 
  name: 'Price (ng fmt)', 
  field: 'price',
  component: PriceCellFormatterComponent, 
  componentInputs: {} 
}
```

The `component` will provide the rendering for the cell when it is displayed.  

Access to the parameters passed to a standard JQuery formatter are provided as an optionally injectable service, called `args`.  You can also prime the component using the `componentInputs` settings, which assigns values to the components inputs at creation time. 


```typescript
@Component({
  template: '<p>{{args?.value?.price}}</p>'
})
export class PriceCellFormatterComponent {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {}
}
```

# NOTE

Remember to add the component to an accessible module, and as this component is dynamically created it must also be added to `EntryComponents`.

# Custom 'Angular' Cell Editors 

For more complex scenarios, support is available to use components as cell editors.  This is done with two new properties on `SohoDataGridColumn`.


```typescript
 {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    sortable: false,
    filterType: 'number',
    editorComponent: DemoCellInputEditorComponent,
    editorComponentInputs: {}
  }
  ```

The `editorComponent` will provide the rendering for the cell when it is edited.  

Access to the parameters passed to a standard JQuery editor are provided as an optionally injectable service, called `args`.  You can also prime the component using the `editorComponentInputs` settings, which assigns values to the components inputs at creation time. 

The component MUST implement the `SohoDataGridCellEditor` interface, which defines the contract needed to work as an editor.

```typescript
@Component({
  template: `<input [(ngModel)]="value" soho-input"/>`
})
export class DemoCellInputEditorComponent implements SohoDataGridCellEditor {
  @ViewChild(SohoInputComponent) input: SohoInputComponent;

  value: string;

  constructor( @Inject('args') public args: SohoDataGridPostRenderCellArgs) {
    this.value = args.value;
  }

  // @region Soho Editor Implementation

  val(value?: any) {
    if (value) {
      this.value = value;
    }
    return this.value;
  }

  focus() {
    this.input.focus();
  }
}
```
