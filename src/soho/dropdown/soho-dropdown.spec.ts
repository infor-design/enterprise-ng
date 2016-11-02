import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { Component, DebugElement, ViewChild, AfterViewInit }    from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDropDownModule } from './soho-dropdown.module';
import { SohoDropDownComponent } from './soho-dropdown.component';

describe('Soho Dropdown Unit Tests', () => {
  let comp:     SohoDropDownComponent;
  let fixture:  ComponentFixture<SohoDropDownComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [ SohoDropDownComponent ]
    });

    fixture = TestBed.createComponent(SohoDropDownComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('simple content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.attributes['id']).toEqual(comp.id);
    expect(el.className).toEqual('dropdown');
  });

  /** TEST */
  it('default name (and id)', () => {
    expect(comp.name).toContain('soho-dropdown-');
  });

  it('set name (and id)', () => {
    comp.name = 'my-id';
    expect(comp.name).toEqual('my-id');
    expect(comp.id).toEqual('my-id');
  });
});

describe('Soho Dropdown Render', () => {
  let dropDown:     SohoDropDownComponent;
  let fixture:  ComponentFixture<SohoDropDownTestComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    // refine the test module by declaring the test component
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

  it('simple content', () => {
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
