/// <reference path="soho-blockgrid.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter, ViewChild } from '@angular/core';
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

describe('Soho blockgrid Unit Tests', () => {
  let comp: SohoBlockGridComponent;
  let fixture: ComponentFixture<SohoBlockGridComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBlockGridComponent]
    });

    fixture = TestBed.createComponent(SohoBlockGridComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Inputs', () => {
    const emptyData: any[] = [];
    let selectable: SohoBlockGridSelectable = 'single';

    // check that block grid options buffer variable is working.
    comp.dataset = emptyData;
    comp.selectable = selectable;
    expect(comp.dataset).toEqual(emptyData);
    expect(comp.selectable).toEqual(selectable);

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

    expect(comp.dataset).toEqual(blockGridTestData);
    expect(comp.selectable).toEqual(selectable);

    expect(updatedSpy).toHaveBeenCalledTimes(2);
    expect(blockgridUpdatedSpy).toHaveBeenCalledTimes(2);
  });

  it('Check Outputs', () => {
    const selectable: SohoBlockGridSelectable = 'mixed';
    comp.dataset = blockGridTestData;
    comp.selectable = selectable;

    // detect changes to cause the blockgrid component to be built.
    fixture.detectChanges();
    expect((comp as any).blockgrid).not.toBeUndefined();

    TestHelper.testFireEvent(comp['element'].nativeElement, 'selected', comp['selected']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'deselected', comp['deselected']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'activated', comp['activated']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'deactivated', comp['deactivated']);
  });

  it('Check public functions', () => {
    const selectable: SohoBlockGridSelectable = 'mixed';
    comp.dataset = blockGridTestData;
    comp.selectable = selectable;

    fixture.detectChanges(); // detect changes to cause the blockgrid component to be built.
    expect((comp as any).blockgrid).not.toBeUndefined();

    // check activateBlock happy path
    const selectBlockSpy = spyOn((comp as any).blockgrid, 'selectBlock');
    comp.activateBlock(1);
    expect(selectBlockSpy).toHaveBeenCalledTimes(1);
    expect(selectBlockSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectBlockSpy.calls.mostRecent().args[1]).toEqual(false);

    // check activateBlock safety checks
    selectBlockSpy.calls.reset();
    comp.activateBlock(-1); // lower out of bounds index
    expect(selectBlockSpy).not.toHaveBeenCalled();
    comp.activateBlock(5); // upper out of bounds index
    expect(selectBlockSpy).not.toHaveBeenCalled();

    // check deactivateBlock
    selectBlockSpy.calls.reset();
    comp.deactivateBlock();
    expect(selectBlockSpy).toHaveBeenCalledTimes(1);
    expect(selectBlockSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectBlockSpy.calls.mostRecent().args[1]).toEqual(false);

    selectBlockSpy.calls.reset();
    comp.selectBlocks([2, 3]);
    expect(selectBlockSpy).toHaveBeenCalledTimes(1);
    expect(selectBlockSpy.calls.mostRecent().args.length).toEqual(2);
    expect(selectBlockSpy.calls.mostRecent().args[1]).toEqual(true);

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
  @ViewChild(SohoBlockGridComponent) blockgrid: SohoBlockGridComponent;
}
describe('Soho blockgrid Render', () => {
  let blockgrid: SohoBlockGridComponent;
  let component: SohoBlockGridTestComponent;
  let fixture: ComponentFixture<SohoBlockGridTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBlockGridTestComponent],
      imports: [FormsModule, SohoBlockGridModule]
    });

    fixture = TestBed.createComponent(SohoBlockGridTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-blockgrid]')).nativeElement;

    fixture.detectChanges();
    blockgrid = component.blockgrid;
  });

  it('Check HTML content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.hasAttribute('soho-blockgrid')).toBeTruthy('soho-blockgrid');
  });
});
