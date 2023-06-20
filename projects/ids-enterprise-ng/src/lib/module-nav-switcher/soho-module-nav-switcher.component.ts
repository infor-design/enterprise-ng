// tslint:disable-next-line:no-unused-variable
import {
  AfterViewInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Module Nav Switcher element.
 * This Component attaches to an element annotated with the `soho-module-nav-switcher` attribute,
 */
@Component({
  selector: 'soho-module-nav-switcher, [soho-module-nav-switcher]',
  styleUrls: ['./soho-module-nav-switcher.component.css'],
  templateUrl: 'soho-module-nav-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavSwitcherComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenavswitcher?: SohoModuleNavSwitcherStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavSwitcherOptions = {
    displayMode: false,
    icon: undefined,
    roles: []
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

  @Input() set displayMode(val: SohoModuleNavDisplayMode | undefined) {
    this._options.displayMode = val;
    this.updated({ displayMode: this._options.displayMode });
  }
  public get displayMode(): SohoModuleNavDisplayMode | undefined {
    return this.modulenavswitcher?.settings.displayMode || this._options.displayMode;
  }

  @Input() set icon(val: SohoModuleNavSwitcherIconSetting) {
    this._options.icon = val;
    this.updated({ icon: this._options.icon });
  }
  public get icon(): SohoModuleNavSwitcherIconSetting {
    return this.modulenavswitcher?.settings.icon || this._options.icon;
  }

  @Input() set roles(val: Array<SohoModuleNavSwitcherRoleRecord> | undefined) {
    this._options.roles = val;
    this.updated({ roles: this._options.roles });
  }
  public get roles(): Array<SohoModuleNavSwitcherRoleRecord> | undefined {
    return this.modulenavswitcher?.settings.roles || this._options.roles;
  }

  // -------------------------------------------
  // Outputs
  // -------------------------------------------

  @Output() rolechange = new EventEmitter<JQuery.TriggeredEvent>();

  @Output() modulebuttonclick = new EventEmitter<JQuery.TriggeredEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  public accordionAPI(): SohoAccordionStatic | undefined {
    return this.modulenavswitcher?.accordionAPI;
  }

  public accordionEl() {
    return this.modulenavswitcher?.accordionEl;
  }

  public moduleButtonAPI() {
    return this.modulenavswitcher?.moduleButtonAPI;
  }

  public roleDropdownAPI() {
    return this.modulenavswitcher?.roleDropdownAPI;
  }

  public init() {
    this.modulenavswitcher?.init();
  }

  /** Triggers a UI Resync. */
  public updated(val?: SohoModuleNavSwitcherOptions) {
    if (val) {
      this._options = jQuery.extend({}, this._options, val);
      if (this.modulenavswitcher) {
        this.ngZone.runOutsideAngular(() => {
          this.modulenavswitcher?.updated(this._options);
        });
      }
    }
  }

  public teardown() {
    this.modulenavswitcher?.teardown();
  }

  /** Triggered by a Module Button click */
  onModuleButtonClick(event: JQuery.TriggeredEvent) {
    this.modulebuttonclick.emit(event);
  }

  /** Triggered by a Role Dropdown change */
  onRoleChange(event: JQuery.TriggeredEvent) {
    this.rolechange.emit(event);
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Initialize/store instance
      this.jQueryElement = jQuery(this.elementRef.nativeElement);
      this.jQueryElement.modulenav(this._options);
      this.modulenavswitcher = this.jQueryElement.data('modulenavswitcher');
    });
  }

  ngAfterViewChecked() {
    if (this.modulenavswitcher && this._updateRequired) {
      this.ngZone.runOutsideAngular(() => this.modulenavswitcher?.updated());
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
      if (this.modulenavswitcher) {
        this.modulenavswitcher.destroy();
        this.modulenavswitcher = null;
      }
    });
  }
}
