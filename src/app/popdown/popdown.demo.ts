import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';

import {
  SohoPopDownDirective,
  SohoListViewComponent
} from 'ids-enterprise-ng';

import {
  productsColumns,
  productsData
} from '../lookup/mock.data';

@Component({
  selector: 'app-popdown-demo',
  templateUrl: 'popdown.demo.html',
})
export class PopDownDemoComponent {
  @ViewChild('statesPopDown', { read: SohoPopDownDirective, static: true })
  public statesPopDown: SohoPopDownDirective;
  @ViewChild(SohoListViewComponent, { static: true }) public stateViewList: SohoListViewComponent;

  public showSelectedOnly = false;
  public columns_product: SohoDataGridColumn[];
  public data_product: any[];
  public model: any = {
    singleobjectexists: {
      id: 1,
      productId: 2142201,
      productName: 'Compressor',
      activity: 'Assemble Paint',
      quantity: 1,
      price: 210.99,
      status: 'OK',
      orderDate: new Date(2014, 12, 8),
      action: 'Action',
    }
  };
  public states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];
  public selectedStates = [];

  setupProducts() {
    this.columns_product = [];
    this.data_product = [];

    // Some Sample Data
    productsData.forEach(data => {
      this.data_product.push(data);
    });

    // Define Columns for the Grid.
    productsColumns.forEach(column => {
      this.columns_product.push(column);
    });

  }

  public get visibleStates() {
    return this.showSelectedOnly ? this.selectedStates : this.states;
  }

  constructor(protected changeDetector: ChangeDetectorRef) {
  }

  public onSelected(event: any) {
    this.selectedStates = [];
    if (event.length > 1 && event[1].selectedItems !== undefined) {
      event[1].selectedItems.forEach((item: any) => {
        const data = $(item).attr('data');
        console.log(data);
        this.selectedStates.push(data);
      });
      this.changeDetector.detectChanges();
    }
  }

  public onClickOK() {
    this.statesPopDown.close();
  }

  public onClickCancel() {
    this.statesPopDown.close();
  }
}
