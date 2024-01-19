import { Component } from '@angular/core';
import { PAGING_DATA } from '../datagrid/datagrid-paging-data';

@Component({ // eslint-disable-line
  selector: 'app-pager-standalone-demo',
  templateUrl: 'pager-standalone.demo.html',
})
export class PagerStandaloneDemoComponent {

  model = {
    dataset: PAGING_DATA,

    hideFirstButton: false,
    hidePreviousButton: false,
    hideNextButton: false,
    hideLastButton: false,

    disableFirstButton: false,
    disableLastButton: false,
    disablePreviousButton: false,
    disableNextButton: false,

    firstPageTooltip: 'click to got to the first page of records',
    lastPageTooltip: 'click to got to the last page of records',
    previousPageTooltip: 'click to got to the previous page of records',
    nextPageTooltip: 'click to got to the last page of records',

    hidePageSelectorInput: false,

    hidePageSizeSelector: false,
    useSmallPageSizeSelector: false,
    pageSizeMenuSettings: { attachToBody: false },

    pageSize: 10,
    pageSizes: [5, 10, 15, 20],
  };

  model_new = {
    dataset: PAGING_DATA.slice(80),
    hideFirstButton: false,
    hidePreviousButton: false,
    hideNextButton: false,
    hideLastButton: false,
    disableFirstButton: false,
    disableLastButton: false,
    disablePreviousButton: false,
    disableNextButton: false,
    firstPageTooltip: 'click to got to the first page of records',
    lastPageTooltip: 'click to got to the last page of records',
    previousPageTooltip: 'click to got to the previous page of records',
    nextPageTooltip: 'click to got to the last page of records',
    hidePageSelectorInput: false,
    hidePageSizeSelector: false,
    useSmallPageSizeSelector: false,
    pageSizeMenuSettings: { attachToBody: false },
    pageSize: 10,
    pageSizes: [5, 10, 15, 20],
  };

  showModel = false;

  onFirstPage(_: any) {
    console.log('onFirstPage');
  }

  onLastPage(_: any) {
    console.log('onLastPage');
  }

  onPreviousPage(_: any) {
    console.log('onPreviousPage');
  }

  onNextPage(_: any) {
    console.log('onNextPage');
  }

  onPageSizeChange(_: any) {
    console.log('onPageSizeChange');
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  changeDataset() {
    this.model = this.model_new;
  }
}
