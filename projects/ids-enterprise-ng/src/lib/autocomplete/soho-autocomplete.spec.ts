import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoAutoCompleteModule } from './soho-autocomplete.module';
import { SohoAutoCompleteComponent } from './soho-autocomplete.component';
import { TestHelper } from '../utils';

describe('Soho AutoComplete Unit Tests', () => {
  let comp: SohoAutoCompleteComponent;
  let fixture: ComponentFixture<SohoAutoCompleteComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoAutoCompleteComponent]
    });

    fixture = TestBed.createComponent(SohoAutoCompleteComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('autocomplete');
  });

  it('Check Inputs', () => {
    comp.caseSensitive = false;
    comp.delay = 250;
    comp.width = 200;
    comp.autoSelectFirstItem = false;

    expect(comp['options'].source).toEqual(undefined);
    expect(comp['options'].sourceArguments).toEqual(undefined);
    expect(comp['options'].template).toEqual(undefined);
    expect(comp['options'].caseSensitive).toEqual(false);
    expect(comp['options'].filterMode).toEqual(undefined);
    expect(comp['options'].delay).toEqual(250);
    expect(comp['options'].width).toEqual(200);
    expect(comp['options'].autoSelectFirstItem).toEqual(false);

    fixture.detectChanges();
    expect(comp['autocomplete']).not.toBeUndefined();
  });

  it('Check Outputs', () => {
    fixture.detectChanges();
    expect(comp['autocomplete']).not.toBeUndefined();

    const autoCompleteElement = comp['element'].nativeElement;
    TestHelper.testFireEvent(autoCompleteElement, 'selected', comp['selected']);
    TestHelper.testFireEvent(autoCompleteElement, 'beforeopen', comp['beforeopen']);
    // TestHelper.testFireEvent(autoCompleteElement, 'change', comp['change']);
  });
});

@Component({
  template: `<input soho-autocomplete [source]="source">`
})
class SohoAutoCompleteTestComponent {
  @ViewChild(SohoAutoCompleteComponent) autocomplete?: SohoAutoCompleteComponent;

  public source = (term: string, response: any) => {
    const states = [
      'Alaska',
      'Arizona',
      'California',
      'Colorado',
      'Minnesota',
      'North Dakota',
      'Oregon',
      'Washington',
      'Wyoming'
    ];

    response(term, states);
  };
}

describe('Soho Autocomplete Render', () => {
  let fixture: ComponentFixture<SohoAutoCompleteTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoAutoCompleteTestComponent],
      imports: [FormsModule, SohoAutoCompleteModule]
    });

    fixture = TestBed.createComponent(SohoAutoCompleteTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-autocomplete]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('autocomplete')).toBeTruthy('autocomplete');
  });

});
