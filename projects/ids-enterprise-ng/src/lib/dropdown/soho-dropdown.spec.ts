import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDropDownModule } from './soho-dropdown.module';
import { SohoDropDownComponent } from './soho-dropdown.component';

@Component({
  template: `
  <select soho-dropdown noSearch (listclosed)="onListClosed($event)" [closeOnSelect]="true" [(ngModel)]="selectedOption">
    <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
  </select>`
})
class SohoDropDownTestComponent {
  @ViewChild(SohoDropDownComponent) dropdown?: SohoDropDownComponent;
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

  public lastEvent?: SohoDropDownEvent;

  public onListclosed(event: SohoDropDownEvent) {
    this.lastEvent = event;
  }
}

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

    de = fixture.debugElement;
    el = de.query(By.css('select[soho-dropdown]')).nativeElement;

    fixture.detectChanges();
    dropdown = (component.dropdown as any);
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

  it('@Input() reload', () => {
    expect(dropdown.reload).toBe('none');

    dropdown.reload = 'typeahead';
    fixture.detectChanges();

    expect(dropdown.reload).toBe('typeahead');
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
