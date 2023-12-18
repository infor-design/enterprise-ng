/****************************************************************
 *						                                                  *
 *                           NOTICE                             *
 *						                                                  *
 *   THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS              *
 *   CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES    *
 *   OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR   *
 *   WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND        *
 *   ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH   *
 *   THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.             *
 *   ALL OTHER RIGHTS RESERVED.			                            *
 *                                                              *
 *   (c) COPYRIGHT 2023 INFOR.  ALL RIGHTS RESERVED.            *
 *   THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE             *
 *   TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR           *
 *   AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS         *
 *   RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE          *
 *   THE PROPERTY OF THEIR RESPECTIVE OWNERS.                   *
 *						                                                  *
 ****************************************************************/
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { SohoDataGridService } from 'ids-enterprise-ng';
import { Observable, of as observableOf } from 'rxjs';

@Injectable()
export class PartnerIdDetailDataGridService extends SohoDataGridService {
  private gridColumns: Array<SohoDataGridColumn> = Array<SohoDataGridColumn>();
  private data: Array<any> = Array<any>();
  private accountingEntityList: Array<any> = Array<any>();
  private locationList: Array<any> = Array<any>();
  private businessKeysList: Array<any> = Array<any>();
  private filledDropDowns = 0; // count of dropdowns that have data loaded
  private totalDropDowns = 3; // How many dropdowns are there on the grid?
  observableColumns!: Observable<Array<SohoDataGridColumn>>;

  errorMessage: string = '';
  // Retrieve the column titles
  sourceValueTitle = '';
  targetValueTitle = '';
  assignmentTypeTitle = '';
  accountingEntityTitle = '';
  locationTitle = '';

  public get columns(): Observable<SohoDataGridColumn[]> {
    // console.log('AE: gridservice.columns');
    return this.observableColumns;
  }
  getColumns(): Array<SohoDataGridColumn> {
    // console.log('AE: datagridserve.getcolumns');
    return this.gridColumns;
  }

  // Not really used here.  Using async pipe in printjob-log-datagrid.component instead
  getData(req: SohoDataGridSourceRequest): Observable<Array<any>> {
    return observableOf(this.data);
  }

  onItemSelected(e: any, args: any) { }

  /**
   * Component Constructor
   *
   * @param translate - Instance of TranslateService used to obtain user strings
   * @param tfsService - Instance of TfsService
   * @param changeDetectorRef - Instance of Change Detector Ref
   * @param globalDateService - Instance of GlobalDataService used to get global code list.
   * @param authService - Instance of AuthService used to retrieve user assigned properties
   */
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    super();

    this.initializeDropDownLists();
    this.buildColumns();
  }

  private initializeDropDownLists() {
    this.populateLocationList();
    this.extractAEs();
    this.extractBusinessKeysData();
  }

  private buildColumns() {
    /* eslint-disable max-len */
    this.gridColumns = []; // clear any previous configuration

    this.gridColumns.push({
      id: 'selectionCheckbox',
      name: '',
      field: '',
      sortable: false,
      formatter: Soho.Formatters.SelectionCheckbox,
      align: 'center'
    });
    this.gridColumns.push({
      id: 'externalValue',
      name: 'sourceValueTitle',
      field: 'externalValue',
      formatter: Soho.Formatters.Text,
      editor: Soho.Editors.Input
    });
    this.gridColumns.push({
      id: 'internalValue',
      name: 'targetValueTitle',
      field: 'internalValue',
      formatter: Soho.Formatters.Text,
      editor: Soho.Editors.Input
    });
    this.gridColumns.push({
      id: 'businessKey',
      name: 'assignmentTypeTitle',
      field: 'businessKey',
      formatter: Soho.Formatters.Dropdown,
      options: this.businessKeysList,
      editor: Soho.Editors.Dropdown
    });
    this.gridColumns.push({
      id: 'accountingEntityId',
      name: 'accountingEntityTitle',
      field: 'accountingEntityId',
      formatter: Soho.Formatters.Dropdown,
      options: this.accountingEntityList,
      editor: Soho.Editors.Dropdown
    });
    this.gridColumns.push({
      id: 'locationId',
      name: 'locationTitle',
      field: 'locationId',
      formatter: Soho.Formatters.Dropdown,
      options: this.locationList,
      editor: Soho.Editors.Dropdown
    });
    /* eslint-enable max-len */
    this.observableColumns = observableOf(this.gridColumns);
  }

  /**
   * Function used to process retrieved AccountingEntity data
   *
   * @param dropDownItemList - The retrieved data
   */
  extractAEs() {
    this.accountingEntityList.push({ label: 'AE1', value: 'AE1' });
    this.accountingEntityList.push({ label: 'AE2', value: 'AE2' });
    this.accountingEntityList.push({ label: '', value: '' });
    //this.updateDropDownCount();
  }

  /**
   * Function to populate the LocationId dropdown list
   */
  populateLocationList() {
    this.locationList.push({ label: 'AE1', value: 'AE1' });
    this.locationList.push({ label: 'AE2', value: 'AE2' });
    this.locationList.push({ label: 'AE3', value: 'AE3' });
    this.locationList.push({ label: '', value: '' }); // add the empty option
    // this.locationList.sort(this.dynamicSort('label'));

    //this.updateDropDownCount();
  }

  /**
   * Function used to process retrieved BusinessKey data
   *
   * @param dropDownItemList - The retrieved data
   */
  extractBusinessKeysData() {
    this.businessKeysList.push({ label: 'BUYER', value: 'BUYER' });
    this.businessKeysList.push({ label: 'SELLER', value: 'SELLER' });
    this.businessKeysList.push({ label: '', value: '' });
    //this.updateDropDownCount();
  }
  /**
   * Updates drop down count
   * Used to keep tract of what data is finished loading.
   * Once all lists are done, it builds columns.
   * Helps prevent dropdowns from not being loaded and/or data from not getting translated.
   */
  private updateDropDownCount() {
    // console.log('AE: updateDropDownCount');
    this.filledDropDowns++;
    if (this.filledDropDowns === this.totalDropDowns) {
      this.buildColumns();
    }
  }
}
