import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoTreemapModule } from './soho-treemap.module';
import { SohoTreemapComponent } from './soho-treemap.component';

describe('Soho Tree Map Unit Tests', () => {
  let comp:     SohoTreemapComponent;
  let fixture:  ComponentFixture<SohoTreemapComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoTreemapComponent ]
    });

    fixture = TestBed.createComponent(SohoTreemapComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-treemap [dataset]="data">`
})
class SohoTreemapTestComponent {
  @ViewChild(SohoTreemapComponent) treemap: SohoTreemapComponent;

  public data = [{
    data: {
      'name': 'Storage Utilization (78 GB)',
      'children': [
      {
        'name': 'by type',
        'children': [
        {
          'name': 'type1',
          'children': [
            {'name': 'JSON', 'value': 3400}
          ]
        }, {
          'name': 'type2',
          'children': [
            {'name': 'PDF', 'value': 2200}
          ]
        }, {
          'name': 'type3',
          'children': [
            {'name': 'BOD', 'value': 1000}
          ]
        }, {
          'name': 'type4',
          'children': [
            {'name': 'TXT', 'value': 1000}
          ]
        }, {
          'name': 'type5',
          'children': [
            {'name': 'CSV', 'value': 2000}
          ]
        }, {
          'name': 'type6',
          'children': [
            {'name': 'Assets', 'value': 800}
          ]
        }, {
          'name': 'type7',
          'children': [
            {'name': 'Others', 'value': 1700}
          ]
        }]
      }]
    }
  }];
}

describe('Soho Tree Map Render', () => {
  let treemap:  SohoTreemapComponent;
  let component: SohoTreemapTestComponent;
  let fixture:   ComponentFixture<SohoTreemapTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoTreemapTestComponent ],
      imports: [ FormsModule, SohoTreemapModule ]
    });

    fixture = TestBed.createComponent(SohoTreemapTestComponent);
    component = fixture.componentInstance;
    treemap = component.treemap;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-treemap]')).nativeElement;
    fixture.detectChanges();

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-treemap')).toBeTruthy('soho-treemap');
  });

});
