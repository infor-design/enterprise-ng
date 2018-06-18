# SoHoXi Angular Component : DataGrid

This component provides access from Angular to the SoHoXi `datagrid` control.

This component searches for an element with the attribute `soho-datagrid` in the parent's DOM tree, initialising it with
the Soho datagrid control.  The data is provided either by a component input or an implementation
of the DataGridService interface, by specifying an implementation on the hosting component, i.e.

## Angular Services

| Name | Description |
| --- | --- |
| providers | A injectable service (derived from DataGridService) that can provide the rows and columns for the datagrid. |

### Usage

## Inputs

The 'datagrid' component provides a number of options to control its behaviour, and presentation.

| Name | Description |
| --- | --- |
| gridOptions | Gets/Sets the grid options for the data grid, marking this components as requiring a full rebuild at the end of the change lifecycle. |
| idProperty | Defines which property in the data rows is to be used as the id of each row of the data. |
| cellNavigation | True if cell navigation is enabled; otherwise false if not. |
| rowNavigation | Changes the row navigation setting of the data grid. If rowNavigation is "false” then a border is not displayed around the row. |
| alternateRowShading | If true, turns on alternate row shading otherwise no shading is applied if false. |
| dataset | The data to be displayed provided as an array of json objects compatible with the column meta data provided. |
| columnReorder | If true the columns can be reorders; otherwise if false they are fixed. |
| editable | If true allows editing of cells in the data grid, otherwise if false editing is disabled. |
| isList | If true, displays the grid like a list. |
| menuId | TBC |
| rowHeight | Sets the row height in the data grid to be 'normal', 'medium' or 'short'. |
| selectable | If true selection can be used, other if false selection is disabled. |

Changes to these properties will dynamically update the component.

## Outputs

This component fires the following events.

| Name | Description |
| --- | --- |

## Methods

| Name | Description |
| --- | --- |

### Examples

## Custom 'Angular' Cell Formatters

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

Access to the parameters passed to a standard JQuery formatter are provided as an optionally injectable service, called `args`.
You can also prime the component using the `componentInputs` settings, which assigns values to the components inputs at creation time.

```typescript
@Component({
  template: '<p>{{args?.value?.price}}</p>'
})
export class PriceCellFormatterComponent {
  constructor(@Inject('args') public args: SohoDataGridPostRenderCellArgs) {}
}
```

**Note:** Remember to add the component to an accessible module, and as this component is dynamically created it must also be added to `EntryComponents`.

## Custom 'Angular' Cell Editors

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
