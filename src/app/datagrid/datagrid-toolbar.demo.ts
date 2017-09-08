import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'soho-datagrid-toolbar-demo',
  templateUrl: './datagrid-toolbar.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridToolbarDemoComponent implements OnInit, AfterViewInit, AfterContentInit {

  // Breadcrumbs.
  @Input() breadcrumbs: Breadcrumb[];

  constructor(private element: ElementRef) {
    this.breadcrumbs = this.buildBreadcrumbs();
  }

  selectBreadcrumb(breadcrumb: Breadcrumb) {
    console.log('Selected ${breadcrumb.friendlyName}');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngAfterContentInit() {
  }

  private buildBreadcrumbs() {
    const breadcrumbs = Array<Breadcrumb>();

    breadcrumbs.push({ current: false, friendlyName: 'Root', path: '/', selectable: true});
    breadcrumbs.push({ current: false, friendlyName: 'Level 1', path: '/1', selectable: true});
    breadcrumbs.push({ current: false, friendlyName: 'Level 2', path: '/1/2', selectable: true});
    breadcrumbs.push({ current: false, friendlyName: 'Level 3', path: '/1/2/3', selectable: true});

    return breadcrumbs;
  }
}

/**
 * Definition of a breadcrumb.
 */
export class Breadcrumb {
  // The display name (or friendly name) of the breadcrumb.
  friendlyName: string;

  // The id (or key) used when selected.
  path: string;

  // Indicator that this is the selectable.
  selectable = false;

  // Is this the active breadcrumb.
  current = false;
}
