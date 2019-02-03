/// <reference path="soho-textarea.d.ts" />

import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoTextAreaModule } from './soho-textarea.module';
import { SohoTextAreaComponent } from './soho-textarea.component';

describe('Soho TextArea Unit Tests', () => {
  let comp:     SohoTextAreaComponent;
  let fixture:  ComponentFixture<SohoTextAreaComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoTextAreaComponent ]
    });

    fixture = TestBed.createComponent(SohoTextAreaComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<input soho-textarea>`
})
class SohoTextAreaTestComponent {
  @ViewChild(SohoTextAreaComponent) textarea: SohoTextAreaComponent;
}

describe('Soho Rating Chart Render', () => {
  let textarea:  SohoTextAreaComponent;
  let component: SohoTextAreaTestComponent;
  let fixture:   ComponentFixture<SohoTextAreaTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoTextAreaTestComponent ],
      imports: [ FormsModule, SohoTextAreaModule ]
    });

    fixture = TestBed.createComponent(SohoTextAreaTestComponent);
    component = fixture.componentInstance;
    textarea = component.textarea;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-textarea]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-textarea')).toBeTruthy('soho-textarea');
  });

});
