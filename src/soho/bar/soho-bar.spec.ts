import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBarModule } from './soho-bar.module';
import { SohoBarComponent } from './soho-bar.component';

describe('Soho Bar Unit Tests', () => {
  let comp:     SohoBarComponent;
  let fixture:  ComponentFixture<SohoBarComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBarComponent ]
    });

    fixture = TestBed.createComponent(SohoBarComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-bar [dataset]="data">`
})
class SohoBarTestComponent {
  @ViewChild(SohoBarComponent) bar: SohoBarComponent;

  public data = [{
    data: [{
      name: 'Category A',
      value: 373,
      url: 'test'
      }, {
        name: 'Category B',
        value: 372
      }, {
        name: 'Category C',
        value: 236.35
    }],
    name: ''
  }];

}

describe('Soho Bar Chart Render', () => {
  let bar:  SohoBarComponent;
  let component: SohoBarTestComponent;
  let fixture:   ComponentFixture<SohoBarTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBarTestComponent ],
      imports: [ FormsModule, SohoBarModule ]
    });

    fixture = TestBed.createComponent(SohoBarTestComponent);
    component = fixture.componentInstance;
    bar = component.bar;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-bar]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-bar')).toBeTruthy('soho-bar');
  });

});
