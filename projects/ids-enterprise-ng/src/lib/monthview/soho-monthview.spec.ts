/// <reference path="soho-monthview.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { SohoMonthViewComponent } from './soho-monthview.component';
import { TestHelper } from '../utils';

describe('Soho Monthview Unit Tests', () => {
  let comp: SohoMonthViewComponent;
  let fixture: ComponentFixture<SohoMonthViewComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [ SohoMonthViewComponent ]
    });

    fixture = TestBed.createComponent(SohoMonthViewComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

    Soho.Locale.set('en-US').done(() => {
      done();
    });
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    comp.month = 1;
    comp.year = 2020;
    comp.showMonthYearPicker = true;

    // check options
    expect(comp['options'].month).toEqual(1);
    expect(comp['options'].year).toEqual(2020);
    expect(comp['options'].showMonthYearPicker).toEqual(true);

    // detect changes to cause monthview to be rendered.
    fixture.detectChanges();

    // once monthview is built setting input should cause montview.settings to update
    comp.month = 2;
    comp.year = 2021;
    comp.showMonthYearPicker = false;

    // check monthview settings
    expect(comp['monthview'].settings.month).toEqual(2);
    expect(comp['monthview'].settings.year).toEqual(2021);
    expect(comp['monthview'].settings.showMonthYearPicker).toEqual(false);

    // update required should be true after updating inputs after pie is built.
    expect((comp as any).updateRequired).toEqual(true);

    // spy on updated() function to make sure it's called as a result of the updateRequired flag.
    const pieUpdatedSpy = spyOn<any>(comp["monthview"], 'updated').and.callThrough();

    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(pieUpdatedSpy).toHaveBeenCalledTimes(1);
  });

  it('check outputs', () => {
    comp.month = 1;
    comp.year = 2020;
    comp.showMonthYearPicker = true;

    fixture.detectChanges();
    expect(comp['monthview']).not.toBeUndefined();

    TestHelper.testFireEvent(comp['element'].nativeElement, 'selected', comp['selected']);
    TestHelper.testFireEvent(comp['element'].nativeElement, 'monthrendered', comp['monthRendered']);
  });

  it('check public functions', () => {
    comp.month = 1;
    comp.year = 2020;
    comp.showMonthYearPicker = true;
    fixture.detectChanges();

    comp.showMonth(4, 2020);
    comp.selectDay(new Date(2020, 4, 20));
    comp.selectToday();
  });
});
