import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { SohoStandalonePagerComponent } from './soho-standalone-pager.component';
import { TestHelper } from '../utils';

describe('Standalone Pager Unit Tests', () => {
  let comp: SohoStandalonePagerComponent;
  let fixture: ComponentFixture<SohoStandalonePagerComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoStandalonePagerComponent ]
    });

    fixture = TestBed.createComponent(SohoStandalonePagerComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    comp.showFirstButton = true;
    comp.showNextButton = true;
    comp.showPreviousButton = true;
    comp.showLastButton = true;
    comp.showPageSizeSelector = true;
    comp.pageSize = 10;
    comp.pageSizes = [ 5, 10, 15, 20 ];

    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    comp.showFirstButton = true;
    comp.showNextButton = true;
    comp.showPreviousButton = true;
    comp.showLastButton = true;
    comp.enableFirstButton = true;
    comp.enableNextButton = true;
    comp.enablePreviousButton = true;
    comp.enableLastButton = true;
    comp.firstPageTooltip = 'First Page';
    comp.nextPageTooltip = 'Next Page';
    comp.previousPageTooltip = 'Previous Page';
    comp.lastPageTooltip = 'Last Page';
    comp.showPageSizeSelector = true;
    comp.smallPageSizeSelector = true;
    comp.pageSize = 10;
    comp.pageSizes = [ 5, 10, 15, 20 ];
    comp.pageSizeMenuSettings = {
      attachToBody: false
    };
    expect((comp as any).options.showFirstButton).toEqual(true);
    expect((comp as any).options.showNextButton).toEqual(true);
    expect((comp as any).options.showPreviousButton).toEqual(true);
    expect((comp as any).options.showLastButton).toEqual(true);
    expect((comp as any).options.enableFirstButton).toEqual(true);
    expect((comp as any).options.enableNextButton).toEqual(true);
    expect((comp as any).options.enablePreviousButton).toEqual(true);
    expect((comp as any).options.enableLastButton).toEqual(true);
    expect((comp as any).options.firstPageTooltip).toEqual('First Page');
    expect((comp as any).options.nextPageTooltip).toEqual('Next Page');
    expect((comp as any).options.previousPageTooltip).toEqual('Previous Page');
    expect((comp as any).options.lastPageTooltip).toEqual('Last Page');
    expect((comp as any).options.showPageSizeSelector).toEqual(true);
    expect((comp as any).options.smallPageSizeSelector).toEqual(true);
    expect((comp as any).options.pagesize).toEqual(10);
    expect((comp as any).options.pagesizes).toEqual([ 5, 10, 15, 20 ]);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    comp.enableFirstButton = false;
    comp.enableNextButton = false;
    comp.enablePreviousButton = false;
    comp.enableLastButton = false;
    comp.firstPageTooltip = 'Disabled First Page';
    comp.nextPageTooltip = 'Disabled Next Page';
    comp.previousPageTooltip = 'Disabled Previous Page';
    comp.lastPageTooltip = 'Disabled Last Page';
    comp.showPageSizeSelector = false;
    comp.smallPageSizeSelector = false;
    comp.pageSize = 20;
    comp.pageSizes = [];
    comp.pageSizeMenuSettings = {
      attachToBody: true
    };
    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>((comp as any).pager, 'updated').and.callThrough();
    fixture.detectChanges();

    expect((comp as any).pager.settings.enableFirstButton).toEqual(false);
    expect((comp as any).pager.settings.enableNextButton).toEqual(false);
    expect((comp as any).pager.settings.enablePreviousButton).toEqual(false);
    expect((comp as any).pager.settings.enableLastButton).toEqual(false);
    expect((comp as any).pager.settings.firstPageTooltip).toEqual('Disabled First Page');
    expect((comp as any).pager.settings.nextPageTooltip).toEqual('Disabled Next Page');
    expect((comp as any).pager.settings.previousPageTooltip).toEqual('Disabled Previous Page');
    expect((comp as any).pager.settings.lastPageTooltip).toEqual('Disabled Last Page');
    expect((comp as any).pager.settings.showPageSizeSelector).toEqual(false);
    expect((comp as any).pager.settings.smallPageSizeSelector).toEqual(false);
    expect((comp as any).pager.settings.pagesize).toEqual(20);

    expect((comp as any).pager.settings.pageSizeMenuSettings.attachToBody).toEqual(true);

    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });

  it('check event emitters', () => {
    comp.showFirstButton = true;
    comp.showNextButton = true;
    comp.showPreviousButton = true;
    comp.showLastButton = true;
    comp.showPageSizeSelector = true;
    comp.pageSize = 10;
    comp.pageSizes = [ 5, 10, 15, 20 ];

    fixture.detectChanges();

    const pagerElement = comp['elementRef'].nativeElement;
    TestHelper.testFireEvent(pagerElement, 'firstpage', comp['firstPage']);
    TestHelper.testFireEvent(pagerElement, 'lastpage', comp['lastPage']);
    TestHelper.testFireEvent(pagerElement, 'previouspage', comp['previousPage']);
    TestHelper.testFireEvent(pagerElement, 'nextpage', comp['nextPage']);
    TestHelper.testFireEvent(pagerElement, 'pagesizechange', comp['pageSizeChange']);
  });

  it('Check onDestroy', () => {
    // test else conditions in onDestroy
    comp.ngOnDestroy();
  });
});
