/// <reference path="soho-breadcrumb.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBreadcrumbModule } from './soho-breadcrumb.module';
import { SohoBreadcrumbComponent } from './soho-breadcrumb.component';
import { TestHelper } from '../utils';

const STANDARD_DATA = [
  {
    content: 'Home',
    id: 'test-breadcrumb-home',
    href: '#'
  },
  {
    content: 'Second Item',
    id: 'test-breadcrumb-second',
    href: '#'
  },
  {
    content: 'Third Item',
    id: 'test-breadcrumb-third',
    href: '#'
  },
  {
    content: 'Fourth Item',
    current: true,
    id: 'test-breadcrumb-fourth',
    href: '#'
  }
];

@Component({
  template: `
  <div class="row">
    <div class="twelve columns">
      <nav soho-breadcrumb class="breadcrumb"></nav>
    </div>
  </div>`
})
class SohoBreadcrumbTestComponent {
  @ViewChild(SohoBreadcrumbComponent, { static: true }) breadcrumb: SohoBreadcrumbComponent;
  public breadcrumbs = STANDARD_DATA;
  constructor() {}
}

fdescribe('Soho Breadcrumb Unit Tests', () => {
  let breadcrumb: SohoBreadcrumbComponent;
  let component: SohoBreadcrumbTestComponent;
  let fixture: ComponentFixture<SohoBreadcrumbTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBreadcrumbTestComponent],
      imports: [SohoBreadcrumbModule]
    });

    fixture = TestBed.createComponent(SohoBreadcrumbTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    breadcrumb = component.breadcrumb;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
    expect(breadcrumb.breadcrumbs).toBeDefined();
    expect(breadcrumb.breadcrumbs.length).toEqual(4);
  });

  it('can enable and disable the entire breadcrumb list', () => {
    breadcrumb.disable();

    expect(el.classList.contains('is-disabled')).toBeTruthy();

    breadcrumb.enable();

    expect(el.classList.contains('is-disabled')).toBeFalsy();
  });

  it('can add breadcrumbs', () => {
    breadcrumb.add({
      id: 'fifth-item',
      content: 'Fifth Item',
      href: '#'
    });
    const fifth = breadcrumb.breadcrumbAPIs[4];

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(5);
    expect(fifth.settings.id).toEqual('fifth-item');
    expect(fifth.disabled).toBeFalsy();
  });
});
