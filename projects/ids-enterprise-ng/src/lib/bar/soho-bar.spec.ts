import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBarModule } from './soho-bar.module';
import { SohoBarComponent } from './soho-bar.component';

const barData = [
  {
    data: [
      {
        name: 'Category A',
        value: 373,
        url: 'test'
      },
      {
        name: 'Category B',
        value: 372
      },
      {
        name: 'Category C',
        value: 236.35
      }
    ],
    name: ''
  }
];

describe('Soho Bar Unit Tests', () => {
  let comp: SohoBarComponent;
  let fixture: ComponentFixture<SohoBarComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBarComponent]
    });

    // Ouch!
    const ngZone = TestBed.inject(NgZone);
    spyOn(ngZone, 'runOutsideAngular').and.callFake((fn: Function) => fn());

    fixture = TestBed.createComponent(SohoBarComponent);

    comp = fixture.componentInstance;

    expect(comp).toBeDefined();

    de = fixture.debugElement;
    el = de.nativeElement;
    fixture.detectChanges();
  });

  // Excluded due to the bar widget nor being initialised.
  xit('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  // Excluded due to the bar widget nor being initialised.
  xit('check inputs', () => {
    const ticks = { number: 10, format: ',.1s' };
    const emptyMessage: SohoEmptyMessageOptions = {
      title: 'this chart has no data',
      icon: 'icon-empty-no-data'
    };

    comp.dataset = barData;
    comp.type = 'bar';
    comp.isNormalized = false;
    comp.isStacked = false;
    comp.isGrouped = false;
    comp.showLegend = false;
    comp.animate = false;
    comp.redrawOnResize = false;
    comp.formatterString = 'd';
    comp.format = '.0f';
    comp.tooltip = 'A Tooltip';
    comp.useLogScale = false;
    comp.ticks = ticks;
    comp.showLines = false;
    comp.labelFactor = 1;
    comp.wrapWidth = 180;
    comp.emptyMessage = emptyMessage;

    fixture.detectChanges();

    // check options
    expect((comp as any).options.dataset).toEqual(barData);
    expect((comp as any).options.type).toEqual('bar');
    expect((comp as any).options.isNormalized).toEqual(false);
    expect((comp as any).options.isStacked).toEqual(false);
    expect((comp as any).options.isGrouped).toEqual(false);
    expect((comp as any).options.showLegend).toEqual(false);
    expect((comp as any).options.animate).toEqual(false);
    expect((comp as any).options.redrawOnResize).toEqual(false);
    expect((comp as any).options.formatterString).toEqual('d');
    expect((comp as any).options.format).toEqual('.0f');
    expect((comp as any).options.tooltip).toEqual('A Tooltip');
    expect((comp as any).options.useLogScale).toEqual(false);
    expect((comp as any).options.ticks).toEqual(ticks);
    expect((comp as any).options.showLines).toEqual(false);
    expect((comp as any).options.labelFactor).toEqual(1);
    expect((comp as any).options.wrapWidth).toEqual(180);
    expect((comp as any).options.emptyMessage).toEqual(emptyMessage);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    const updatedBarData = [...barData];
    updatedBarData[0].data = [
      ...updatedBarData[0].data,
      { name: 'Category D', value: 415.21 }
    ];
    const updatedTicks = { number: 5, format: ',.1s' };
    const updatedEmptyMessage: SohoEmptyMessageOptions = {
      title: 'nothing to display',
      icon: 'icon-empty-no-data'
    };

    comp.dataset = updatedBarData;
    comp.type = 'bar-grouped';
    comp.isNormalized = true;
    comp.isStacked = true;
    comp.isGrouped = true;
    comp.showLegend = true;
    comp.animate = true;
    comp.redrawOnResize = true;
    comp.formatterString = '%';
    comp.format = '.2f';
    comp.tooltip = 'Another Tooltip';
    comp.useLogScale = true;
    comp.ticks = updatedTicks;
    comp.showLines = true;
    comp.labelFactor = 2;
    comp.wrapWidth = 200;
    comp.emptyMessage = updatedEmptyMessage;

    fixture.detectChanges();
    fixture.detectChanges();
    fixture.detectChanges();
    fixture.isStable();

    expect((comp as any).bar).toBeDefined(
      'bar widget not set on bar component'
    );

    // check bar settings
    expect((comp as any).bar.settings.dataset).toEqual(updatedBarData);
    expect((comp as any).bar.settings.type).toEqual('bar-grouped');
    expect((comp as any).bar.settings.isNormalized).toEqual(true);
    expect((comp as any).bar.settings.isStacked).toEqual(true);
    expect((comp as any).bar.settings.isGrouped).toEqual(true);
    expect((comp as any).bar.settings.showLegend).toEqual(true);
    expect((comp as any).bar.settings.animate).toEqual(true);
    expect((comp as any).bar.settings.redrawOnResize).toEqual(true);
    expect((comp as any).bar.settings.formatterString).toEqual('%');
    expect((comp as any).bar.settings.format).toEqual('.2f');
    expect((comp as any).bar.settings.tooltip).toEqual('Another Tooltip');
    expect((comp as any).bar.settings.useLogScale).toEqual(true);
    expect((comp as any).bar.settings.ticks).toEqual(updatedTicks);
    expect((comp as any).bar.settings.showLines).toEqual(true);
    expect((comp as any).bar.settings.labelFactor).toEqual(2);
    expect((comp as any).bar.settings.wrapWidth).toEqual(200);
    expect((comp as any).bar.settings.emptyMessage).toEqual(
      updatedEmptyMessage
    );

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>(
      (comp as any).bar,
      'updated'
    ).and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `
    <div soho-bar [dataset]="data"></div>
  `
})
class SohoBarTestComponent {
  @ViewChild(SohoBarComponent) bar?: SohoBarComponent;
  public data = barData;
}

describe('Soho Bar Chart Render', () => {
  let fixture: ComponentFixture<SohoBarTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBarTestComponent],
      imports: [FormsModule, SohoBarModule]
    });

    fixture = TestBed.createComponent(SohoBarTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('[soho-bar]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-bar')).toBeTruthy('soho-bar');
  });
});
