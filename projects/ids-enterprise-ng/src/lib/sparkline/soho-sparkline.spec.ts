import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoSparklineModule } from './soho-sparkline.module';
import { SohoSparklineComponent } from './soho-sparkline.component';

const sparklineData1 = [{
  data: [25, 20, 55, 28, 41, 30, 50, 27, 24, 27],
  name: 'Inventory'
}];

const sparklineData2 = [{
  data: [25, 20, 55, 28, 41, 30, 50, 27, 24, 27],
  name: 'Inventory'
}];

const sparklineData3 = [{
  data: [40, 30, 40, 16, 50, 17, 15, 39, 15, 18],
  name: 'Demand'
}];

const sparklineData4 = [{
  data: [25, 20, 61, 28, 10, 30, 50, 35, 13, 27],
  name: 'Inventory'
}];

const sparklineData5 = [{
  data: [25, 20, 55, 28, 41, 30, 50, 22, 16, 27],
  name: 'Inventory'
}];

describe('Soho Sparkline Unit Tests', () => {
  let comp: SohoSparklineComponent;
  let fixture: ComponentFixture<SohoSparklineComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSparklineComponent]
    });

    fixture = TestBed.createComponent(SohoSparklineComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const colors: Array<any> = [];
    comp.dataset = sparklineData1;
    comp.type = 'sparkline';
    comp.colors = colors;
    comp.isDots = false;
    comp.isPeakDot = false;
    comp.isMinMax = false;
    comp.isMedianRange = false;

    // check options
    expect((comp as any).options.dataset).toEqual(sparklineData1);
    expect((comp as any).options.type).toEqual('sparkline');
    expect((comp as any).options.colors).toEqual(colors);
    expect((comp as any).options.isDots).toEqual(false);
    expect((comp as any).options.isPeakDot).toEqual(false);
    expect((comp as any).options.isMinMax).toEqual(false);
    expect((comp as any).options.isMedianRange).toEqual(false);

    // detect changes to cause pie chart to be built.
    fixture.detectChanges();

    expect((comp as any).sparkline).toBeDefined('expected SohoSparklineComponent.sparkline object to be created');

    // once pie chart is built setting input should cause pie.settings to update
    const updatedColors = ['#1D5F8A', '#999999', '#bdbdbd', '#d8d8d8'];
    comp.dataset = sparklineData2;
    comp.type = 'sparkline-peak';
    comp.colors = updatedColors;
    comp.isDots = true;
    comp.isPeakDot = true;
    comp.isMinMax = true;
    comp.isMedianRange = true;

    // check pie settings
    expect((comp as any).sparkline.settings.dataset).toEqual(sparklineData2);
    expect((comp as any).sparkline.settings.type).toEqual('sparkline-peak');
    expect((comp as any).sparkline.settings.colors).toEqual(updatedColors);
    expect((comp as any).sparkline.settings.isDots).toEqual(true);
    expect((comp as any).sparkline.settings.isPeakDot).toEqual(true);
    expect((comp as any).sparkline.settings.isMinMax).toEqual(true);
    expect((comp as any).sparkline.settings.isMedianRange).toEqual(true);

    // // update required should be true after updating inputs after pie is built.
    expect((comp as any).updateRequired).toEqual(true);

    // spy on updated() function to make sure it's called as a resutl of the updateRequired flag.
    const pieUpdatedSpy = spyOn<any>((comp as any).sparkline, 'updated').and.callThrough();

    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(pieUpdatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<div soho-sparkline [dataset]="data"></div>`
})
class SohoSparklineTestComponent {
  @ViewChild(SohoSparklineComponent) sparkline?: SohoSparklineComponent;

  public sparklineData1 = sparklineData1;
  public sparklineData2 = sparklineData2;
  public sparklineData3 = sparklineData3;
  public sparklineData4 = sparklineData4;
  public sparklineData5 = sparklineData5;
}

describe('Soho Sparkline Chart Render', () => {
  let fixture: ComponentFixture<SohoSparklineTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSparklineTestComponent],
      imports: [FormsModule, SohoSparklineModule]
    });

    fixture = TestBed.createComponent(SohoSparklineTestComponent);
    de = fixture.debugElement;
    el = de.query(By.css('[soho-sparkline]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('soho-sparkline')).toBeTruthy('soho-sparkline');
  });
});
