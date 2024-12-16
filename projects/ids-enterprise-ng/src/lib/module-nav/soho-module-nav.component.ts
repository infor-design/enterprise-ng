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

/**
 * Angular Wrapper for the Soho Module Nav control.
 * This Component attaches to an element annotated with the `soho-module-nav` attribute,
 */
@Component({
    selector: 'soho-module-nav, [soho-module-nav]',
    styleUrls: ['./soho-module-nav.component.css'],
    templateUrl: 'soho-module-nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoModuleNavComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenav?: SohoModuleNavStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavOptions = {
    accordionSettings: {},
    displayMode: false,
    initChildren: true,
    filterable: false,
    pinSections: false,
    showDetailView: false,
    mobileBehavior: true,
    breakpoint: 'phone-to-tablet',
    showOverlay: true,
    showModuleSwitcher: true,
    showGuestSection: false,
    showSearchBar: true,
    enableOutsideClick: false,
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

  @Input() set accordionSettings(val: SohoAccordionOptions | undefined) {
    this._options.accordionSettings = val;
    this.updated({ accordionSettings: this._options.accordionSettings });
  }
  public get accordionSettings(): SohoAccordionOptions | undefined {
    return this.modulenav?.settings.accordionSettings || this._options.accordionSettings;
  }

  @Input() set displayMode(val: SohoModuleNavDisplayMode | undefined) {
    this._options.displayMode = val;
    this.updated({ displayMode: this._options.displayMode });
  }
  public get displayMode(): SohoModuleNavDisplayMode | undefined {
    return this.modulenav?.settings.displayMode || this._options.displayMode;
  }

  // Mobile Options
  @Input() set mobileBehavior(val: boolean) {
    this._options.mobileBehavior = val;
    this.updated({ mobileBehavior: this._options.mobileBehavior });
  }
  public get mobileBehavior(): boolean {
    return this.modulenav?.settings.mobileBehavior || this._options.mobileBehavior || false;
  }

  @Input() set breakpoint(val: SohoModuleNavBreakPoint) {
    this._options.breakpoint = val;
    this.updated({ breakpoint: this._options.breakpoint });
  }
  public get breakpoint(): SohoModuleNavBreakPoint {
    return this.modulenav?.settings.breakpoint || this._options.breakpoint || 'phone-to-tablet';
  }

  @Input() set showOverlay(val: boolean) {
    this._options.showOverlay = val;
    this.updated({ showOverlay: this._options.showOverlay });
  }
  public get showOverlay(): boolean {
    return this.modulenav?.settings.showOverlay || this._options.showOverlay || false;
  }

  @Input() set showModuleSwitcher(val: boolean) {
    this._options.showModuleSwitcher = val;
    this.updated({ showModuleSwitcher: this._options.showModuleSwitcher });
  }
  public get showModuleSwitcher(): boolean {
    return this.modulenav?.settings.showModuleSwitcher || this._options.showModuleSwitcher || false;
  }

  @Input() set showGuestSection(val: boolean) {
    this._options.showGuestSection = val;
    this.updated({ showGuestSection: this._options.showGuestSection });
  }
  public get showGuestSection(): boolean {
    return this.modulenav?.settings.showGuestSection || this._options.showGuestSection || false;
  }

  @Input() set showSearchBar(val: boolean) {
    this._options.showSearchBar = val;
    this.updated({ showSearchBar: this._options.showSearchBar });
  }
  public get showSearchBar(): boolean {
    return this.modulenav?.settings.showSearchBar || this._options.showSearchBar || false;
  }

  @Input() set enableOutsideClick(val: boolean) {
    this._options.enableOutsideClick = val;
    this.updated({ enableOutsideClick: this._options.enableOutsideClick });
  }
  public get enableOutsideClick(): boolean {
    return this.modulenav?.settings.enableOutsideClick || this._options.enableOutsideClick || false;
  }

  @Input() set filterable(val: boolean) {
    this._options.filterable = val;
    this.updated({ filterable: this._options.filterable });
  }
  public get filterable(): boolean {
    return this.modulenav?.settings.filterable || this._options.filterable || false;
  }

  @Input() set initChildren(val: boolean) {
    this._options.initChildren = val;
    this.updated({ initChildren: this._options.initChildren });
  }
  public get initChildren(): boolean {
    return this.modulenav?.settings.initChildren || this._options.initChildren || false;
  }

  @Input() set pinSections(val: boolean) {
    this._options.pinSections = val;
    this.updated({ pinSections: this._options.pinSections });
  }
  public get pinSections(): boolean {
    return this.modulenav?.settings.pinSections || this._options.pinSections || false;
  }

  @Input() set showDetailView(val: boolean) {
    this._options.showDetailView = val;
    this.updated({ showDetailView: this._options.showDetailView });
  }
  public get showDetailView(): boolean {
    return this.modulenav?.settings.showDetailView || this._options.showDetailView || false;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() displaymodechange = new EventEmitter<SohoModuleNavDisplayModeChangeEvent>();

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
      this._options = jQuery.extend({}, this._options, val);
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

  /**
   * Updates the accordion and expands the target header
   * @param sohoModuleNavComponent
   * @param target
   */
  public updateLazy(sohoModuleNavComponent: SohoModuleNavComponent, target: any) {
    const $applicationMenu = jQuery(sohoModuleNavComponent.elementRef.nativeElement).data('modulenav');
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        $applicationMenu.accordionAPI.updated();
        const header = jQuery(target).closest('.accordion-header');
        $applicationMenu.accordionAPI.expand(header);
      }, 1);
    });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Initialize/store instance
      this.jQueryElement = jQuery(this.elementRef.nativeElement)!;
      this.jQueryElement.modulenav(this._options);
      this.modulenav = this.jQueryElement.data('modulenav');

      // bind to jquery events and emit as angular events
      this.jQueryElement.on('displaymodechange', (e: JQuery.TriggeredEvent, val: SohoModuleNavDisplayMode) =>
        this.ngZone.run(() => this.displaymodechange.emit({ e, val })));
    });
  }

  ngAfterViewChecked() {
    if (this.modulenav && this._updateRequired) {
      this.ngZone.runOutsideAngular(() => this.modulenav?.updated(this._options));
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
      if (this.modulenav) {
        this.modulenav.destroy();
        this.modulenav = null;
      }
    });
  }
}
