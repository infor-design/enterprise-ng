import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoLineModule } from './soho-line.module';
import { SohoLineComponent } from './soho-line.component';

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
});

@Component({
  template: `<div soho-line [dataset]="data">`
})
class SohoLineTestComponent {
  @ViewChild(SohoLineComponent) line: SohoLineComponent;

  public data = [{
  }];

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
