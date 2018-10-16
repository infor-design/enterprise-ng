/// <reference path="soho-column.d.ts" />

import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoColumnModule } from './soho-column.module';
import { SohoColumnComponent } from './soho-column.component';

describe('Soho Column Unit Tests', () => {
  let fixture:  ComponentFixture<SohoColumnComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoColumnComponent ]
    });

    fixture = TestBed.createComponent(SohoColumnComponent);

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `
  <div class="row top-padding">
    <div class="two-thirds column">
      <div class="widget">
        <div class="widget-header">
          <h2 class="widget-title">Column Chart Title</h2>
        </div>
        <div class="widget-content">
          <div soho-column [dataset]="data" [type]="chartType">
        </div>
      </div>
    </div>
  </div>`
})
class SohoColumnTestComponent {
  @ViewChild(SohoColumnComponent) column: SohoColumnComponent;

  public chartType = 'column';

  public data = [{
    data: [{
      name: 'Automotive',
      shortName: 'Auto',
      abbrName: 'A',
      value: .8,
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
      value: 8.2
    }, {
      name: 'Other',
      shortName: 'Other',
      abbrName: 'O',
      value: 7.9
    }]
  }];

  public _yAxis: object;
  @Input() set yAxis(yAxis: object) {
    this._yAxis = yAxis;
    if (this.column) {
      this.column.yAxis = this._yAxis;
    }
  }

  public _dataset: Array<any>;
  @Input() set dataset(dataset: Array<any>) {
    this._dataset = dataset;
    if (this.column) {
      this.column.dataset = this._dataset;
    }
  }
}

describe('Soho Column Chart Render', () => {
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
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.query(By.css('[soho-column]')).nativeElement;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('soho-column')).toBeTruthy('soho-column');
  });

  it('Check it can format yAxis content', (done) => {
    component.dataset = [{
        data: [{
          name: 'Automotive',
          shortName: 'Auto',
          abbrName: 'A',
          value: 0.7,
          tooltip: 'Custom Tooltip - {{value}}'
        }, {
          name: 'Distribution',
          shortName: 'Dist',
          abbrName: 'D',
          value: 0.10
        }, {
          name: 'Equipment',
          shortName: 'Equip',
          abbrName: 'E',
          value: 1.4
        }, {
          name: 'Fashion',
          shortName: 'Fash',
          abbrName: 'F',
          value: 1.0
        }, {
          name: 'Food',
          shortName: 'Food',
          abbrName: 'F',
          value: 0.14
        }, {
          name: 'Healthcare',
          shortName: 'Health',
          abbrName: 'H',
          value: 4.8
        }, {
          name: 'Other',
          shortName: 'Other',
          abbrName: 'O',
          value: 2.7
        }]
      }];

    component.yAxis = {
      ticks: {
        number: 5, // Tip: round max data value
        format: 'd'
      }
    };
    fixture.detectChanges();

    // Wait for animation
    setTimeout(function () {
      expect(document.querySelectorAll('.y.axis .tick').length).toEqual(6);
      expect(document.querySelectorAll('.y.axis .tick text')[0].innerHTML).toEqual('0');
      expect(document.querySelectorAll('.y.axis .tick text')[1].innerHTML).toEqual('1');
      expect(document.querySelectorAll('.y.axis .tick text')[2].innerHTML).toEqual('2');
      expect(document.querySelectorAll('.y.axis .tick text')[3].innerHTML).toEqual('3');
      expect(document.querySelectorAll('.y.axis .tick text')[4].innerHTML).toEqual('4');
      expect(document.querySelectorAll('.y.axis .tick text')[5].innerHTML).toEqual('5');
      done();
    }, 500);
  });

});
