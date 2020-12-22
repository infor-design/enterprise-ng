import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoRatingModule } from './soho-rating.module';
import { SohoRatingComponent } from './soho-rating.component';

describe('Soho Rating Unit Tests', () => {
  let fixture: ComponentFixture<SohoRatingComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRatingComponent]
    });

    fixture = TestBed.createComponent(SohoRatingComponent);

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-rating></div>`
})
class SohoRatingTestComponent {
  @ViewChild(SohoRatingComponent) rating?: SohoRatingComponent;
}

describe('Soho Rating Chart Render', () => {
  let fixture: ComponentFixture<SohoRatingTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let component: SohoRatingComponent | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoRatingTestComponent],
      imports: [FormsModule, SohoRatingModule]
    });

    fixture = TestBed.createComponent(SohoRatingTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('[soho-rating]')).nativeElement;
    component = fixture.componentInstance.rating;
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-rating')).toBeTruthy('soho-rating');
  });

  it ('Check readonly/enable', () => {
    if (component) {
      component.readonly();
      expect(el.classList.contains('is-readonly')).toBeTruthy();

      component.enable();
      expect(el.classList.contains('is-readonly')).toBeFalsy();
    }
  });

});
