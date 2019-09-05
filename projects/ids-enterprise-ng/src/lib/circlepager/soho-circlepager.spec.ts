/// <reference path="soho-circlepager.d.ts" />

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

  it('check inputs', () => {
    comp.slidesToShow = 3;
    comp.startingSlide = 1;
    comp.loop = false;

    // check options
    expect((comp as any).settings.slidesToShow).toEqual(3);
    expect((comp as any).settings.startingSlide).toEqual(1);
    expect((comp as any).settings.loop).toEqual(false);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    comp.slidesToShow = 5;
    comp.startingSlide = 3;
    comp.loop = true;

    // check bar settings
    expect((comp as any).circlepager.settings.slidesToShow).toEqual(5);
    expect((comp as any).circlepager.settings.startingSlide).toEqual(3);
    expect((comp as any).circlepager.settings.loop).toEqual(true);

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    // todo circle pager fails when calling detectChanges here due to undefined controlButtons being ref'd in circlepager.js unbind function
    const updatedSpy = spyOn<any>((comp as any).circlepager, 'updated').and.callThrough();
    // fixture.detectChanges();
    // expect((comp as any).updateRequired).toEqual(false);
    // expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<div soho-circlepager></div>`
})
class SohoCirclepagerTestComponent {
  @ViewChild(SohoCirclepagerComponent, {static: false}) circlepager: SohoCirclepagerComponent;
}

describe('Soho Circle Pager Render', () => {
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
    de = fixture.debugElement;
    el = de.query(By.css('[soho-circlepager]')).nativeElement;
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-circlepager')).toBeTruthy('soho-circlepager');
  });
});
