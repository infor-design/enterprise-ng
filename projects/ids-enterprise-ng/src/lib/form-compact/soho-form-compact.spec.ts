import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFormCompactModule } from './soho-form-compact.module';
import { SohoFormCompactComponent } from './soho-form-compact.component';

describe('Soho Compact Form Unit Tests', () => {
  let fixture: ComponentFixture<SohoFormCompactComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoFormCompactComponent]
    });

    fixture = TestBed.createComponent(SohoFormCompactComponent);
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-form-compact class="form-compact-container banner-detail">
    <section class="banner">
    </section>
    <section class="detail">
      <form class="form-compact">
        <div class="row">
          <div class="six columns">
            <div class="row">
              <div class="twelve columns form-section-header">
                Section One
              </div>
            </div>
            <div class="row">
              <div class="six columns">
                <label for="field-01">Field 01</label>
                <input soho-input id="field-01"/>
              </div>
              <div class="six columns">
                <label for="field-02">Field 02</label>
                <input soho-input id="field-02"/>
              </div>
            </div>
          </div>
          <div class="six columns">
            <div class="row">
              <div class="twelve columns form-section-header">
                Section Two
              </div>
            </div>
            <div class="row">
              <div class="six columns">
                <label for="field-03">Field 03</label>
                <input soho-input id="field-03"/>
              </div>
              <div class="six columns">
                <label for="field-04">Field 04</label>
                <input soho-input id="field-04"/>
              </div>
            </div>

            <div class="row">
              <div class="six columns">
                <label class="required" for="field-05">Field 05</label>
                <input soho-input id="field-05"/>
              </div>
              <div class="six columns">
                <label for="field-06">Field 06</label>
                <input soho-input id="field-06" readonly/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </div>
`
})
class SohoFormCompactTestComponent {
  @ViewChild(SohoFormCompactComponent) formcompact?: SohoFormCompactComponent;
}

describe('Soho Form Compact Render', () => {
  let fixture: ComponentFixture<SohoFormCompactTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoFormCompactTestComponent],
      imports: [FormsModule, SohoFormCompactModule]
    });

    fixture = TestBed.createComponent(SohoFormCompactTestComponent);
    de = fixture.debugElement;
    el = de.query(By.css('[soho-form-compact]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-form-compact')).toBeTruthy();
    expect(el.classList.contains('form-compact')).toBeTruthy();
    expect(document.querySelectorAll('.form-compact-container').length).toEqual(1);
  });
});
