import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoSparklineModule } from './soho-sparkline.module';
import { SohoSparklineComponent } from './soho-sparkline.component';

@Component({
  template: `<div soho-sparkline [dataset]="data">`
})
class SohoSparklineTestComponent {
  @ViewChild(SohoSparklineComponent) sparkline: SohoSparklineComponent;

  public sparklineData1 = [{
    data: [25, 20, 55, 28, 41, 30, 50, 27, 24, 27],
    name: 'Inventory'
  }];

  public sparklineData2 = [{
    data: [25, 20, 55, 28, 41, 30, 50, 27, 24, 27],
    name: 'Inventory'
  }];

  public sparklineData3 = [{
    data: [40, 30, 40, 16, 50, 17, 15, 39, 15, 18],
    name: 'Demand'
  }];

  public sparklineData4 = [{
    data: [25, 20, 61, 28, 10, 30, 50, 35, 13, 27],
    name: 'Inventory'
  }];

  public sparklineData5 = [{
    data: [25, 20, 55, 28, 41, 30, 50, 22, 16, 27],
    name: 'Inventory'
  }];
}

describe('Soho Sparkline Unit Tests', () => {
  let comp:     SohoSparklineComponent;
  let fixture:  ComponentFixture<SohoSparklineComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoSparklineComponent ]
    });

    fixture = TestBed.createComponent(SohoSparklineComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

describe('Soho Sparkline Chart Render', () => {
  let sparkline: SohoSparklineComponent;
  let component: SohoSparklineTestComponent;
  let fixture:   ComponentFixture<SohoSparklineTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoSparklineTestComponent ],
      imports: [ FormsModule, SohoSparklineModule ]
    });

    fixture = TestBed.createComponent(SohoSparklineTestComponent);
    component = fixture.componentInstance;
    sparkline = component.sparkline;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-sparkline]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('soho-sparkline')).toBeTruthy('soho-sparkline');
  });

});
