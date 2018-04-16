import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoCirclepagerModule } from './soho-circlepager.module';
import { SohoCirclepagerComponent } from './soho-circlepager.component';

describe('Soho Circle Pager Unit Tests', () => {
  let comp:     SohoCirclepagerComponent;
  let fixture:  ComponentFixture<SohoCirclepagerComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoCirclepagerComponent ]
    });

    fixture = TestBed.createComponent(SohoCirclepagerComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-circlepager>`
})
class SohoCirclepagerTestComponent {
  @ViewChild(SohoCirclepagerComponent) circlepager: SohoCirclepagerComponent;
}

describe('Soho Circle Pager Render', () => {
  let circlepager:  SohoCirclepagerComponent;
  let component: SohoCirclepagerTestComponent;
  let fixture:   ComponentFixture<SohoCirclepagerTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoCirclepagerTestComponent ],
      imports: [ FormsModule, SohoCirclepagerModule ]
    });

    fixture = TestBed.createComponent(SohoCirclepagerTestComponent);
    component = fixture.componentInstance;
    circlepager = component.circlepager;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-circlepager]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-circlepager')).toBeTruthy('soho-circlepager');
  });

});
