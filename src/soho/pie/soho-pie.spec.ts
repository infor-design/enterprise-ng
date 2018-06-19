import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoPieModule } from './soho-pie.module';
import { SohoPieComponent } from './soho-pie.component';

describe('Soho Radar Unit Tests', () => {
  let comp:     SohoPieComponent;
  let fixture:  ComponentFixture<SohoPieComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoPieComponent ]
    });

    fixture = TestBed.createComponent(SohoPieComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-pie [dataset]="data"></div>`
})
class SohoPieTestComponent {
  @ViewChild(SohoPieComponent) pie: SohoPieComponent;

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

describe('Soho Pie Chart Render', () => {
  let component: SohoPieTestComponent;
  let fixture:   ComponentFixture<SohoPieTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoPieTestComponent ],
      imports: [ FormsModule, SohoPieModule ]
    });

    fixture = TestBed.createComponent(SohoPieTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-pie]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-pie')).toBeTruthy('soho-pie');
  });

});
