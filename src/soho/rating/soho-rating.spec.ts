import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoRatingModule } from './soho-rating.module';
import { SohoRatingComponent } from './soho-rating.component';

describe('Soho Rating Unit Tests', () => {
  let comp:     SohoRatingComponent;
  let fixture:  ComponentFixture<SohoRatingComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoRatingComponent ]
    });

    fixture = TestBed.createComponent(SohoRatingComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-rating>`
})
class SohoRatingTestComponent {
  @ViewChild(SohoRatingComponent) rating: SohoRatingComponent;
}

describe('Soho Rating Chart Render', () => {
  let rating:  SohoRatingComponent;
  let component: SohoRatingTestComponent;
  let fixture:   ComponentFixture<SohoRatingTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoRatingTestComponent ],
      imports: [ FormsModule, SohoRatingModule ]
    });

    fixture = TestBed.createComponent(SohoRatingTestComponent);
    component = fixture.componentInstance;
    rating = component.rating;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-rating]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-rating')).toBeTruthy('soho-rating');
  });

});
