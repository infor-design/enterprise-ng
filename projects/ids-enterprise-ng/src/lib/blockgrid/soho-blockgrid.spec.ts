import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBlockGridModule } from './soho-blockgrid.module';
import { SohoBlockGridComponent } from './soho-blockgrid.component';
import { TestHelper } from '../utils';

const blockGridTestData = [
  { img: 'https://randomuser.me/api/portraits/med/women/8.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
  { img: 'https://randomuser.me/api/portraits/med/women/9.jpg', maintxt: 'Jane Taylor', subtxt: 'Infor, Developer' },
  { img: 'https://randomuser.me/api/portraits/med/women/10.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, SVP' },
  { img: 'https://randomuser.me/api/portraits/med/women/11.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
  { img: 'https://randomuser.me/api/portraits/med/women/12.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Architect' }
];

const pagingTestData = [
  { image: 'https://randomuser.me/api/portraits/med/women/8.jpg', title: 'Sheena Taylor', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/9.jpg', title: 'Jane Taylor', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/10.jpg', title: 'Sam Smith', subtitle: 'Infor, SVP' },
  { image: 'https://randomuser.me/api/portraits/med/women/11.jpg', title: 'Mary Pane', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/12.jpg', title: 'Paula Paulson', subtitle: 'Infor, Architect' },
  { image: 'https://randomuser.me/api/portraits/med/women/13.jpg', title: 'Danielle Land', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/14.jpg', title: 'Donna Horrocks', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/15.jpg', title: 'Mary McConnel', subtitle: 'Infor, SVP' },
  { image: 'https://randomuser.me/api/portraits/med/women/16.jpg', title: 'Julie Ayers', subtitle: 'Infor, Developer' },
  { image: 'https://randomuser.me/api/portraits/med/women/17.jpg', title: 'Emily Bronte', subtitle: 'Infor, Architect' }
];

describe('Soho blockgrid Unit Tests', () => {
  let comp: SohoBlockGridComponent;
  let fixture: ComponentFixture<SohoBlockGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBlockGridComponent]
    });

    fixture = TestBed.createComponent(SohoBlockGridComponent);
    comp = fixture.componentInstance;
  });

  it('Check Inputs', () => {
    const emptyData: any[] = [];
    let selectable: SohoBlockGridSelectable = 'single';
    let pageSize = 5;
    let pageSizes = [5, 10, 25];

    // check that block grid options buffer variable is working.
    comp.dataset = emptyData;
    comp.selectable = selectable;
    comp.paging = false;
    comp.pagesize = pageSize;
    comp.pagesizes = pageSizes;
    expect(comp.dataset).toEqual(emptyData);
    expect(comp.selectable).toEqual(selectable);
    expect(comp.paging).toBeFalsy();
    expect(comp.pagesize).toEqual(pageSize);
    expect(comp.pagesizes).toEqual(pageSizes);

    // detect changes to cause the blockgrid component to be built.
    fixture.detectChanges();
    expect((comp as any).blockgrid).not.toBeUndefined();

    // Now that the blockgrid has been built:
    // 1. check to make sure inputs data makes it into the blockgrid.settings object.
    // 2. verify each input call results in a call to the SohoBlockGridComponent.updated()
    // 3. verify each input call also results in a call to blockgrid.updated()

    // callthrough blockgrid updated function gets called
    const updatedSpy = spyOn(comp, 'updated').and.callThrough();
    const blockgridUpdatedSpy = spyOn<any>((comp as any).blockgrid, 'updated');

    selectable = 'mixed';
    comp.dataset = blockGridTestData;
    comp.selectable = selectable;
    fixture.detectChanges();

    expect(comp.dataset).toEqual(blockGridTestData);
    expect(comp.selectable).toEqual(selectable);

    expect(updatedSpy).toHaveBeenCalledTimes(2);
    expect(blockgridUpdatedSpy).toHaveBeenCalledTimes(2);

    // Check paging inputs
    selectable = 'multiple';
    comp.dataset = pagingTestData;
    comp.paging = true;
    comp.selectable = selectable;
    fixture.detectChanges();

    expect(comp.dataset).toEqual(pagingTestData);
    expect(comp.paging).toBeTruthy();
    expect(comp.selectable).toEqual(selectable);

    pageSize = 3;
    comp.pagesize = 3;
    fixture.detectChanges();

    expect(comp.pagesize).toEqual(pageSize);

    pageSizes = [10, 20];
    comp.pagesizes = pageSizes;
    fixture.detectChanges();

    expect(comp.pagesizes).toEqual(pageSizes);
  });

  it('Check Outputs', () => {
    const selectable: SohoBlockGridSelectable = 'mixed';
    comp.dataset = pagingTestData;
    comp.selectable = selectable;
    comp.paging = true;
    comp.pagesize = 3;
    comp.pagesizes = [3, 5, 10, 20];

    // detect changes to cause the blockgrid component to be built.
    fixture.detectChanges();
    expect((comp as any).blockgrid).not.toBeUndefined();

    TestHelper.testFireEvent(comp['element'].nativeElement, 'selected', comp['selected']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'deselected', comp['deselected']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'activated', comp['activated']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'deactivated', comp['deactivated']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'page', comp['page']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'pagesizechange', comp['pagesizechange']);
  });

  it('Check public functions', () => {
    const selectable: SohoBlockGridSelectable = 'mixed';
    comp.dataset = blockGridTestData;
    comp.selectable = selectable;

    fixture.detectChanges(); // detect changes to cause the blockgrid component to be built.
    expect((comp as any).blockgrid).not.toBeUndefined();

    // check activateBlock happy path
    const selectSpy = spyOn((comp as any).blockgrid, 'select');
    comp.activateBlock(1);
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectSpy.calls.mostRecent().args[1]).toEqual(false);

    // check activateBlock safety checks
    selectSpy.calls.reset();
    comp.activateBlock(-1); // lower out of bounds index
    expect(selectSpy).not.toHaveBeenCalled();
    comp.activateBlock(5); // upper out of bounds index
    expect(selectSpy).not.toHaveBeenCalled();

    // check deactivateBlock
    selectSpy.calls.reset();
    comp.deactivateBlock();
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectSpy.calls.mostRecent().args[1]).toEqual(false);

    selectSpy.calls.reset();
    comp.selectBlocks([2, 3]);
    expect(selectSpy).toHaveBeenCalledTimes(1);
    expect(selectSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectSpy.calls.mostRecent().args[1]).toEqual(true);

    // todo: Cannot test deselectBlock functionality. No EP API in blockgrid.js is available. 2/19/2019
  });

  it('Check ngDestroy safety check for coverage', () => {
    // since no jquery component will be created here the destroy method
    // should cause the safety checks to be covered.
    comp.ngOnDestroy();
  });
});

@Component({
  template: `<div soho-blockgrid [dataset]="data"></div>`
})
class SohoBlockGridTestComponent {
  public data = blockGridTestData;
  @ViewChild(SohoBlockGridComponent) blockgrid?: SohoBlockGridComponent;
}
describe('Soho blockgrid Render', () => {
  let fixture: ComponentFixture<SohoBlockGridTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBlockGridTestComponent],
      imports: [FormsModule, SohoBlockGridModule]
    });

    fixture = TestBed.createComponent(SohoBlockGridTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('[soho-blockgrid]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.hasAttribute('soho-blockgrid')).toBeTruthy('soho-blockgrid');
  });
});
