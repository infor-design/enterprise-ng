// tslint:disable-next-line:no-unused-variable
import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Module Nav Settings element.
 * This Component attaches to an element annotated with the `soho-module-nav-settings` attribute,
 */
@Component({
  selector: 'soho-module-nav-settings, [soho-module-nav-settings]',
  styleUrls: ['./soho-module-nav-settings.component.css'],
  templateUrl: 'soho-module-nav-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavSettingsComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenavsettings?: SohoModuleNavSettingsStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavSettingsOptions = {
    displayMode: false,
  };

  /** Internal use flags */
  private _updateRequired: boolean = false;

  /** Constructor. */
  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  public accordionAPI(): SohoAccordionStatic | undefined {
    return this.modulenavsettings?.accordionAPI;
  }

  public accordionEl(): HTMLElement | undefined {
    return this.modulenavsettings?.accordionEl;
  }

  public menuAPI(): SohoPopupMenuStatic | undefined {
    return this.modulenavsettings?.menuAPI;
  }

  public init() {
    this.modulenavsettings?.init();
  }

  /** Triggers a UI Resync. */
  public updated(val?: SohoModuleNavSettingsOptions) {
    if (val) {
      this._options = jQuery.extend({}, this._options, val);
      if (this.modulenavsettings) {
        this.ngZone.runOutsideAngular(() => {
          this.modulenavsettings?.updated(this._options);
        });
      }
    }
  }

  public teardown() {
    this.modulenavsettings?.teardown();
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Initialize/store instance
      this.jQueryElement = jQuery(this.elementRef.nativeElement);
      this.jQueryElement.modulenav(this._options);
      this.modulenavsettings = this.jQueryElement.data('modulenavsettings');
    });
  }

  ngAfterViewChecked() {
    if (this.modulenavsettings && this._updateRequired) {
      this.ngZone.runOutsideAngular(() => this.modulenavsettings?.updated(this._options));
      this._updateRequired = false;
    }
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.modulenavsettings) {
        this.modulenavsettings.destroy();
        this.modulenavsettings = null;
      }
    });
  }
}
