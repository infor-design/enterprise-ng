import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SohoSwapListModule } from './soho-swaplist.module';
import { SohoSwapListComponent} from './soho-swaplist.component';

describe('Soho Swap List Unit Tests', () => {
  let comp: SohoSwapListComponent;
  let fixture: ComponentFixture<SohoSwapListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ SohoSwapListModule ]
    });

    fixture = TestBed.createComponent(SohoSwapListComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.id).toEqual(comp.id);
    expect(el.classList).toContain('swaplist');
  });

  it('Check Default \'name\' property', () => {
    expect(comp.name).toContain('soho-swaplist');
  });

  it('Check setting \'name\' property.', () => {
    comp.name = 'swaplist-1';
    expect(comp.name).toEqual('swaplist-1');
    expect(comp.id).toEqual('swaplist-1');
  });

  // Add more method tests.
});

describe('Soho Swap List Render', () => {
  let com: SohoSwapListComponent;
  let component: SohoSwapListTestComponent;
  let fixture: ComponentFixture<SohoSwapListTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSwapListTestComponent],
      imports: [FormsModule, SohoSwapListModule]
    });

    fixture = TestBed.createComponent(SohoSwapListTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    el = de.query(By.css('.swaplist')).nativeElement;

    com = component.swaplist;

    //  expect(el.id).toEqual(com.id);
    //    expect(el.classList).toContain('swaplist');
    //
    //    let i = 0;
    //    component.options.forEach(option => {
    //      expect(el.children[i].nodeName).toBe('OPTION');
    //      expect(el.children[i].getAttribute('value')).toBe(option.value);
    //      expect(el.children[i++].innerHTML).toBe(option.label);
    //    });
    //
    //    fixture.detectChanges();
    //
    //    expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');
    //  });
    //
    //  it('@Input() noSearch', () => {
    //    expect(el.hasAttribute('noSearch')).toBeTruthy();
    //
    //    dropdown.noSearch = false;
    //
    //    fixture.detectChanges();
    //
    //    // @todo testing issue, or not supported?
    //    // expect(el.hasAttribute('noSearch')).toBeFalsy();
    //  });
    //
    //    it('@Input() multiple', () => {
    //      expect(el.hasAttribute('multiple')).toBeFalsy();
    //      expect(el.classList.contains('multiselect')).toBe(false);
    //      dropdown.multiple = true;
    //      fixture.detectChanges();
    //      expect(el.hasAttribute('multiple')).toBeTruthy();
    //      expect(el.classList).toContain('multiselect');

  });

});

@Component({
  template: `
  <soho-swaplist id="swaplist1" [availableItems]="options.available" [selectedItems]="options.selected">
  </soho-swaplist>`
})
class SohoSwapListTestComponent {
  @ViewChild(SohoSwapListComponent) swaplist: SohoSwapListComponent;
  public options = {
    available: [],
    selected: []
  };
}
