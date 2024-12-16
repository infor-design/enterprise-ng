import { Component, ViewChild } from '@angular/core';
import { SohoFieldFilterDirective } from 'ids-enterprise-ng';

/**
 * This example shows basic field filter functionality on input elements
 */
@Component({
    selector: 'app-field-filter-demo',
    templateUrl: 'field-filter.demo.html',
    standalone: false
})
export class FieldFilterDemoComponent {

  @ViewChild(SohoFieldFilterDirective) sohoFieldFilter?: SohoFieldFilterDirective;

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
  public defaultFilterOperator = 'equals';

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

  onResetDefault() {
    (this.model.text as any).value = '';
    (this.model.text as any).selectedFilterType = this.defaultFilterOperator;
    this.sohoFieldFilter?.setFilterType(this.defaultFilterOperator);
  }

  onFiltered(event: SohoFieldFilteredEvent) {
    const targetElement = event.target as Element;
    const id = targetElement.id;

    if (id.includes('date-with-range') && event) {
      (this.model.dateRange as any).filterType = event.filterOption?.value;
      if (event?.filterOption?.value === 'in-range') {
        this.dateMode = 'range';
      } else {
        this.dateMode = 'standard';
      }

    } else if (id.includes('filter-text')) {
      (this.model.text as any).filterType = event.filterOption?.value;

    } else if (id.includes('example-dropdown')) {
      (this.model.dropdown as any).filterType = event.filterOption?.value;
    } else if (id.includes('product-lookup')) {
      (this.model.lookup as any).filterType = event.filterOption?.value;
    } else if (id.includes('date-without-range')) {
      (this.model.date as any).filterType = event.filterOption?.value;
    } else if (id.includes('example-multiselect')) {
      (this.model.multiselect as any).filterType = event.filterOption?.value;
    }
  }

}
