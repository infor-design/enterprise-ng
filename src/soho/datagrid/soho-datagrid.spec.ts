import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild }    from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoDataGridModule } from './soho-datagrid.module';
import { SohoDataGridComponent } from './soho-datagrid.component';

describe('Soho DataGrid Unit Tests', () => {
  let comp:     SohoDataGridComponent;
  let fixture:  ComponentFixture<SohoDataGridComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoDataGridComponent ]
    });

    fixture = TestBed.createComponent(SohoDataGridComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    // expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual(comp.id);
    // expect(el.classList).toContain('dropdown');
  });

  it('Check Default \'name\' property', () => {
    // expect(comp.name).toContain('soho-dropdown-');
  });

  it('Check setting \'name\' property.', () => {
    // comp.name = 'my-id';
    // expect(comp.name).toEqual('my-id');
    // expect(comp.id).toEqual('my-id');
  });

  // Add more method tests.
});

describe('Soho Dropdown Render', () => {
  let dropdown:  SohoDataGridComponent;
  let component: SohoDataGridTestComponent;
  let fixture:   ComponentFixture<SohoDataGridTestComponent>;
  let de:        DebugElement;
//  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoDataGridTestComponent ],
      imports: [ FormsModule, SohoDataGridModule ]
    });

    fixture = TestBed.createComponent(SohoDataGridTestComponent);
    component = fixture.componentInstance;
    dropdown = component.dropdown;

    de = fixture.debugElement;
    // el = de.query(By.css('div[soho-datagrid]')).nativeElement;

    // fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    // expect(el.nodeName).toEqual('SELECT');
    // expect(el.id).toEqual(dropdown.id);
    // expect(el.classList).toContain('dropdown');
    // expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');

    // expect(el.childElementCount).toBe(9);

    // let i = 0;
    // component.options.forEach(option => {
    //   expect(el.children[i].nodeName).toBe('OPTION');
    //   expect(el.children[i].getAttribute('value')).toBe(option.value);
    //   expect(el.children[i++].innerHTML).toBe(option.label);
    // });

    // dropdown.noSearch = false;
    // fixture.detectChanges();

    // expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');
  });

});

@Component({
  template: ``
})
class SohoDataGridTestComponent {
  @ViewChild(SohoDataGridComponent) dropdown: SohoDataGridComponent;
}
