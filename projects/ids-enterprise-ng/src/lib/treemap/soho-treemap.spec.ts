import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoTreemapModule } from './soho-treemap.module';
import { SohoTreemapComponent } from './soho-treemap.component';

const treeData = [{
  data: {
    name: 'Storage Utilization (78 GB)',
    children: [
      {
        name: 'by type',
        children: [
          {
            name: 'type1',
            children: [
              { name: 'JSON', value: 3400 }
            ]
          }, {
            name: 'type2',
            children: [
              { name: 'PDF', value: 2200 }
            ]
          }, {
            name: 'type3',
            children: [
              { name: 'BOD', value: 1000 }
            ]
          }, {
            name: 'type4',
            children: [
              { name: 'TXT', value: 1000 }
            ]
          }, {
            name: 'type5',
            children: [
              { name: 'CSV', value: 2000 }
            ]
          }, {
            name: 'type6',
            children: [
              { name: 'Assets', value: 800 }
            ]
          }, {
            name: 'type7',
            children: [
              { name: 'Others', value: 1700 }
            ]
          }]
      }]
  }
}];

describe('Soho Tree Map Unit Tests', () => {
  let comp: SohoTreemapComponent;
  let fixture: ComponentFixture<SohoTreemapComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTreemapComponent]
    });

    fixture = TestBed.createComponent(SohoTreemapComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const margin: any = [];
    const colors: any = [];
    const emptyMessage: SohoEmptyMessageOptions = {
      title: 'this chart has no data',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = treeData;
    comp.redrawOnResize = false;
    comp.margin = margin;
    comp.colors = colors;
    comp.showLabel = false;
    comp.labelFormatter = 'd';
    comp.showTitle = false;
    comp.emptyMessage = emptyMessage;

    // check options
    expect((comp as any).options.dataset).toEqual(treeData);
    expect((comp as any).options.redrawOnResize).toEqual(false);
    expect((comp as any).options.margin).toEqual(margin);
    expect((comp as any).options.colors).toEqual(colors);
    expect((comp as any).options.showLabel).toEqual(false);
    expect((comp as any).options.labelFormatter).toEqual('d');
    expect((comp as any).options.showTitle).toEqual(false);
    expect((comp as any).options.emptyMessage).toEqual(emptyMessage);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    const updatedTreeData = [...treeData];
    const updatedMargin: any = [];
    const updatedColors: any = [];
    const updatedEmptyMessage: SohoEmptyMessageOptions = {
      title: 'nothing to display',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = updatedTreeData;
    comp.redrawOnResize = true;
    comp.margin = updatedMargin;
    comp.colors = updatedColors;
    comp.showLabel = true;
    comp.labelFormatter = '%';
    comp.showTitle = true;
    comp.emptyMessage = updatedEmptyMessage;

    // check bar settings
    expect((comp as any).treemap.settings.dataset).toEqual(updatedTreeData);
    expect((comp as any).treemap.settings.redrawOnResize).toEqual(true);
    expect((comp as any).treemap.settings.margin).toEqual(updatedMargin);
    expect((comp as any).treemap.settings.colors).toEqual(updatedColors);
    expect((comp as any).treemap.settings.showLabel).toEqual(true);
    expect((comp as any).treemap.settings.labelFormatter).toEqual('%');
    expect((comp as any).treemap.settings.showTitle).toEqual(true);
    expect((comp as any).treemap.settings.emptyMessage).toEqual(updatedEmptyMessage);

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>((comp as any).treemap, 'updated').and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<div soho-treemap [dataset]="data"></div>`
})
class SohoTreemapTestComponent {
  @ViewChild(SohoTreemapComponent, { static: true }) treemap?: SohoTreemapComponent;
  public data = treeData;
}

describe('Soho Tree Map Render', () => {
  let fixture: ComponentFixture<SohoTreemapTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTreemapTestComponent],
      imports: [FormsModule, SohoTreemapModule]
    });

    fixture = TestBed.createComponent(SohoTreemapTestComponent);
    de = fixture.debugElement;
    el = de.query(By.css('[soho-treemap]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-treemap')).toBeTruthy('soho-treemap');
  });
});
