import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild }    from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDropDownModule } from './soho-dropdown.module';
import { SohoDropDownComponent } from './soho-dropdown.component';

describe('Soho Dropdown Unit Tests', () => {
  let comp:     SohoDropDownComponent;
  let fixture:  ComponentFixture<SohoDropDownComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoDropDownComponent ]
    });

    fixture = TestBed.createComponent(SohoDropDownComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.attributes['id']).toEqual(comp.id);
    expect(el.className).toEqual('dropdown');
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
  let dropDown: SohoDropDownComponent;
  let fixture:  ComponentFixture<SohoDropDownTestComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoDropDownTestComponent ],
      imports: [ FormsModule, SohoDropDownModule ]
    });

    fixture = TestBed.createComponent(SohoDropDownTestComponent);
    dropDown = fixture.componentInstance.dropDownComponent;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check HTML content', () => {
    console.log(el.innerHTML);

    expect(el.nodeName).toEqual('DIV');
    expect(el.attributes['id']).toEqual(dropDown.id);
    expect(el.className).toEqual('dropdown');
  });
});

@Component({
  template: `
  <select soho-dropdown noSearch [(ngModel)]="selectedOption">
    <option *ngFor="let option of options" [value]="option.value">{{option.label}}</option>
  </select>`
})
class SohoDropDownTestComponent {
  @ViewChild(SohoDropDownComponent) dropDownComponent: SohoDropDownComponent;
  selectedOption = 'ND';
  options = [
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
