import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoRadarModule } from './soho-radar.module';
import { SohoRadarComponent } from './soho-radar.component';

const radarData = [{
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
    { name: 'Cost', value: 0.31 },
    { name: 'Design', value: 0.14 },
    { name: 'Price', value: 0.41 }
  ],
  name: 'Smartphone',
  id: '3'
}];

const updatedRadarData = [...radarData, {
  data: [
    { name: 'BatteryLife ', value: 0.62 },
    { name: 'Brand', value: 0.40 },
    { name: 'Cost', value: 0.81 },
    { name: 'Design', value: 0.13 },
    { name: 'Price', value: 0.95 }
  ],
  name: 'Smart Car',
  id: '4'
}];

describe('Soho Radar Unit Tests', () => {
  let comp: SohoRadarComponent;
  let fixture: ComponentFixture<SohoRadarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRadarComponent]
    });

    fixture = TestBed.createComponent(SohoRadarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const tooltip = { show: 'A Tooltip', formatter: '%d' };
    const margin = {};
    const emptyMessage: SohoEmptyMessageOptions = {
      title: 'this chart has no data',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = radarData;
    comp.redrawOnResize = false;
    comp.margin = margin;
    comp.levels = 1;
    comp.maxValue = .2;
    comp.labelFactor = 1;
    comp.wrapWidth = 100;
    comp.opacityArea = .9;
    comp.dotRadius = 1;
    comp.opacityCircles = .9;
    comp.strokeWidth = 1;
    comp.roundStrokes = false;
    comp.showCrosslines = false;
    comp.showAxisLabels = false;
    comp.colors = false;
    comp.showTooltips = false;
    comp.tooltip = tooltip;
    comp.axisFormatter = '%';
    comp.showLegend = false;
    comp.legendPlacement = 'right';
    comp.emptyMessage = emptyMessage;

    // check options
    expect((comp as any).options.dataset).toEqual(radarData);
    expect((comp as any).options.redrawOnResize).toEqual(false);
    expect((comp as any).options.margin).toEqual(margin);
    expect((comp as any).options.levels).toEqual(1);
    expect((comp as any).options.maxValue).toEqual(.2);
    expect((comp as any).options.labelFactor).toEqual(1);
    expect((comp as any).options.wrapWidth).toEqual(100);
    expect((comp as any).options.opacityArea).toEqual(.9);
    expect((comp as any).options.dotRadius).toEqual(1);
    expect((comp as any).options.opacityCircles).toEqual(.9);
    expect((comp as any).options.strokeWidth).toEqual(1);
    expect((comp as any).options.roundStrokes).toEqual(false);
    expect((comp as any).options.showCrosslines).toEqual(false);
    expect((comp as any).options.showAxisLabels).toEqual(false);
    expect((comp as any).options.colors).toEqual(false);
    expect((comp as any).options.showTooltips).toEqual(false);
    expect((comp as any).options.tooltip).toEqual(tooltip);
    expect((comp as any).options.axisFormatter).toEqual('%');
    expect((comp as any).options.showLegend).toEqual(false);
    expect((comp as any).options.legendPlacement).toEqual('right');
    expect((comp as any).options.emptyMessage).toEqual(emptyMessage);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    const updatedTooltip = { show: 'A different tooltip', formatter: '%s' };
    const updatedMargin = {};
    const updatedEmptyMessage: SohoEmptyMessageOptions = {
      title: 'nothing to display',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = updatedRadarData;
    comp.redrawOnResize = true;
    comp.margin = updatedMargin;
    comp.levels = 2;
    comp.maxValue = .3;
    comp.labelFactor = 1.2;
    comp.wrapWidth = 200;
    comp.opacityArea = .1;
    comp.dotRadius = 1.2;
    comp.opacityCircles = .3;
    comp.strokeWidth = 1.2;
    comp.roundStrokes = true;
    comp.showCrosslines = true;
    comp.showAxisLabels = true;
    comp.colors = true;
    comp.showTooltips = true;
    comp.tooltip = updatedTooltip;
    comp.axisFormatter = 'd';
    comp.showLegend = true;
    comp.legendPlacement = 'bottom';
    comp.emptyMessage = updatedEmptyMessage;

    // check radar settings
    expect((comp as any).radar.settings.dataset).toEqual(updatedRadarData);
    expect((comp as any).radar.settings.redrawOnResize).toEqual(true);
    expect((comp as any).radar.settings.margin).toEqual(updatedMargin);
    expect((comp as any).radar.settings.levels).toEqual(2);
    expect((comp as any).radar.settings.maxValue).toEqual(.3);
    expect((comp as any).radar.settings.labelFactor).toEqual(1.2);
    expect((comp as any).radar.settings.wrapWidth).toEqual(200);
    expect((comp as any).radar.settings.opacityArea).toEqual(.1);
    expect((comp as any).radar.settings.dotRadius).toEqual(1.2);
    expect((comp as any).radar.settings.opacityCircles).toEqual(.3);
    expect((comp as any).radar.settings.strokeWidth).toEqual(1.2);
    expect((comp as any).radar.settings.roundStrokes).toEqual(true);
    expect((comp as any).radar.settings.showCrosslines).toEqual(true);
    expect((comp as any).radar.settings.showAxisLabels).toEqual(true);
    expect((comp as any).radar.settings.colors).toEqual(true);
    expect((comp as any).radar.settings.showTooltips).toEqual(true);
    expect((comp as any).radar.settings.tooltip).toEqual(updatedTooltip);
    expect((comp as any).radar.settings.axisFormatter).toEqual('d');
    expect((comp as any).radar.settings.showLegend).toEqual(true);
    expect((comp as any).radar.settings.legendPlacement).toEqual('bottom');
    expect((comp as any).radar.settings.emptyMessage).toEqual(updatedEmptyMessage);

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>((comp as any).radar, 'updated').and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<div soho-radar [dataset]="data"></div>`
})
class SohoRadarTestComponent {
  @ViewChild(SohoRadarComponent) radar?: SohoRadarComponent;
  public data = radarData;
}

describe('Soho Radar Chart Render', () => {
  let fixture: ComponentFixture<SohoRadarTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRadarTestComponent],
      imports: [FormsModule, SohoRadarModule]
    });

    fixture = TestBed.createComponent(SohoRadarTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('[soho-radar]')).nativeElement;
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-radar')).toBeTruthy('soho-radar');
  });
});
