import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoRadarModule } from './soho-radar.module';
import { SohoRadarComponent } from './soho-radar.component';

describe('Soho Radar Unit Tests', () => {
  let comp:     SohoRadarComponent;
  let fixture:  ComponentFixture<SohoRadarComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoRadarComponent ]
    });

    fixture = TestBed.createComponent(SohoRadarComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-radar [dataset]="data">`
})
class SohoRadarTestComponent {
  @ViewChild(SohoRadarComponent) radar: SohoRadarComponent;

  public data = [{
    data: [
      {name: 'Battery Life', value: 0.22},
      {name: 'Brand', value: 0.28},
      {name: 'Cost', value: 0.29},
      {name: 'Design', value: 0.17},
      {name: 'Price', value: 0.21}
    ],
    name: 'iPhone XI',
    id: '1'
  }, {
    data: [
      {name: 'Battery Life', value: 0.21},
      {name: 'Brand', value: 0.21},
      {name: 'Cost', value: 0.35},
      {name: 'Design', value: 0.13},
      {name: 'Price', value: 0.35}
    ],
    name: 'Some Samsung',
    id: '2'
  }, {
    data: [
      {name: 'BatteryLife ', value: 0.12},
      {name: 'Brand', value: 0.10},
      {name: 'Contract', value: 0.31},
      {name: 'Design', value: 0.14},
      {name: 'Price', value: 0.41}
    ],
    name: 'Smartphone',
    id: '3'
  }];

}

describe('Soho Radar Chart Render', () => {
  let radar:  SohoRadarComponent;
  let component: SohoRadarTestComponent;
  let fixture:   ComponentFixture<SohoRadarTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoRadarTestComponent ],
      imports: [ FormsModule, SohoRadarModule ]
    });

    fixture = TestBed.createComponent(SohoRadarTestComponent);
    component = fixture.componentInstance;
    radar = component.radar;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-radar]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-radar')).toBeTruthy('soho-radar');
  });

});
