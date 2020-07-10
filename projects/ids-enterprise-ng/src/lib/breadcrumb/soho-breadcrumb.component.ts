/// <reference path="soho-breadcrumb.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
  private options: SohoBreadcrumbOptions = {
    style: 'default'
  };

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

  // -------------------------------------------------------------
  // All the below methods pass through to the IDS Breadcrumb API
  // -------------------------------------------------------------

  /**
   * Adds a new breadcrumb item to the list
   */
  add(settings?: SohoBreadcrumbItemOptions, doRender?: boolean) {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.add(settings, doRender);
    });
  }

  /**
   * Removes a single breadcrumb item from the list
   */
  remove(item: SohoBreadcrumbRef, doRender?: boolean) {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.remove(item, doRender);
    });
  }

  /**
   * Removes all breadcrumb items from the list
   */
  removeAll(doRender?: boolean) {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.removeAll(doRender);
    });
  }

  /**
   * Gets references related to a particular Breadcrumb Item.
   * The return object contains:
   * - 'a' : a reference to the breadcrumb item's anchor tag
   * - 'api' : a reference to the breadcrumb item's API
   * - 'i' : a number representing the current index of the breadcrumb item.
   */
  getBreadcrumbItem(item: SohoBreadcrumbRef) {
    if (!this.breadcrumbAPI) { return; }

    return this.breadcrumbAPI.getBreadcrumbItemAPI(item);
  }

  /**
   * Takes a reference to a Breadcrumb item and makes it "Current",
   * styling it with bold text and popping it out of truncation.
   */
  makeCurrent(item: SohoBreadcrumbRef): void {
    if (!this.breadcrumbAPI) { return; }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI.makeCurrent(item);
    });
  }

  /**
   * Updates the Breadcrumb List with new incoming settings
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
