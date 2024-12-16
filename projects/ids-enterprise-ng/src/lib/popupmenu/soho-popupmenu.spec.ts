import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  SohoPopupMenuComponent,
  SohoPopupMenuHeadingComponent,
  SohoPopupMenuShortCutTextComponent,
  SohoPopupMenuModule,
  SohoPopupMenuItemComponent,
  SohoPopupMenuItemLabelComponent,
  SohoPopupMenuSeparatorComponent
} from './';

@Component({
    template: `
             <li soho-popupmenu-separator singleSelectableSection=true></li>`,
    standalone: false
})
class SohoPopupMenuSeparatorTestComponent {
  @ViewChild(SohoPopupMenuSeparatorComponent) separator?: SohoPopupMenuSeparatorComponent;
}

@Component({
    template: `
             <li soho-popupmenu-heading>Heading One</li>`,
    standalone: false
})
class SohoPopupMenuHeadingTestComponent {
  @ViewChild(SohoPopupMenuHeadingComponent) heading?: SohoPopupMenuHeadingComponent;
}

@Component({
    template: `
             <span soho-popupmenu-shortcut-text>CTRL+X</span>`,
    standalone: false
})
class SohoPopupMenuShortCutTextTestComponent {
  @ViewChild(SohoPopupMenuShortCutTextComponent) heading?: SohoPopupMenuShortCutTextComponent;
}

@Component({
    template: `
             <li soho-popupmenu-item>Item One</li>`,
    standalone: false
})
class SohoPopupMenuItemTestComponent {
  @ViewChild(SohoPopupMenuItemComponent) item?: SohoPopupMenuItemComponent;
}

@Component({
    template: `
             <a soho-popupmenu-label isDisabled="true" > Entry One</a>`,
    standalone: false
})
class SohoPopupMenuItemLabelTestComponent {
  @ViewChild(SohoPopupMenuItemLabelComponent) label?: SohoPopupMenuItemLabelComponent;
}

describe('Soho Popup Menu Unit Tests', () => {
  let fixture: ComponentFixture<SohoPopupMenuComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuComponent]
    });

    fixture = TestBed.createComponent(SohoPopupMenuComponent);
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
  let fixture: ComponentFixture<SohoPopupMenuHeadingTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuHeadingTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuHeadingTestComponent);

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

describe('Soho Popup Menu Shortcut Text Render', () => {
  let fixture: ComponentFixture<SohoPopupMenuShortCutTextTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuShortCutTextTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuShortCutTextTestComponent);
    de = fixture.debugElement;
    el = de.query(By.css('span[soho-popupmenu-shortcut-text]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Heading HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('SPAN');
    expect(el.classList).toContain('shortcut-text');
  });

});

describe('Soho Popup Menu Separator Render', () => {
  let fixture: ComponentFixture<SohoPopupMenuSeparatorTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopupMenuSeparatorTestComponent],
      imports: [FormsModule, SohoPopupMenuModule]
    });

    fixture = TestBed.createComponent(SohoPopupMenuSeparatorTestComponent);

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

    de = fixture.debugElement;
    el = de.query(By.css('li[soho-popupmenu-item]')).nativeElement;

    fixture.detectChanges();
    item = (component.item as any);
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

    fixture.detectChanges();
    label = (component.label as any);

    de = fixture.debugElement;
    el = de.query(By.css('a[soho-popupmenu-label]')).nativeElement;
  });

  it('Check Item HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('A');
    expect(el.getAttribute('isDisabled')).toBeTruthy();
    expect(el.getAttribute('href')).toEqual('#');

    label.menuId = 'my-id';
    fixture.detectChanges();

    expect(el.getAttribute('href')).toEqual('#my-id');

    label.menuId = undefined;
    label.menuUrl = 'www.google.com';
    fixture.detectChanges();

    expect(el.getAttribute('href')).toEqual('www.google.com');
  });

});
