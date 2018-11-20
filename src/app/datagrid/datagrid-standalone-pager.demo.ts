import { Component, OnInit, ViewChild, } from '@angular/core';
import { SohoDataGridComponent, } from 'ids-enterprise-ng';
import { DatagridStandalonePagerDemoService } from './datagrid-standalone-pager-demo.service';

@Component({
  selector: 'app-datagrid-standalone-pager',
  templateUrl: './datagrid-standalone-pager.demo.html',
  providers: [ DatagridStandalonePagerDemoService ]
})
export class DatagridStandalonePagerDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  data: any[];
  columns: SohoDataGridColumn[];
  showPageSizeSelector = true;
  pageSize = 10;
  pageSizes = [ 5, 10, 25, 100 ];
  isFirstPage = true;
  isLastPage = true;

  constructor(private datagridPagingService: DatagridStandalonePagerDemoService) {}

  ngOnInit(): void {
    this.columns = this.datagridPagingService.getColumns();
    const result = this.datagridPagingService.initialPage(this.pageSize);
    this.updateTemplateVariables(result);
  }

  onFirstPage() {
    const result = this.datagridPagingService.initialPage(this.pageSize);
    this.updateTemplateVariables(result);
  }

  onPreviousPage() {
    const result = this.datagridPagingService.previousPage();
    this.updateTemplateVariables(result);
  }

  onNextPage() {
    const result = this.datagridPagingService.nextPage();
    this.updateTemplateVariables(result);
  }

  onLastPage() {
    const result = this.datagridPagingService.lastPage();
    this.updateTemplateVariables(result);
  }

  onSortPage(event: SohoDataGridSortedEvent): void {
    console.log('onSortPage', event);
    const result = this.datagridPagingService.sortPage();
    this.updateTemplateVariables(result);

    // todo: for disableClientSort setting data resets the sort - reset them here
    setTimeout(() => this.sohoDataGridComponent.setSortIndicator(event.sortId, event.sortAsc));
  }

  onFilterPage(event: SohoDataGridFilteredEvent): void {
    console.log('onFilterPage', event);
    const result = this.datagridPagingService.filterPage();
    this.updateTemplateVariables(result);

    // todo: for disableClientFilter setting data resets the filter conditions - reset them here
    setTimeout(() => this.sohoDataGridComponent.setFilterConditions(event.conditions));
  }

  onPageSizeChange(args: any[]) {
    this.pageSize = args[1].pagesize;
    const result = this.datagridPagingService.initialPage(this.pageSize);
    this.updateTemplateVariables(result);
  }

  private updateTemplateVariables(result: any) {
    this.data = result.data;
    this.isFirstPage = result.firstPage;
    this.isLastPage = result.lastPage;
  }

  onShowPageSizeSelector() {
    this.showPageSizeSelector = !this.showPageSizeSelector;
  }

  toggleFilterRow() {
    this.sohoDataGridComponent.toggleFilterRow();
  }
}
