import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoAutoCompleteModule } from './soho-autocomplete.module';
import { SohoAutoCompleteComponent } from './soho-autocomplete.component';

describe('Soho AutoComplete Unit Tests', () => {
  let comp:     SohoAutoCompleteComponent;
  let fixture:  ComponentFixture<SohoAutoCompleteComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoAutoCompleteComponent ]
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

  it('Check Default \'role\' property', () => {
    expect(comp.role).toContain('combobox');
  });

  // Add more method tests.
});

describe('Soho Autocomplete Render', () => {
  let autocomplete:  SohoAutoCompleteComponent;
  let component: SohoAutoCompleteTestComponent;
  let fixture:   ComponentFixture<SohoAutoCompleteTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoAutoCompleteTestComponent ],
      imports: [ FormsModule, SohoAutoCompleteModule ]
    });

    fixture = TestBed.createComponent(SohoAutoCompleteTestComponent);
    component = fixture.componentInstance;
    autocomplete = component.autocomplete;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-autocomplete]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('autocomplete')).toBeTruthy('autocomplete');
  });

});

@Component({
  template: `<input soho-autocomplete>`
})
class SohoAutoCompleteTestComponent {
  @ViewChild(SohoAutoCompleteComponent) autocomplete: SohoAutoCompleteComponent;
}
