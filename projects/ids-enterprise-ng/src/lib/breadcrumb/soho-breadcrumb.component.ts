import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Soho Breadcrumb Component
 */
@Component({
  selector: '[soho-breadcrumb]', // eslint-disable-line
  templateUrl: 'soho-breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoBreadcrumbComponent implements AfterViewInit, OnDestroy, OnInit {

  private jQueryElement?: JQuery<HTMLElement>;
  private breadcrumbAPI?: SohoBreadcrumbStatic | null;

  // Default Options
  private options: SohoBreadcrumbOptions = {
    style: 'default'
  };

  @HostBinding('class.breadcrumb') get isBreadcrumb() {
    return true;
  }

  /** Allow Breadcrumb Definition by Input */
  @Input()
  public set breadcrumbs(items: SohoBreadcrumbItemOptions[] | undefined) {
    this.options.breadcrumbs = items;
    this.updated();
  }
  public get breadcrumbs(): SohoBreadcrumbItemOptions[] | undefined {
    return this.options.breadcrumbs;
  }

  /** Allow change to alternate styling via Input **/
  @Input()
  public set alternate(val: boolean) {
    this.options.style = val ? 'alternate' : 'default';
    this.updated();
  }
  public get alternate(): boolean {
    return this.options.style === 'alternate';
  }

  /** Add truncatling behavior when a lot of items */
  @Input()
  public set truncate(truncate: boolean | undefined) {
    this.options.truncate = truncate;
    this.updated();
  }
  public get truncate(): boolean | undefined {
    return this.options.truncate;
  }

  /** Add extra attributes like id's to the component **/
  @Input()
  public set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
    this.updated();
  }
  public get attributes(): Array<Object> | Object | undefined {
    return this.options.attributes;
  }

  /** Provides access to the internal array of currently-invoked IDS Breadcrumb APIs */
  public get breadcrumbAPIs(): SohoBreadcrumbItemStatic[] {
    if (!this.breadcrumbAPI) {
      return [];
    }
    return this.breadcrumbAPI.breadcrumbs;
  }

  /** Provides access to the IDS Breadcrumb's disabled property */
  public get disabled(): boolean | undefined {
    return this.breadcrumbAPI?.disabled;
  }

  /**
   * Constructor
   *
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
        this.jQueryElement = undefined;
      }
    });
  }

  ngOnInit() {
  }

  // -------------------------------------------------------------
  // All the below methods pass through to the IDS Breadcrumb API
  // -------------------------------------------------------------

  enable(): void {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.enable();
    });
  }

  disable(): void {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.disable();
    });
  }

  /**
   * Adds a new breadcrumb item to the list
   */
  add(settings?: SohoBreadcrumbItemOptions, doRender?: boolean) {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.add(settings, doRender);
    });
  }

  /**
   * Removes a single breadcrumb item from the list
   */
  remove(item: SohoBreadcrumbRef, doRender?: boolean) {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.remove(item, doRender);
    });
  }

  /**
   * Removes all breadcrumb items from the list
   */
  removeAll(doRender?: boolean) {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.removeAll(doRender);
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
    if (!this.breadcrumbAPI) {
      return;
    }

    return this.breadcrumbAPI.getBreadcrumbItemAPI(item);
  }

  /**
   * Takes a reference to a Breadcrumb item and makes it "Current",
   * styling it with bold text and popping it out of truncation.
   */
  makeCurrent(item: SohoBreadcrumbRef): void {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.makeCurrent(item);
    });
  }

  /**
   * Updates the Breadcrumb List with new incoming settings
   */
  updated(settings?: SohoBreadcrumbOptions) {
    if (settings) {
      this.options = settings;
    }

    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.updated(this.options);
    });
  }

  /**
   * Destroys this component and tears down the IDS Breadcrumb
   */
  destroy() {
    if (!this.breadcrumbAPI) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.breadcrumbAPI?.destroy();
    });
  }
}

@Component({
  selector: '[soho-breadcrumb-list]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoBreadcrumbListComponent {
  @HostBinding('class.breadcrumb-list') isBreadcrumbList = true;
}
