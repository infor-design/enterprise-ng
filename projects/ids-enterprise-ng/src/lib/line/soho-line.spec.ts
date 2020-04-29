/// <reference path="soho-line.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoLineModule } from './soho-line.module';
import { SohoLineComponent } from './soho-line.component';

const lineData = [{
    data: [{
        name: 'Aug:17 Week-1',
        value: 8
    }, {
        name: 'Aug:17 Week-2',
        value: 9
    }, {
        name: 'Aug:17 Week-3',
        value: 0
    }],
    name: 'Logins'
  },
  {
    data: [{
        name: 'Aug:17 Week-1',
        value: 7
    }, {
        name: 'Aug:17 Week-2',
        value: 14
    }, {
        name: 'Aug:17 Week-3',
        value: 0
    }],
    name: 'Logins'
  },
  {
    data: [{
        name: 'Aug:17 Week-1',
        value: 6
    }, {
        name: 'Aug:17 Week-2',
        value: 11
    }, {
        name: 'Aug:17 Week-3',
        value: 0
    }],
    name: 'Logins'
  }];

const updatedLineData = [ ...lineData, {
  data: [{
      name: 'Aug:17 Week-1',
      value: 1
  }, {
      name: 'Aug:17 Week-2',
      value: 2
  }, {
      name: 'Aug:17 Week-3',
      value: 2
  }],
  name: 'Failures'
}];

describe('Soho Line Unit Tests', () => {
  let comp:     SohoLineComponent;
  let fixture:  ComponentFixture<SohoLineComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoLineComponent ]
    });

    fixture = TestBed.createComponent(SohoLineComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const tooltip = 'A Tooltip';
    const dots = {number: 10, format: ',.1s'};
    const xAxis = { ticks: { number: 5, format: 'd' } };
    const yAxis = { ticks: 'auto' };
    const emptyMessage: SohoEmptyMessageOptions = {
      title: 'this chart has no data',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = lineData;
    comp.tooltip = tooltip;
    comp.isArea = false;
    comp.isBubble = false;
    comp.showLegend = false;
    comp.xAxis = xAxis;
    comp.yAxis = yAxis;
    comp.hideDots = false;
    comp.axisLabels = '.0f';
    comp.animate = false;
    comp.redrawOnResize = false;
    comp.dots = dots;
    comp.formatterString = 'd';
    comp.emptyMessage = emptyMessage;

    // check options
    expect((comp as any).options.dataset).toEqual(lineData, 'options.dataset');
    expect((comp as any).options.tooltip).toEqual(tooltip, 'options.tooltip');
    expect((comp as any).options.isArea).toEqual(false, 'options.isArea');
    expect((comp as any).options.isBubble).toEqual(false, 'options.isBubble');
    expect((comp as any).options.showLegend).toEqual(false, 'options.showLegend');
    expect((comp as any).options.xAxis).toEqual(xAxis, 'options.xAxis');
    expect((comp as any).options.yAxis).toEqual(yAxis, 'options.yAxis');
    expect((comp as any).options.hideDots).toEqual(false, 'options.hideDots');
    expect((comp as any).options.axisLabels).toEqual('.0f', 'options.axisLabels');
    expect((comp as any).options.animate).toEqual(false, 'options.animate');
    expect((comp as any).options.redrawOnResize).toEqual(false, 'options.redrawOnResize');
    expect((comp as any).options.dots).toEqual(dots, 'options.dots');
    expect((comp as any).options.formatterString).toEqual('d', 'options.formatterString');
    expect((comp as any).options.emptyMessage).toEqual(emptyMessage, 'options.emptyMessage');

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    const updatedTooltip = 'Another tooltip';
    const updatedDots = {number: 5, format: ',.1s'};
    const updatedXAxis = yAxis;
    const updatedYAxis = xAxis;
    const updatedEmptyMessage: SohoEmptyMessageOptions = {
      title: 'nothing to display',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = updatedLineData;
    comp.tooltip = updatedTooltip;
    comp.isArea = true;
    comp.isBubble = true;
    comp.showLegend = true;
    comp.xAxis = updatedXAxis;
    comp.yAxis = updatedYAxis;
    comp.hideDots = true;
    comp.axisLabels = '.1f';
    comp.animate = true;
    comp.redrawOnResize = true;
    comp.dots = updatedDots;
    comp.formatterString = '%';
    comp.emptyMessage = updatedEmptyMessage;

    // check bar settings
    expect((comp as any).line.settings.dataset).toEqual(updatedLineData, 'line.settings.dataset');
    expect((comp as any).line.settings.tooltip).toEqual(updatedTooltip, 'line.settings.tooltip');
    expect((comp as any).line.settings.isArea).toEqual(true, 'line.settings.isArea');
    expect((comp as any).line.settings.isBubble).toEqual(true, 'line.settings.isBubble');
    expect((comp as any).line.settings.showLegend).toEqual(true, 'line.settings.showLegend');
    expect((comp as any).line.settings.xAxis).toEqual(updatedXAxis, 'line.settings.xAxis');
    expect((comp as any).line.settings.yAxis).toEqual(updatedYAxis, 'line.settings.yAxis');
    expect((comp as any).line.settings.hideDots).toEqual(true, 'line.settings.hideDots');
    expect((comp as any).line.settings.axisLabels).toEqual('.1f', 'line.settings.axisLabels');
    expect((comp as any).line.settings.animate).toEqual(true, 'line.settings.animate');
    expect((comp as any).line.settings.redrawOnResize).toEqual(true, 'line.settings.redrawOnResize');
    expect((comp as any).line.settings.dots).toEqual(updatedDots, 'line.settings.dots');
    expect((comp as any).line.settings.formatterString).toEqual('%', 'line.settings.formatterString');
    expect((comp as any).line.settings.emptyMessage).toEqual(updatedEmptyMessage, 'line.settings.emptyMessage');

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);
  });

  it('check public functions', () => {
    comp.dataset = lineData;
    fixture.detectChanges();

    comp.toggleSelected({ groupIndex: 1 });
    expect(comp.getSelected()[0].data.name).toEqual(lineData[1].name);

    comp.setSelected({ groupIndex: 2 });
    expect(comp.getSelected()[0].data.name).toEqual(lineData[2].name);
  });
});

@Component({
  template: `<div soho-line [dataset]="data"></div>`
})
class SohoLineTestComponent {
  @ViewChild(SohoLineComponent) line: SohoLineComponent;
  public data = [{}];
}

describe('Soho line Chart Render', () => {
  let line:  SohoLineComponent;
  let component: SohoLineTestComponent;
  let fixture:   ComponentFixture<SohoLineTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoLineTestComponent ],
      imports: [ FormsModule, SohoLineModule ]
    });

    fixture = TestBed.createComponent(SohoLineTestComponent);
    component = fixture.componentInstance;
    line = component.line;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-line]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-line')).toBeTruthy('soho-line');
  });

});
