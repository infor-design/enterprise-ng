/// <reference path="soho-form-compact.d.ts" />

import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFormCompactModule } from './soho-form-compact.module';
import { SohoFormCompactComponent } from './soho-form-compact.component';

describe('Soho Compact Form Unit Tests', () => {
  let comp:     SohoFormCompactComponent;
  let fixture:  ComponentFixture<SohoFormCompactComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFormCompactComponent ]
    });

    fixture = TestBed.createComponent(SohoFormCompactComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<form soho-form-compact></form>`
})
class SohoFormCompactTestComponent {
  @ViewChild(SohoFormCompactComponent) formcompact: SohoFormCompactComponent;
}

describe('Soho Tree Map Render', () => {
  let component: SohoFormCompactTestComponent;
  let fixture:   ComponentFixture<SohoFormCompactTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFormCompactTestComponent ],
      imports: [ FormsModule, SohoFormCompactModule ]
    });

    fixture = TestBed.createComponent(SohoFormCompactTestComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.query(By.css('[soho-form-compact]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-form-compact')).toBeTruthy('soho-form-compact');
    expect(el.classList.contains('form-compact')).toBeTruthy('form-compact');
  });
});
