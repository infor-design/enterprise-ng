import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { PartnerMapping } from './datagrid-tab-navigation.model';
import { PartnerIdDetailDataGridService } from './datagrid-tab-navigation.service';

@Component({
  selector: 'app-datagrid-tab-navigation-demo',
  templateUrl: 'datagrid-tab-navigation.demo.html',
  providers: [PartnerIdDetailDataGridService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridTabNavigationDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent, { static: true })
  dataGrid!: SohoDataGridComponent;

  private _subject$: BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  public data: Observable<any> = this._subject$;
  public newData: Array<any> = new Array<any>();

  public mappingData = [];
  isToolbarDisabled = true;
  gridLoadingMessage = '';
  gridNoData = '';
  public get columns(): Observable<SohoDataGridColumn[]> {
    return this.gridService.columns;
  }

  /**
   * Creates an instance of PartnerIdDetailDataGridComponent.
   *
   * @param service - Instance of PartnerIDService
   * @param gridService - Instance of PartnerIdDetailDataGridService
   * @param changeDetectorRef - Instance of ChangeDetectorRef
   * @memberOf PartnerIdDetailDataGridComponent
   */
  constructor(private gridService: PartnerIdDetailDataGridService) {
    this.doTranslations();
  }

  ngOnInit() { }

  ngAfterContentInit() { }

  /**
   * Called after the view has been initialized
   */
  ngAfterViewInit() {
    this.dataGrid.editable = true;
    this.dataGrid.emptyMessage = this.EmptyMessageLoading;
    this.dataGrid.paging = true;
    this.dataGrid.pagesize = 10;
    this.dataGrid.clickToSelect = false;
    this.dataGrid.actionableMode = true;
  }

  // todo see if other icons work once ids / angular is updated.
  public EmptyMessageLoading: SohoEmptyMessageOptions = {
    title: Soho.Locale.translate('Loading'),
    icon: 'icon-empty-no-data',
    height: 'medium',
    info: ''
  };

  /**
   * Function called when the create button is clicked
   */
  doCreate() {
    this.dataGrid.addRow(new PartnerMapping(), 0);
  }

  /**
   * Function called when the detail button is clicked
   */
  doDelete() {
    this.dataGrid.removeSelected();
  }
  doTranslations() {
    this.gridLoadingMessage = 'DataGrid.EmptyMessage.Loading';
    this.gridNoData = 'DataGrid.EmptyMessage.NoData';
  }
  /**
   * TODO: Have to think about getting data this way. Not sure whether it is good approach
   */
  public updateMappingData(data: Array<PartnerMapping>) {
    if (this.newData.length > 0) {
      this.newData = [];
      this.dataGrid.data = [];
    }

    for (const dataItem of data) {
      this.newData.push(dataItem);
    }
    this.dataGrid.emptyMessage = this.EmptyMessageEmpty;
    this._subject$.next(this.newData);
  }

  public EmptyMessageEmpty: SohoEmptyMessageOptions = {
    title: Soho.Locale.translate('NoData'),
    info: '',
    icon: 'icon-empty-no-data',
    height: 'medium'
  };
  /**
   * toggles dataGrid Editable property
   */
  public setDataGridEditable(isEditable: boolean) {
    this.dataGrid.editable = isEditable;
    this.isToolbarDisabled = !isEditable;
  }

  /**
   * We need to have getter to access data in grid
   *
  public getDataFromGrid(): Array<any> {
    const mapIntExtData = this.dataGrid.dataset;

    const datagridData: any = [];

    for (const row of mapIntExtData) {
      const item: any = {};
      item.externalValue = row.externalValue.trimRight();
      item.internalValue = row.internalValue.trimRight();
      item.businessKey = row.businessKey;
      item.accountingEntityId = row.accountingEntityId;
      item.locationId = row.locationId;

      datagridData.push(item);
    }

    return datagridData;
  }
  */
}
