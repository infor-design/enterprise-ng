import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { SohoDropDownModule } from './soho-dropdown.module';
import { SohoDropDownComponent } from './soho-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  template: `
  <select soho-dropdown noSearch [closeOnSelect]="true" [(ngModel)]="selectedOption">
    <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
  </select>`
})
class SohoDropDownTestComponent {
  @ViewChild(SohoDropDownComponent) dropdown: SohoDropDownComponent;
  selectedOption = 'ND';
  public options = [
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OR', label: 'Oregon' },
    { value: 'WA', label: 'Washington' },
    { value: 'WY', label: 'Wyoming' }
  ];
}

describe('Soho Dropdown Unit Tests', () => {
  let comp: SohoDropDownComponent;
  let fixture: ComponentFixture<SohoDropDownComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDropDownComponent]
    });

    fixture = TestBed.createComponent(SohoDropDownComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.id).toEqual(comp.id);
    expect(el.classList).toContain('dropdown');
  });

  it('Check Default \'name\' property', () => {
    expect(comp.name).toContain('soho-dropdown-');
  });

  it('Check setting \'name\' property.', () => {
    comp.name = 'my-id';
    expect(comp.name).toEqual('my-id');
    expect(comp.id).toEqual('my-id');
  });

  // Add more method tests.
});

describe('Soho Dropdown Render', () => {
  let dropdown: SohoDropDownComponent;
  let component: SohoDropDownTestComponent;
  let fixture: ComponentFixture<SohoDropDownTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoDropDownTestComponent],
      imports: [FormsModule, SohoDropDownModule]
    });

    fixture = TestBed.createComponent(SohoDropDownTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('select[soho-dropdown]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('SELECT');
    expect(el.id).toEqual(dropdown.id);
    expect(el.classList).toContain('dropdown');
    expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');

    expect(el.childElementCount).toBe(9);

    let i = 0;
    component.options.forEach(option => {
      expect(el.children[i].nodeName).toBe('OPTION');
      expect(el.children[i].getAttribute('value')).toBe(option.value);
      expect(el.children[i++].innerHTML).toBe(option.label);
    });

    dropdown.noSearch = false;
    fixture.detectChanges();

    expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');
  });

  it('@Input() noSearch', () => {
    expect(el.hasAttribute('noSearch')).toBeTruthy();

    dropdown.noSearch = false;

    fixture.detectChanges();

    // @todo testing issue, or not supported?
    // expect(el.hasAttribute('noSearch')).toBeFalsy();
  });

  it('@Input() multiple', () => {
    expect(el.hasAttribute('multiple')).toBeFalsy();
    expect(el.classList.contains('multiselect')).toBe(false);
    dropdown.multiple = true;
    fixture.detectChanges();
    expect(el.hasAttribute('multiple')).toBeTruthy();
    expect(el.classList).toContain('multiselect');
  });

  it('@Input() maxWidth', () => {
    expect(el.style.maxWidth).toBe('');

    dropdown.maxWidth = 100;
    fixture.detectChanges();

    // @todo does not work yet
    expect(el.style.maxWidth).toBe('');
  });

  it('@Input() showSelectAll', () => {
    expect(el.hasAttribute('multiple')).toBeFalsy();
    expect(el.classList.contains('multiselect')).toBe(false);
    expect(de.query(By.css('a#dropdown-select-all-anchor'))).toBeNull();

    dropdown.showSelectAll = true;
    dropdown.multiple = true;
    fixture.detectChanges();

    expect(el.hasAttribute('multiple')).toBeTruthy();
    expect(el.classList).toContain('multiselect');
    expect(de.query(By.css('a#dropdown-select-all-anchor'))).toBeDefined();
  });

  it('@Input() disable', () => {
    dropdown.disabled = true;
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy();
  });
});
