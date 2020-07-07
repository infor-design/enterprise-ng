/// <reference path="soho-breadcrumb.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Soho Breadcrumb Component
 */
@Component({
  selector: '[soho-breadcrumb]', // tslint:disable-line
  templateUrl: 'soho-breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoBreadcrumbComponent implements AfterViewInit, OnDestroy, OnInit {

  private jQueryElement: JQuery<HTMLElement>;
  private breadcrumbAPI: SohoBreadcrumbStatic;

  // Default Options
  private options: SohoBreadcrumbOptions;

  /** Allow Breadcrumb Definition by Input */
  @Input()
  public set breadcrumbs(items: SohoBreadcrumbItemOptions[]) {
    this.options.breadcrumbs = items;
    this.updated();
  }
  public get breadcrumbs(): SohoBreadcrumbItemOptions[] {
    return this.options.breadcrumbs;
  }

  /**
   * Constructor
   * @param elementRef - the element matching the component's selector.
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.breadcrumb(this.options);
      this.breadcrumbAPI = this.jQueryElement.data('breadcrumb');
    });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.breadcrumbAPI) {
        this.breadcrumbAPI.destroy();
        this.breadcrumbAPI = null;
      }

      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
    });
  }

  ngOnInit() {
  }

  /**
   *
   */
  add(settings?: SohoBreadcrumbItemOptions, doRender?: boolean) {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.add(settings, doRender);
    });
  }

  /**
   *
   */
  remove(item: SohoBreadcrumbRef, doRender?: boolean) {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.remove(item, doRender);
    });
  }

  /**
   * Gets references related to a particular Breadcrumb Item.
   * The return object containins:
   * - 'a' : a reference to the breadcrumb item's anchor tag
   * - 'api' : a reference to the breadcrumb item's API
   * - 'i' : a number representing the current index of the breadcrumb item.
   */
  getBreadcrumbItem(item: SohoBreadcrumbRef) {
    return this.breadcrumbAPI.getBreadcrumbItemAPI(item);
  }

  /**
   * @param [settings] incoming IDS Breadcrumb settings
   */
  updated(settings?: SohoBreadcrumbOptions) {
    if (settings) {
      this.options = settings;
    }

    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.updated(this.options);
    });
  }

  /**
   * Destroys this component and tears down the IDS Breadcrumb
   */
  destroy() {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.destroy();
    });
  }
}
