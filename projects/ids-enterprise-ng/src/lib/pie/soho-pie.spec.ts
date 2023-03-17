import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoPieModule } from './soho-pie.module';
import { SohoPieComponent } from './soho-pie.component';

const pieData = [{
  data: [
    { name: 'Battery Life', value: 0.22 },
    { name: 'Brand', value: 0.28 },
    { name: 'Cost', value: 0.29 },
    { name: 'Design', value: 0.17 },
    { name: 'Price', value: 0.21 }
  ],
  name: 'iPhone XI',
  id: '1'
}, {
  data: [
    { name: 'Battery Life', value: 0.21 },
    { name: 'Brand', value: 0.21 },
    { name: 'Cost', value: 0.35 },
    { name: 'Design', value: 0.13 },
    { name: 'Price', value: 0.35 }
  ],
  name: 'Some Samsung',
  id: '2'
}, {
  data: [
    { name: 'BatteryLife ', value: 0.12 },
    { name: 'Brand', value: 0.10 },
    { name: 'Contract', value: 0.31 },
    { name: 'Design', value: 0.14 },
    { name: 'Price', value: 0.41 }
  ],
  name: 'Smartphone',
  id: '3'
}];

const otherPieData = [...pieData, {
  data: [
    { name: 'Battery Life', value: 0.22 },
    { name: 'Brand', value: 0.28 },
    { name: 'Cost', value: 0.29 },
    { name: 'Design', value: 0.17 },
    { name: 'Price', value: 0.21 }
  ],
  name: 'iPhone XI',
  id: '1'
}];

describe('Soho Pie Unit Tests', () => {
  let comp: SohoPieComponent;
  let fixture: ComponentFixture<SohoPieComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPieComponent]
    });

    fixture = TestBed.createComponent(SohoPieComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const displayOptions = { show: 'label', formatter: '.0f' };
    comp.dataset = pieData;
    comp.isDonut = false;
    comp.animate = false;
    comp.redrawOnResize = false;
    comp.hideCenterLabel = false;
    comp.showLines = false;
    comp.showLinesMobile = false;
    comp.showLegend = false;
    comp.showTooltips = false;
    comp.animationSpeed = 10;
    comp.legendPlacement = 'left';
    comp.lines = displayOptions;
    comp.legend = displayOptions;
    comp.tooltip = displayOptions;

    // check options
    expect((comp as any).options.dataset).toEqual(pieData);
    expect((comp as any).options.isDonut).toEqual(false);
    expect((comp as any).options.animate).toEqual(false);
    expect((comp as any).options.redrawOnResize).toEqual(false);
    expect((comp as any).options.hideCenterLabel).toEqual(false);
    expect((comp as any).options.showLines).toEqual(false);
    expect((comp as any).options.showLinesMobile).toEqual(false);
    expect((comp as any).options.showLegend).toEqual(false);
    expect((comp as any).options.showTooltips).toEqual(false);
    expect((comp as any).options.animationSpeed).toEqual(10);
    expect((comp as any).options.legendPlacement).toEqual('left');
    expect((comp as any).options.lines).toEqual(displayOptions);
    expect((comp as any).options.legend).toEqual(displayOptions);
    expect((comp as any).options.tooltip).toEqual(displayOptions);

    // detect changes to cause pie chart to be built.
    fixture.detectChanges();

    // once pie chart is built setting input should cause pie.settings to update
    const otherDisplayOptions = { show: 'value', formatter: '.0f' };
    comp.dataset = otherPieData;
    comp.isDonut = true;
    comp.animate = true;
    comp.redrawOnResize = true;
    comp.hideCenterLabel = true;
    comp.showLines = true;
    comp.showLinesMobile = true;
    comp.showLegend = true;
    comp.showTooltips = true;
    comp.animationSpeed = 20;
    comp.legendPlacement = 'right';
    comp.lines = otherDisplayOptions;
    comp.legend = otherDisplayOptions;
    comp.tooltip = otherDisplayOptions;

    // check pie settings
    expect((comp as any).pie.settings.dataset).toEqual(otherPieData);
    expect((comp as any).pie.settings.isDonut).toEqual(true);
    expect((comp as any).pie.settings.animate).toEqual(true);
    expect((comp as any).pie.settings.redrawOnResize).toEqual(true);
    expect((comp as any).pie.settings.hideCenterLabel).toEqual(true);
    expect((comp as any).pie.settings.showLines).toEqual(true);
    expect((comp as any).pie.settings.showLinesMobile).toEqual(true);
    expect((comp as any).pie.settings.showLegend).toEqual(true);
    expect((comp as any).pie.settings.showTooltips).toEqual(true);
    expect((comp as any).pie.settings.animationSpeed).toEqual(20);
    expect((comp as any).pie.settings.legendPlacement).toEqual('right');
    expect((comp as any).pie.settings.lines).toEqual(otherDisplayOptions);
    expect((comp as any).pie.settings.legend).toEqual(otherDisplayOptions);
    expect((comp as any).pie.settings.tooltip).toEqual(otherDisplayOptions);

    // update required should be true after updating inputs after pie is built.
    expect((comp as any).updateRequired).toEqual(true);

    // spy on updated() function to make sure it's called as a resutl of the updateRequired flag.
    const pieUpdatedSpy = spyOn<any>((comp as any).pie, 'updated').and.callThrough();

    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(pieUpdatedSpy).toHaveBeenCalledTimes(1);
  });
  //   // checking dataset before init of pieChart
  //   comp.dataset = pieData;
  //   fixture.detectChanges();
  //   expect<any>((comp as any).pie.settings.dataset).toEqual(pieData);
  //
  //   comp.dataset = otherPieData;
  //   expect((comp as any).updateRequired).toEqual(true);
  //   fixture.detectChanges();
  //   expect((comp as any).updateRequired).toEqual(false);
  //   expect<any>((comp as any).options.dataset).toEqual(otherPieData);
  // });
  //
  // xit('set isDonut', () => {
  //   comp.dataset = pieData;
  //   comp.isDonut = true;
  //   fixture.detectChanges();
  //   expect<any>((comp as any).pie.settings.dataset).toEqual(pieData);
  //
  //   comp.isDonut = false;
  //   expect((comp as any).updateRequired).toEqual(true);
  //   fixture.detectChanges();
  //   expect((comp as any).updateRequired).toEqual(false);
  // });
});

@Component({
  template: `<div soho-pie [dataset]="data"></div>`
})
class SohoPieTestComponent {
  @ViewChild(SohoPieComponent) pie?: SohoPieComponent;
  public data = pieData;
}

describe('Soho Pie Chart Render', () => {
  let fixture: ComponentFixture<SohoPieTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPieTestComponent],
      imports: [FormsModule, SohoPieModule]
    });

    fixture = TestBed.createComponent(SohoPieTestComponent);
    de = fixture.debugElement;
    el = de.query(By.css('[soho-pie]')).nativeElement;
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-pie')).toBeTruthy('soho-pie');
  });
});
