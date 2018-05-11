import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDataGridModule } from './soho-datagrid.module';
import { SohoDataGridComponent } from './soho-datagrid.component';

describe('Soho DataGrid Unit Tests', () => {
  let comp: SohoDataGridComponent;
  let fixture: ComponentFixture<SohoDataGridComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDataGridComponent]
    });

    fixture = TestBed.createComponent(SohoDataGridComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Empty Content', () => {
    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root1');
    expect(el.hasAttribute('soho-datagrid')).toBeTruthy();
    expect(el.classList).toContain('datagrid-container');
  });

  it('Check With Content', () => {

    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root2');
    expect(el.hasAttribute('soho-datagrid')).toBeTruthy();
    expect(el.classList).toContain('datagrid-container');
  });

  it('Check default value of dataset is []', () => {
    fixture.detectChanges();

    expect(comp.dataset).toEqual([]);
  });

  it('check uniqueId', () => {
    fixture.detectChanges();

    // gridOptions.uniqueId has the default of null
    expect(comp.gridOptions.uniqueId).toBeNull();

    // The control has the default of null.
    expect(comp.uniqueId).toBeNull();

    comp.uniqueId = 'MyApp';

    expect(comp.uniqueId).toEqual('MyApp');
    expect(comp.gridOptions.uniqueId).toEqual('MyApp');
  });

  it('check rowReorder', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.rowReorder).toBeFalsy();
    expect(comp.rowReorder).toBeFalsy();

    comp.rowReorder = true;

    expect(comp.gridOptions.rowReorder).toBeTruthy();
    expect(comp.rowReorder).toBeTruthy();
  });

  it('check showDirty', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.showDirty).toBeFalsy();
    expect(comp.showDirty).toBeFalsy();

    comp.showDirty = true;

    expect(comp.gridOptions.showDirty).toBeTruthy();
    expect(comp.showDirty).toBeTruthy();
  });

  it('check virtualized', () => {
    // fixture.detectChanges();

    // expect(comp.gridOptions.virtualized).toBeFalsy();
    // expect(comp.virtualized).toBeFalsy();

    // comp.virtualized = true;

    // expect(comp.gridOptions.virtualized).toBeTruthy();
    // expect(comp.virtualized).toBeTruthy();
  });

  it('check virtualRowBuffer', () => {
    // fixture.detectChanges();

    // expect(comp.gridOptions.virtualRowBuffer).toEqual(undefined);
    // expect(comp.virtualRowBuffer).toEqual(10);

    // comp.virtualRowBuffer = 20;

    // expect(comp.gridOptions.virtualRowBuffer).toEqual(20);
    // expect(comp.virtualRowBuffer).toEqual(20);
  });

  it('check groupable', () => {
    fixture.detectChanges();

    expect(comp.gridOptions.groupable).toBeNull();
    expect(comp.groupable).toBeNull();

    comp.groupable = { fields: ['accountType'], aggregator: 'sum' };

    expect(comp.gridOptions.groupable).toEqual({ fields: ['accountType'], aggregator: 'sum' });
    expect(comp.groupable).toEqual({ fields: ['accountType'], aggregator: 'sum' });
  });
});

@Component({
  template: `<div soho-datagrid
              [columns]="columns"
              [dataset]="data">
             </div>`
})
class SohoDataGridTestComponent {
  @ViewChild(SohoDataGridComponent) datagrid: SohoDataGridComponent;
  _columns: SohoDataGridColumn[];
  _data: Object[];
  public get columns(): SohoDataGridColumn[] {
    if (!this._columns) {
      this._columns = [];
      /* tslint:disable */
      this._columns.push({ id: 'selectionCheckbox', sortable: false, resizable: false, width: 50, formatter: Soho.Formatters.SelectionCheckbox, align: 'center' });
      this._columns.push({ id: 'taskName', name: 'Task', field: 'taskName', expanded: 'expanded', formatter: Soho.Formatters.Tree, filterType: 'text', width: 250 });
      this._columns.push({ id: 'id', name: 'Id', field: 'id', filterType: 'text', width: 25 });
      this._columns.push({ id: 'desc', name: 'Description', field: 'desc', filterType: 'text', width: 200 });
      this._columns.push({ id: 'comments', name: 'Comments', field: 'comments', formatter: Soho.Formatters.Hyperlink, filterType: 'text', width: 60 });
      this._columns.push({ id: 'time', name: 'Time', field: 'time', filterType: 'time', width: 60 });
      /* tslint:enable */
    }
    return this._columns;
  }

  public get data(): any[] {
    if (!this._data) {
      /* tslint:disable */
      this._data = [
        {
          id: 1, escalated: 2, depth: 1, expanded: false, taskName: 'Follow up action with HMM Global', desc: '', comments: null, time: '', children: [
            { id: 2, escalated: 1, depth: 2, taskName: 'Quotes due to expire', desc: 'Update pending quotes and send out again to customers.', comments: 3, time: '7:10 AM' },
            { id: 3, escalated: 0, depth: 2, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '9:10 AM' },
            { id: 4, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Trucking', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '14:10 PM' },
          ]
        },
        { id: 5, escalated: 0, depth: 1, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '18:10 PM' },
        { id: 6, escalated: 0, depth: 1, taskName: 'Follow up action with HMM Global', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '20:10 PM' },
        {
          id: 7, escalated: 0, depth: 1, expanded: true, taskName: 'Follow up action with Residental Housing', desc: 'Contact sales representative with the updated purchase order.', comments: 2, time: '22:10 PM', children: [
            { id: 8, escalated: 0, depth: 2, taskName: 'Follow up action with Universal HMM Logistics', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM' },
            { id: 9, escalated: 0, depth: 2, taskName: 'Follow up action with Acme Shipping', desc: 'Contact sales representative.', comments: 2, time: '22:10 PM' },
            {
              id: 10, escalated: 0, depth: 2, expanded: true, taskName: 'Follow up action with Residental Shipping Logistics ', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                { id: 11, escalated: 0, depth: 3, taskName: 'Follow up action with Universal Shipping Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM' },
                {
                  id: 12, escalated: 0, depth: 3, expanded: true, taskName: 'Follow up action with Acme Universal Logistics Customers', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM', children: [
                    { id: 13, escalated: 0, depth: 4, taskName: 'More Contact', desc: 'Contact sales representative.', comments: 2, time: '14:10 PM' },
                    { id: 14, escalated: 0, depth: 4, taskName: 'More Follow up', desc: 'Contact sales representative.', comments: 2, time: '7:04 AM' },
                  ]
                },
              ]
            }
          ]
        }
      ];
    }
    return this._data;
  }

}

describe('Soho DataGrid Render', () => {
  let datagrid: SohoDataGridComponent;
  let component: SohoDataGridTestComponent;
  let fixture: ComponentFixture<SohoDataGridTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDataGridTestComponent],
      imports: [FormsModule, SohoDataGridModule]
    });

    fixture = TestBed.createComponent(SohoDataGridTestComponent);
    component = fixture.componentInstance;

    datagrid = component.datagrid;
    datagrid.treeGrid = true;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-datagrid]')).nativeElement;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual(dropdown.id);
    // expect(el.classList).toContain('dropdown');
    // expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');

    // expect(el.childElementCount).toBe(9);

    // let i = 0;
    // component.options.forEach(option => {
    //   expect(el.children[i].nodeName).toBe('OPTION');
    //   expect(el.children[i].getAttribute('value')).toBe(option.value);
    //   expect(el.children[i++].innerHTML).toBe(option.label);
    // });

    // dropdown.noSearch = false;
    // fixture.detectChanges();

    // expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');
  });

  it('setting the dataset updates the grid', () => {
    fixture.detectChanges();

    const testData = [['d1', 'd2'], ['a1', 'a2']];
    component.datagrid.dataset = testData;

    expect(component.datagrid.dataset).toBe(testData);
  });

  it('check setColumnSort(id, descending)', (done) => {

    component.datagrid.sorted.subscribe((sortedEvent: SohoDataGridSortedEvent) => {
      expect(sortedEvent.sortId).toEqual('desc');
      expect(sortedEvent.sortAsc).toBeTruthy();
      expect(sortedEvent.sortField).toEqual('desc');
      done();
    });

    fixture.detectChanges();

    component.datagrid.setSortColumn('desc', true);
  });

  it('check setColumnSort(id, ascending)', (done) => {

    component.datagrid.sorted.subscribe((sortedEvent: SohoDataGridSortedEvent) => {
      expect(sortedEvent.sortId).toEqual('desc');
      expect(sortedEvent.sortAsc).toBeFalsy();
      expect(sortedEvent.sortField).toEqual('desc');
      done();
    });

    fixture.detectChanges();

    component.datagrid.setSortColumn('desc', false);
  });

  it('check setColumnSort(id)', (done) => {
    component.datagrid.sorted.subscribe((sortedEvent: SohoDataGridSortedEvent) => {
      expect(sortedEvent.sortId).toEqual('desc');
      expect(sortedEvent.sortAsc).toBeTruthy();
      expect(sortedEvent.sortField).toEqual('desc');
      done();
    });

    fixture.detectChanges();

    component.datagrid.setSortColumn('desc');
  });
});
