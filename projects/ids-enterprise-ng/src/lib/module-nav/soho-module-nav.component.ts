// tslint:disable-next-line:no-unused-variable
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, NgZone,
  OnDestroy,
  Output,
  QueryList,
  forwardRef,
} from '@angular/core';

// import { SohoAccordionHeaderComponent } from './soho-accordion-header.component';
// import { SohoAccordionPaneComponent } from './soho-accordion-pane.component';

type SohoModuleNavDisplayModeAccessor = SohoModuleNavDisplayMode | undefined;

/**
 * Angular Wrapper for the Soho Module Nav control.
 * This Component attaches to an element annotated with the `soho-module-nav` attribute,
 */
@Component({
  selector: 'soho-module-nav',
  templateUrl: 'soho-module-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenav?: SohoModuleNavStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavOptions = {
    displayMode: false,
    filterable: false,
    pinSections: false,
    showDetailView: false,
  };

  /** Internal use flags */
  private _updateRequired: boolean = false;

  /** Constructor. */
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // -------------------------------------------
  // Inputs
  // -------------------------------------------

  @Input() set displayMode(val: SohoModuleNavDisplayModeAccessor) {
    this._options.displayMode = val;
    this.updated({ displayMode: this._options.displayMode });
    if (this.modulenav) this.modulenav.settings.displayMode = this._options.displayMode;
  }
  public get displayMode(): SohoModuleNavDisplayModeAccessor {
    return this.modulenav?.settings.displayMode || this._options.displayMode;
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  public accordionAPI(): SohoAccordionStatic | undefined {
    return this.modulenav?.accordionAPI;
  }

  public containerEl(): HTMLElement | undefined {
    return this.modulenav?.containerEl;
  }

  public switcherAPI(): SohoModuleNavSwitcherStatic | undefined {
    return this.modulenav?.switcherAPI;
  }

  public searchAPI(): SohoSearchFieldStatic | undefined {
    return this.modulenav?.searchAPI;
  }

  public settingsAPI(): SohoModuleNavSettingsStatic | undefined {
    return this.modulenav?.switcherAPI;
  }

  public init() {
    this.modulenav?.init();
  }

  /** Triggers a UI Resync. */
  public updated(val?: SohoModuleNavOptions) {
    if (val) {
      this._options = val;
      if (this.modulenav) {
        this.ngZone.runOutsideAngular(() => {
          this.modulenav?.updated(this._options);
        });
      }
    }
  }

  public teardown() {
    this.modulenav?.teardown();
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Initialize/store instance
      this.jQueryElement = jQuery(this.elementRef.nativeElement);
      this.jQueryElement.modulenav(this._options);
      this.modulenav = this.jQueryElement.data('modulenav');

      // Initialise any event handlers.
      /*
      this.jQueryElement
        .on('expand', (_e, results: any[]) => this.ngZone.run(() => this.accordionExpand.next(results)))
        .on('collapse', () => this.ngZone.run(() => this.accordionCollapse.next(true)))
        .on('expand', () => this.ngZone.run(() => this.visibility.next(true)))
        .on('collapse', () => this.ngZone.run(() => this.visibility.next(false)))
        .on('filtered', (_e, results: any[]) => this.ngZone.run(() => this.filtered.next(results)))
        .on('applicationmenuopen', () => this.ngZone.run(() => this.menuVisibility.next(true)))
        .on('applicationmenuclose', () => this.ngZone.run(() => this.menuVisibility.next(false)));
        */
    });
  }

  /** */
  ngAfterViewChecked() {
    if (this.modulenav && this._updateRequired) {
      this.ngZone.runOutsideAngular(() => this.modulenav?.updated());
      this._updateRequired = false;
    }
  }

  /** Destructor. */
  ngOnDestroy() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.modulenav) {
        this.modulenav.destroy();
        this.modulenav = null;
      }
    });
  }
}
