import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  Output,
  OnDestroy,
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';

@Component({
  selector: 'input[soho-toolbar-flex-searchfield]', // eslint-disable-line
  template: '<div #toolbarFlexSearchField><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoToolbarFlexSearchFieldComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  /**
   * Options, overwriting any existing options already set on the component, and hence combining
   * this Input with the othera is not recommended.
   *
   * (Note: could change this to use {...this._options,...value})
   */
  @Input() options: SohoToolbarFlexSearchFieldOptions = {};

  /** Adds an X button for clearing the search value. */
  @Input() set clearable(value: boolean) {
    this.options.clearable = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.clearable = value;
      this.markForRefresh();
    }
  }

  /** Where it's collapsible or not */
  @Input() set collapsible(value: boolean) {
    this.options.collapsible = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.collapsible = value;
      this.markForRefresh();
    }
  }

  @Input() set collapsibleOnMobile(value: boolean) {
    this.options.collapsibleOnMobile = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.collapsibleOnMobile = value;
      this.markForRefresh();
    }
  }

  @Input() set filterMode(value: SohoAutoCompleteFilterMode) {
    this.options.filterMode = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.filterMode = value;
      this.markForRefresh();
    }
  }

  /** AutoComplete : Source Function/Data/Url/Array */
  @Input() set source(value: SohoAutoCompleteSource) {
    this.options.source = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.source = value;
      this.markForRefresh();
    }
  }

  /** Template that can be passed */
  @Input() set template(value: string) {
    this.options.template = value;
    if (this.toolbarFlexSearchField) {
      this.toolbarFlexSearchField.settings.template = value;
      this.markForRefresh();
    }
  }

  // ------------------------------------------------------------

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() cleared: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  /**
   * @todo replace override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() {
    return true;
  }

  /**
   * Local variables
   */
  private jQueryElement?: JQuery<HTMLElement>;
  private toolbarFlexSearchField?: SohoToolbarFlexSearchFieldStatic;
  private searchFieldChanged = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.searchfield(this.options);

      // Initialize title attribute as a soho tooltip
      if (this.jQueryElement.attr('title')) {
        this.jQueryElement.tooltip();
      }

      this.toolbarFlexSearchField = this.jQueryElement.data('searchfield');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('selected', (...args) =>
        this.ngZone.run(() => this.selected.emit(args)));
      this.jQueryElement.on('change', (...args) =>
        this.ngZone.run(() => this.change.emit(args)));
      this.jQueryElement.on('cleared', (...args) =>
        this.ngZone.run(() => this.cleared.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.searchFieldChanged) {
      this.ngZone.runOutsideAngular(() => this.toolbarFlexSearchField?.updated());
      this.searchFieldChanged = false;
    }
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // clean up attached events.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.toolbarFlexSearchField) {
        // destroy the soho component.
        this.toolbarFlexSearchField.destroy();
        this.toolbarFlexSearchField = undefined;
      }
    });
  }

  clear(): void {
    this.ngZone.runOutsideAngular(() => this.toolbarFlexSearchField?.clear());
  }

  // for testing
  get searchField(): SohoToolbarFlexSearchFieldStatic | undefined {
    return this.toolbarFlexSearchField;
  }

  private markForRefresh() {
    this.searchFieldChanged = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.changeDetector.markForCheck();
  }

  updated(settings: SohoToolbarFlexSearchFieldOptions) {
    this.ngZone.runOutsideAngular(() => this.toolbarFlexSearchField?.updated(settings));
  }
}

/**
 * soho toolbar flex more button
 */
@Component({
  selector: 'soho-toolbar-flex-more-button', // eslint-disable-line
  template:
    `<button
      class="btn-actions"
      type="button"
      [ngClass]="{'page-changer': isPageChanger}"
      [attr.id]="moreButtonId"
      [attr.disabled]="isDisabled ? 'disabled' : null"
    >
      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
        <use href="#icon-more"></use>
      </svg>
      <span class="audible">More Actions</span>
    </button>
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexMoreButtonComponent {
  @HostBinding('class.more') isMoreButton = true;
  @HostBinding('class.toolbar-section') isToolbarSection = true;
  @Input() isPageChanger = false;
  @Input() isDisabled = false;

  @Input() moreButtonId?: string;
  /** @deprecated doesn't seem to be used **/
  @Input() ajaxBeforeFunction?: Function;
  /** @deprecated doesn't seem to be used **/

  @Input() menuId?: string;
}

/**
 * soho toolbar flex page title.
 */
@Component({
  selector: '[soho-toolbar-flex-page-title]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexPageTitleComponent {
  @HostBinding('class.page-title') isPageTitle = true;
}

/**
 * soho toolbar flex section title.
 */
@Component({
  selector: '[soho-toolbar-flex-section-title]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexSectionTitleComponent {
  @HostBinding('class.section-title') isSectionTitle = true;
}

/**
 * Generic soho toolbar flex section
 */
@Component({
  selector: 'soho-toolbar-flex-section', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexSectionComponent {
  @HostBinding('class.toolbar-section') isToolbarSection = true;
  @Input() @HostBinding('class.favor') isTitleFavor = false;
  @Input() @HostBinding('class.title') isTitle = false;
  @Input() @HostBinding('class.buttonset') isButtonSet = false;
  @Input() @HostBinding('class.search') isSearch = false;
}

/**
 * Soho toolbar Navigation button
 */
@Component({
  selector: 'button[soho-toolbar-flex-nav-button]', // eslint-disable-line
  template: `
    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
      <use href="#icon-menu"></use>
    </svg>
    <span class="audible">
        <ng-content></ng-content>
    </span>
            `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexNavButtonComponent implements AfterViewInit {
  @HostBinding('class.btn-icon') isIconButton = true;
  @HostBinding('class.application-menu-trigger') isAppMenuTrigger = true;
  @HostBinding('attr.type') typeAttr = 'button';

  /** Reference to the Soho control api. */
  private button?: SohoButtonStatic | null;

  private _buttonOptions: SohoButtonOptions = {};

  /** Reference to the jQuery control. */
  private jQueryElement?: JQuery;

  constructor(private element: ElementRef, private ngZone: NgZone) {
  }

  @Input() set buttonOptions(buttonOptions: SohoButtonOptions) {
    ArgumentHelper.checkNotNull('buttonOptions', buttonOptions);

    this._buttonOptions = buttonOptions;
    if (this.button) {
      // todo: how to update the button when options change?
    }
  }

  get buttonOptions(): SohoButtonOptions {
    return this._buttonOptions;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      const self = this;

      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.button(this._buttonOptions);

      this.button = this.jQueryElement.data('button');
    });
  }


  updated(settings?: SohoButtonOptions) {
    if (settings) {
      this._buttonOptions = Soho.utils.mergeSettings((this.element as any)[0], settings, this._buttonOptions);
    }
    if (this.button) {
      this.ngZone.runOutsideAngular(() => {
        this.button?.updated(this._buttonOptions)
      });
    }
  }
}

/**
 * The main soho toolbar flex component
 */
@Component({
  selector: 'soho-toolbar-flex, div[soho-toolbar-flex]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @HostBinding('class.flex-toolbar') isToolbar = true;

  /**
   * Allows a moreMenuSettings object to be propagated down into the Toolbar Flex.
   * the jQuery Toolbar Flex component handles passing these settings into the More Actions
   * menu's jQuery Popupmenu.
   */
  @Input() set moreMenuBeforeOpenFunction(beforeOpen: AjaxBeforeMoreMenuOpenFunction) {
    if (!this._options.moreMenuSettings) {
      this._options.moreMenuSettings = {};
    }
    this._options.moreMenuSettings.beforeOpen = beforeOpen;

    if (this.toolbarFlex) {
      this.toolbarFlex.settings.beforeMoreMenuOpen = beforeOpen;
      this.markForRefresh();
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this._options.attributes = attributes;
    if (this.toolbarFlex) {
      this.toolbarFlex.settings.attributes = attributes;
      this.markForRefresh();
    }
  }

  /**
   * The selected event is fired when a toolbar button has been clicked.
   */
  @Output() selected: EventEmitter<SohoToolbarFlexSelectedEvent> = new EventEmitter<SohoToolbarFlexSelectedEvent>();

  private _options: SohoToolbarFlexOptions = {};
  private jQueryElement?: JQuery<HTMLElement>;
  private toolbarFlex?: SohoToolbarFlexStatic | null;
  private toolbarFlexChanged?: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.toolbarflex(this._options);
      this.toolbarFlex = this.jQueryElement.data('toolbarFlex');

      this.jQueryElement.on('selected', (event: JQuery.TriggeredEvent, item: SohoToolbarFlexItemStatic) =>
        this.ngZone.run(() => {
          this.selected.emit({ event, item });
        }));
    });
  }

  ngAfterViewChecked() {
    if (this.toolbarFlexChanged) {
      this.updated();
      this.toolbarFlexChanged = false;
    }
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.toolbarFlex) {
        this.toolbarFlex.destroy();
        this.toolbarFlex = null;
      }
    });
  }

  updated(settings?: SohoToolbarFlexOptions) {
    if (this.toolbarFlex) {
      this.ngZone.runOutsideAngular(() => this.toolbarFlex?.updated(settings));
    }
  }

  /**
   * The buttonset API for the modal dialog.
   *
   * @returns the buttonset API for the modal dialog, if initialised.
   */
  public get buttonsetAPIs(): Array<SohoButtonsetStatic> | undefined {
    return this.toolbarFlex ? this.toolbarFlex.buttonsetAPIs : undefined;
  }

  /**
   * The buttonset API for the modal dialog.
   *
   * @returns the buttonset API for the modal dialog, if initialised.
   */
  public get buttonsets(): Array<HTMLElement> | undefined {
    return this.toolbarFlex ? this.toolbarFlex.buttonsets : undefined;
  }

  // For testing
  get options(): SohoToolbarFlexOptions {
    return this._options;
  }

  private markForRefresh() {
    this.toolbarFlexChanged = true;

    this.changeDetector.markForCheck();
  }
}
