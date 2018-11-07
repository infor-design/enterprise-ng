import { Component } from '@angular/core';

@Component({ // @tslint:disable-line
  selector: 'app-pager-standalone-demo',
  templateUrl: './pager-standalone.demo.html',
})
export class PagerStandaloneDemoComponent {

  model = {
    hideFirstButton: false,
    hidePreviousButton: false,
    hideNextButton: false,
    hideLastButton: false,

    disableFirstButton: false,
    disableLastButton: false,
    disablePreviousButton: false,
    disableNextButton: false,

    firstPageTooltip   : 'click to got to the first page of records',
    lastPageTooltip    : 'click to got to the last page of records',
    previousPageTooltip: 'click to got to the previous page of records',
    nextPageTooltip    : 'click to got to the last page of records',

    hidePageSizeSelector: false,
    pageSize: 10,
    pageSizes: [5, 10, 15, 20],
  };

  showModel = false;

  onFirstPage() {
    console.log('onFirstPage');
  }

  onLastPage() {
    console.log('onLastPage');
  }

  onPreviousPage() {
    console.log('onPreviousPage');
  }

  onNextPage() {
    console.log('onNextPage');
  }

  onPageSizeChange() {
    console.log('onPageSizeChange');
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
