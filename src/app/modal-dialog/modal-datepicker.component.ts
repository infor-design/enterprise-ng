import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/**
 * This is an example of a simple dialog component, that can be instantiated
 * numerous times using the SohoModalDialogService.
 */
@Component({
  templateUrl: 'modal-datepicker.component.html'
})
export class ModalDatepickerComponent implements OnInit {
  filtersForm!: FormGroup;

  searchableColumns: any[] = [
    {
      columnId: 'column1',
      columnName: 'Search',
      filterType: 'text',
      options: '',
    },
    {
      columnId: 'column2',
      columnName: 'Option',
      filterType: 'select',
      options: [
        {
          label: 'Option1',
          selected: false,
          value: 'Value1',
        },
        {
          label: 'Option2',
          selected: false,
          value: 'Value2',
        },
        {
          label: 'Option3',
          selected: false,
          value: 'Value3',
        },
        {
          label: 'Option4',
          selected: false,
          value: 'Value4',
        },
      ],
    },
    {
      columnId: 'column3',
      columnName: 'Option',
      filterType: 'select',
      options: [
        {
          label: 'Option1',
          selected: false,
          value: 'Value1',
        },
        {
          label: 'Option2',
          selected: false,
          value: 'Value2',
        },
        {
          label: 'Option3',
          selected: false,
          value: 'Value3',
        },
        {
          label: 'Option4',
          selected: false,
          value: 'Value4',
        },
      ],
    },
    {
      columnId: 'column1',
      columnName: 'Date',
      filterType: 'date',
      options: '',
    },
  ];

  constructor() { }

  ngOnInit() {
    this.filtersForm = this.setFiltersForm();
  }

  setFiltersForm(): FormGroup {
    const group: any = {};

    this.searchableColumns.forEach((searchableColumn) => {
      if (searchableColumn.filterType === 'select') {
        var optionIndex = searchableColumn.options.findIndex(
          (option: any) => option.value === searchableColumn.value
        );
        group[searchableColumn.columnId] = new FormControl('');
      } else {
        group[searchableColumn.columnId] = new FormControl('');
      }
    });

    return new FormGroup(group);
  }
}
