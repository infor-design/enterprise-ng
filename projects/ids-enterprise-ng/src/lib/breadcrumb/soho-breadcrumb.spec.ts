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
  constructor() { }
}

describe('Soho Breadcrumb Unit Tests', () => {
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
    breadcrumb = component.breadcrumb;
    de = fixture.debugElement;
    el = de.nativeElement;

    // Set the breadcrumbs via the input
    breadcrumb.breadcrumbs = STANDARD_DATA;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
    expect(breadcrumb.breadcrumbs).toBeDefined();
    expect(breadcrumb.breadcrumbs.length).toEqual(4);
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
  });

  it('can remove a breadcrumb using its Index', () => {
    breadcrumb.remove(0, true);

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(3);
    expect(breadcrumb.breadcrumbAPIs[0].settings.content).toEqual('Second Item');
  });

  it('can remove a breadcrumb uisng its IDS Breadcrumb API', () => {
    const api1 = breadcrumb.getBreadcrumbItem(0).api;
    breadcrumb.remove(api1, true);

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(3);
    expect(breadcrumb.breadcrumbAPIs[0].settings.content).toEqual('Second Item');
  });
});
