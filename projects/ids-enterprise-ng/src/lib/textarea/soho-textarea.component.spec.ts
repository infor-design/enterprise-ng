/// <reference path="soho-textarea.d.ts" />

import { } from 'jasmine';
import { ComponentFixture, TestBed, tick, fakeAsync, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoTextAreaModule } from './soho-textarea.module';
import { SohoTextAreaComponent } from './soho-textarea.component';
import { text } from 'd3';

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
  template: `<input soho-textarea (ngModelChange)="onTextChange()" [(ngModel)]="model">`
})
class SohoTextAreaTestComponent {
  @ViewChild(SohoTextAreaComponent, /* TODO: add static flag */ {}) textarea: SohoTextAreaComponent;

  public model: string;

  public onTextChange() {
  }
}

describe('Soho Rating Chart Render', () => {
  let textarea:  SohoTextAreaComponent;
  let component: SohoTextAreaTestComponent;
  let fixture:   ComponentFixture<SohoTextAreaTestComponent>;
  let de:        DebugElement;
  let el:        HTMLTextAreaElement;

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

  it('set model on input event', async(() => {
    const spy = spyOn(component, 'onTextChange');

    fixture.detectChanges();

    el.value = 'New Value!';
    el.dispatchEvent(new Event('input'));

    fixture.whenStable().then(() => {
      expect(component.model).toBe('New Value!');
      expect(spy).toHaveBeenCalled();
    });
  }));

});
