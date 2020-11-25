import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { SohoBreadcrumbModule } from './soho-breadcrumb.module';
import { SohoBreadcrumbComponent } from './soho-breadcrumb.component';

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
  @ViewChild(SohoBreadcrumbComponent, { static: true }) breadcrumb?: SohoBreadcrumbComponent;
  constructor() { }
}

describe('Soho Breadcrumb Unit Tests', () => {
  let breadcrumb: SohoBreadcrumbComponent;
  let component: SohoBreadcrumbTestComponent;
  let fixture: ComponentFixture<SohoBreadcrumbTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBreadcrumbTestComponent],
      imports: [SohoBreadcrumbModule]
    });

    fixture = TestBed.createComponent(SohoBreadcrumbTestComponent);
    component = fixture.componentInstance;
    breadcrumb = component.breadcrumb || ({} as any);

    // Set the breadcrumbs via the input
    breadcrumb.breadcrumbs = STANDARD_DATA;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
    expect(breadcrumb.breadcrumbs).toBeDefined();
    expect(breadcrumb.breadcrumbs?.length).toEqual(4);
  });

  it('can add breadcrumbs', () => {
    breadcrumb.add({
      id: 'fifth-item',
      content: 'Fifth Item',
      href: '#'
    });
    const fifth = breadcrumb.breadcrumbAPIs[4];

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(5);
    expect(fifth.settings?.id).toEqual('fifth-item');
  });

  it('can remove a breadcrumb using its Index', () => {
    breadcrumb.remove(0, true);

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(3);
    const firstItem = breadcrumb.breadcrumbAPIs[0];
    expect(firstItem?.settings?.content).toEqual('Second Item');
  });

  it('can remove a breadcrumb uisng its IDS Breadcrumb API', () => {
    const firstItem = breadcrumb.getBreadcrumbItem(0);
    const api1 = firstItem?.api;
    breadcrumb.remove((api1 as any), true);

    expect(breadcrumb.breadcrumbAPIs.length).toEqual(3);
    const firstArrItem = breadcrumb.breadcrumbAPIs[0];
    expect(firstArrItem?.settings?.content).toEqual('Second Item');
  });
});
