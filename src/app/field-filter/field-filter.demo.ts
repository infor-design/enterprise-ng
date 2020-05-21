import { Component } from '@angular/core';

/**
 * This example shows basic field filter functionality on input elements
 */
@Component({
  selector: 'app-field-filter-demo',
  templateUrl: 'field-filter.demo.html'
})
export class FieldFilterDemoComponent {

  public model = {
    text: {
      value: 'text',
      filterType: 'equals'
    },
    dropdown: {
      value: '',
      filterType: 'equals'
    },
    multiselect: {
      value: '',
      filterType: 'equals'
    },
    lookup: {
      value: '',
      filterType: 'equals'
    },
    date: {
      value: '',
      filterType: 'equals'
    },
    dateRange: {
      value: '',
      filterType: 'equals'
    }
  };

  public filterSettings: SohoFieldFilterSettings = {
    dataset: [
    { value: 'equals', text: 'Equals', icon: 'filter-equals' },
    { value: 'does-not-equal', text: 'Does Not Equal', icon: 'filter-does-not-equal' },
    { value: 'less-than', text: 'Less Than', icon: 'filter-less-than' },
    { value: 'less-equals', text: 'Less Or Equals', icon: 'filter-less-equals', selected: true },
    { value: 'greater-than', text: 'Greater Than', icon: 'filter-greater-than' },
    { value: 'greater-equals', text: 'Greater Or Equals', icon: 'filter-greater-equals' }]
  };

  public fieldDropdownDataSet = [
    { value: 'equals', text: 'Equals', icon: 'filter-equals' },
    { value: 'does-not-equal', text: 'Does Not Equal', icon: 'filter-does-not-equal' },
    { value: 'less-than', text: 'Less Than', icon: 'filter-less-than' },
    { value: 'less-equals', text: 'Less Or Equals', icon: 'filter-less-equals', selected: true },
    { value: 'greater-than', text: 'Greater Than', icon: 'filter-greater-than' },
    { value: 'greater-equals', text: 'Greater Or Equals', icon: 'filter-greater-equals' }
  ];

  public filterOperator = 'equals';

  public filterSettingsWithRange: SohoFieldFilterSettings = {
    dataset: [
    { value: 'equals', text: 'Equals', icon: 'filter-equals' },
    { value: 'in-range', text: 'In Range', icon: 'filter-in-range' },
    { value: 'does-not-equal', text: 'Does Not Equal', icon: 'filter-does-not-equal', selected: true },
    { value: 'less-than', text: 'Less Than', icon: 'filter-less-than' },
    { value: 'less-equals', text: 'Less Or Equals', icon: 'filter-less-equals' },
    { value: 'greater-than', text: 'Greater Than', icon: 'filter-greater-than' },
    { value: 'greater-equals', text: 'Greater Or Equals', icon: 'filter-greater-equals' }]
  };

  public dateMode = 'standard';

  constructor() { }

  onFiltered(event: SohoFieldFilteredEvent) {
    const targetElement = event.target as Element;
    const id = targetElement.id;
    if (id.includes('date-with-range')) {
      this.model.dateRange.filterType = event.filterOption.value;
      if (event.filterOption.value === 'in-range') {
        this.dateMode = 'range';
      } else {
        this.dateMode = 'standard';
      }

    } else if (id.includes('filter-text')) {
      this.model.text.filterType = event.filterOption.value;

    } else if (id.includes('example-dropdown')) {
      this.model.dropdown.filterType = event.filterOption.value;

    } else if (id.includes('product-lookup')) {
      this.model.lookup.filterType = event.filterOption.value;

    } else if (id.includes('date-without-range')) {
      this.model.date.filterType = event.filterOption.value;

    } else if (id.includes('example-multiselect')) {
      this.model.multiselect.filterType = event.filterOption.value;

    }
  }

}
