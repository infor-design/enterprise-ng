import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoColumnModule } from './soho-column.module';
import { SohoColumnComponent } from './soho-column.component';

describe('Soho Column Unit Tests', () => {
  let comp:     SohoColumnComponent;
  let fixture:  ComponentFixture<SohoColumnComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoColumnComponent ]
    });

    fixture = TestBed.createComponent(SohoColumnComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-column [dataset]="data">`
})
class SohoColumnTestComponent {
  @ViewChild(SohoColumnComponent) column: SohoColumnComponent;

  public data = [{
    data: [{
      name: 'Automotive',
      shortName: 'Auto',
      abbrName: 'A',
      value: 7,
      tooltip: 'Custom Tooltip - {{value}}'
    }, {
      name: 'Distribution',
      shortName: 'Dist',
      abbrName: 'D',
      value: 10
    }, {
      name: 'Equipment',
      shortName: 'Equip',
      abbrName: 'E',
      value: 14
    }, {
      name: 'Fashion',
      shortName: 'Fash',
      abbrName: 'F',
      value: 10
    }, {
      name: 'Food',
      shortName: 'Food',
      abbrName: 'F',
      value: 14
    }, {
      name: 'Healthcare',
      shortName: 'Health',
      abbrName: 'H',
      value: 8
    }, {
      name: 'Other',
      shortName: 'Other',
      abbrName: 'O',
      value: 7
    }]
  }];

}

describe('Soho Column Chart Render', () => {
  let column:  SohoColumnComponent;
  let component: SohoColumnTestComponent;
  let fixture:   ComponentFixture<SohoColumnTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoColumnTestComponent ],
      imports: [ FormsModule, SohoColumnModule ]
    });

    fixture = TestBed.createComponent(SohoColumnTestComponent);
    component = fixture.componentInstance;
    column = component.column;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-column]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-column')).toBeTruthy('soho-column');
  });

});
