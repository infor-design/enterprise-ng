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
    generate: false,
    icon: undefined,
    changeIconOnSelect: true,
    noSearch: false,
    moduleButtonText: undefined,
    roleDropdownLabel: undefined,
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

  @Input() set generate(val: boolean | undefined) {
    this._options.generate = val;
    this.updated({ generate: this._options.generate });
  }
  public get generate(): boolean | undefined {
    return this.modulenavswitcher?.settings.generate || this._options.generate;
  }

  @Input() set changeIconOnSelect(val: boolean | undefined) {
    this._options.changeIconOnSelect = val;
    this.updated({ changeIconOnSelect: this._options.changeIconOnSelect });
  }
  public get changeIconOnSelect(): boolean | undefined {
    return this.modulenavswitcher?.settings.changeIconOnSelect || this._options.changeIconOnSelect;
  }

  @Input() set icon(val: SohoModuleNavSwitcherIconSetting) {
    this._options.icon = val;
    this.updated({ icon: this._options.icon });
  }
  public get icon(): SohoModuleNavSwitcherIconSetting {
    return this.modulenavswitcher?.settings.icon || this._options.icon;
  }

  @Input() set noSearch(val: boolean | undefined) {
    console.log(val);
    this._options.noSearch = val;
    this.updated({ noSearch: this._options.noSearch });
  }
  public get noSearch(): boolean | undefined {
    return this.modulenavswitcher?.settings.noSearch || this._options.noSearch;
  }

  @Input() set moduleButtonText(val: string | undefined) {
    this._options.moduleButtonText = val;
    this.updated({ moduleButtonText: this._options.moduleButtonText });
  }
  public get moduleButtonText(): string | undefined {
    return this.modulenavswitcher?.settings.moduleButtonText || this._options.moduleButtonText;
  }

  @Input() set roleDropdownLabel(val: string | undefined) {
    this._options.roleDropdownLabel = val;
    this.updated({ roleDropdownLabel: this._options.roleDropdownLabel });
  }
  public get roleDropdownLabel(): string | undefined {
    return this.modulenavswitcher?.settings.roleDropdownLabel || this._options.roleDropdownLabel;
  }

  @Input() set roles(val: Array<SohoModuleNavSwitcherRoleRecord> | undefined) {
    this._options.roles = val;
    if (val) this.setRoles(val);
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

  public toggleModuleButtonFocus(doFocus?: boolean) {
    this.modulenavswitcher?.toggleModuleButtonFocus(doFocus);
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

  /** Sets the roles array programmatically */
  setRoles(val: Array<SohoModuleNavSwitcherRoleRecord>) {
    if (this.modulenavswitcher) {
      this.modulenavswitcher.settings.roles = val;
      this.modulenavswitcher.setRoles(val, true);

      setTimeout(() => {
        const selected = this.modulenavswitcher?.roleDropdownAPI?.selectedValues;
        if (selected?.length) {
          this.selectRole(selected[0]);
        }
      }, 10);
    }
  }

  /** Sets the current dropdown role using <option> tag's `value` */
  selectRole(val: string) {
    this.modulenavswitcher?.selectRole(val);
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
      if (this._options.noSearch)
        this.jQueryElement.find('select').attr('data-options', `{ noSearch: true}`);

      this.jQueryElement.modulenavswitcher(this._options);
      this.modulenavswitcher = this.jQueryElement.data('modulenavswitcher');

      // @todo - add event binding control so we don't bind if not required.
      this.jQueryElement
        .on('change', (event: JQuery.TriggeredEvent) => this.onRoleChange(event))
    });
  }

  ngAfterViewChecked() {
    if (this.modulenavswitcher && this._updateRequired) {
      this.ngZone.runOutsideAngular(() => this.modulenavswitcher?.updated(this._options));
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
