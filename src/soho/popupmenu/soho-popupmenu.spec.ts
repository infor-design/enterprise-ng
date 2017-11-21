import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  SohoPopupMenuComponent,
  SohoPopupMenuHeadingComponent,
  SohoPopupMenuModule,
  SohoPopupMenuItemComponent,
  SohoPopupMenuItemLabelComponent,
  SohoPopupMenuSeparatorComponent
} from './';

@Component({
  template: `
             <li soho-popupmenu-separator singleSelectableSection=true></li>`
})
class SohoPopupMenuSeparatorTestComponent {
  @ViewChild(SohoPopupMenuSeparatorComponent) separator: SohoPopupMenuSeparatorComponent;
}

@Component({
  template: `
             <li soho-popupmenu-heading>Heading One</li>`
})
class SohoPopupMenuHeadingTestComponent {
  @ViewChild(SohoPopupMenuHeadingComponent) heading: SohoPopupMenuHeadingComponent;
}

@Component({
  template: `
             <li soho-popupmenu-item>Item One</li>`
})
class SohoPopupMenuItemTestComponent {
  @ViewChild(SohoPopupMenuItemComponent) item: SohoPopupMenuItemComponent;
}

@Component({
  template: `
             <a soho-popupmenu-label isDisabled="true" > Entry One</a>`
})
class SohoPopupMenuItemLabelTestComponent {
  @ViewChild(SohoPopupMenuItemLabelComponent) label: SohoPopupMenuItemLabelComponent;
}

describe('Soho Popup Menu Unit Tests', () => {
  let comp: SohoPopupMenuComponent;
  let fixture: ComponentFixture<SohoPopupMenuComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuComponent]
    });

    fixture = TestBed.createComponent(SohoPopupMenuComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('popupmenu');
  });
});

describe('Soho Popup Menu Heading Render', () => {
  let heading: SohoPopupMenuHeadingComponent;
  let component: SohoPopupMenuHeadingTestComponent;
  let fixture: ComponentFixture<SohoPopupMenuHeadingTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuHeadingTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuHeadingTestComponent);
    component = fixture.componentInstance;
    heading = component.heading;

    de = fixture.debugElement;
    el = de.query(By.css('li[soho-popupmenu-heading]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Heading HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('LI');
    expect(el.classList).toContain('heading');
  });

});

describe('Soho Popup Menu Separator Render', () => {
  let separator: SohoPopupMenuSeparatorComponent;
  let component: SohoPopupMenuSeparatorTestComponent;
  let fixture: ComponentFixture<SohoPopupMenuSeparatorTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuSeparatorTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuSeparatorTestComponent);
    component = fixture.componentInstance;
    separator = component.separator;

    de = fixture.debugElement;
    el = de.query(By.css('li[soho-popupmenu-separator]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Separator HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('LI');
    expect(el.classList).toContain('separator');
    expect(el.hasAttribute('singleSelectableSection')).toBeTruthy();
  });

});

describe('Soho Popup Menu Item Render', () => {
  let item: SohoPopupMenuItemComponent;
  let component: SohoPopupMenuItemTestComponent;
  let fixture: ComponentFixture<SohoPopupMenuItemTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuItemTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuItemTestComponent);
    component = fixture.componentInstance;
    item = component.item;

    de = fixture.debugElement;
    el = de.query(By.css('li[soho-popupmenu-item]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Item HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('LI');

    item.isChecked = true;
    item.isSelectable = true;
    fixture.detectChanges();

    expect(el.classList).toContain('is-selectable');
    expect(el.classList).toContain('is-checked');
  });

});

describe('Soho Popup Menu Item Label Render', () => {
  let label: SohoPopupMenuItemLabelComponent;
  let component: SohoPopupMenuItemLabelTestComponent;
  let fixture: ComponentFixture<SohoPopupMenuItemLabelTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuItemLabelTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuItemLabelTestComponent);
    component = fixture.componentInstance;
    label = component.label;

    de = fixture.debugElement;
    el = de.query(By.css('a[soho-popupmenu-label]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Item HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('A');
    expect(el.getAttribute('isDisabled')).toBeTruthy();
    expect(el.getAttribute('href')).toEqual('#');

    label.menuId = 'my-id';
    fixture.detectChanges();

    expect(el.getAttribute('href')).toEqual('#my-id');

    label.menuId = null;
    label.menuUrl = 'www.google.com';
    fixture.detectChanges();

    expect(el.getAttribute('href')).toEqual('www.google.com');
  });

});
