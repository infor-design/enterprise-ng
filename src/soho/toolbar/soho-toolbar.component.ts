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
  Output,
  OnDestroy, NgZone,
} from '@angular/core';

/**
 * needed in case you are using an *ngIf to display and remove the toolbar search field.
 * Otherwise sohoxi will create a wrapper and angular will not know how to handle the
 * element structure change.
 */
@Component({
  selector: 'span[soho-toolbar-searchfield-wrapper]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoToolbarSearchFieldWrapperComponent {
  @HostBinding('class.searchfield-wrapper') get isSearchfieldWrapper() { return true; }
  @HostBinding('class.toolbar-searchfield-wrapper') get isToolbarSearchfieldWrapper() { return true; }
}

@Component({
  selector: 'input[soho-toolbar-searchfield]', // tslint:disable-line
  template: '<div #toolbarSearchField><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SohoToolbarSearchFieldComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  /** Options. */
  @Input() options: SohoToolbarSearchFieldOptions = {};

  /** Adds an X button for clearing the search value. */
  @Input() set clearable(value: boolean) {
    this.options.clearable = value;
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.settings.clearable = value;
      this.markForRefresh();
    }
  }

  /** Where it's collapsible or not */
  @Input() set collapsible(value: boolean) {
    this.options.collapsible = value;
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.settings.collapsible = value;
      this.markForRefresh();
    }
  }

  @Input() set collapsibleOnMobile(value: boolean) {
    this.options.collapsibleOnMobile = value;
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.settings.collapsibleOnMobile = value;
      this.markForRefresh();
    }
  }

  /** AutoComplete : Source Function/Data/Url/Array */
  @Input() set source(value: SohoAutoCompleteSource) {
    this.options.source = value;
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.settings.source = value;
      this.markForRefresh();
    }
  }

  /** Template that can be passed */
  @Input() set template(value: string) {
    this.options.template = value;
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.settings.template = value;
      this.markForRefresh();
    }
  }

  // ------------------------------------------------------------

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() cleared: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() { return true; }

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private toolbarsearchfield: SohoToolbarSearchFieldStatic;
  private searchFieldChanged = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.toolbarsearchfield(this.options);

      // Initialize title attribute as a soho tooltip
      if (this.jQueryElement.has('[title]')) {
        this.jQueryElement.tooltip();
      }

      this.toolbarsearchfield = this.jQueryElement.data('toolbarsearchfield');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('selected', (...args) =>
        this.ngZone.run(() => setTimeout(() => this.selected.emit(args), 1)));

      this.jQueryElement.on('cleared', (...args) =>
        this.ngZone.run(() => setTimeout(() => this.cleared.emit(args), 1)));
    });
  }

  ngAfterViewChecked() {
    if (this.searchFieldChanged) {
      this.ngZone.runOutsideAngular(() => this.toolbarsearchfield.updated());
      this.searchFieldChanged = false;
    }
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // clean up attached events.
        this.jQueryElement.off();
      }
      if (this.toolbarsearchfield) {
        // destroy the soho component.
        this.toolbarsearchfield.destroy();
        this.toolbarsearchfield = undefined;
      }
    });
  }

  clear(): void {
    this.ngZone.runOutsideAngular(() => this.toolbarsearchfield.clear());
  }

  private markForRefresh() {
    this.searchFieldChanged = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.changeDetector.markForCheck();
  }
}

/**
 * soho toolbar more button
 */
@Component({
  selector: 'soho-toolbar-more-button',
  template: `
              <button class="btn-actions page-changer" type="button" [attr.disabled]="isDisabled ? 'disabled' : null">
                <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                  <use xlink:href="#icon-more"></use>
                </svg>
                <span class="audible" data-translate="text">More</span>
              </button>
              <!-- TODO: look into handling this through soho-button
              <button soho-button="actions" pageChanger="true" icon="more">
                <span class="audible" data-translate="text">More</span>
              </button>
              -->

              <ng-content></ng-content>
            `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarMoreButtonComponent {
  @HostBinding('class.more') get isMoreButton() { return true; }
  @Input() isDisabled = false;
}

/**
 * soho toolbar page title.
 */
@Component({
  selector: 'span[soho-page-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoPageTitleComponent {
  @HostBinding('class.page-title') get isPageTitle() { return true; }
}

/**
 * soho section title.
 */
@Component({
  selector: 'span[soho-section-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoSectionTitleComponent {
  @HostBinding('class.section-title') get isSectionTitle() { return true; }
}

/**
 * Soho toolbar Navigation button
 */
@Component({
  selector: 'button[soho-nav-button]', // tslint:disable-line
  template: `
              <span class="icon app-header">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
      </span>
              <span class="audible">
        <ng-content></ng-content>
      </span>
            `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarNavButtonComponent {
  // This HostBinding needs to go first to maintain correct styling
  @HostBinding('class.btn-icon') get isIconButton() { return true; }
  @HostBinding('class.application-menu-trigger') get isAppMenuTrigger() { return true; }
  @HostBinding('attr.type') get typeAttr() { return 'button'; }
}

/**
 * Soho toolbar title
 */
@Component({
  selector: 'soho-toolbar-title',
  template: `<ng-content></ng-content>`,
  styles: [`{ display:inline-block }`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarTitleComponent {
  @HostBinding('class.title') get isTitle() { return true; }
}

/**
 * Soho toolbar buttonset
 */
@Component({
  selector: 'soho-toolbar-button-set',
  template: `<ng-content></ng-content>`,
  styles: [`{ display:inline-block }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoToolbarButtonSetComponent {
  @HostBinding('class.buttonset') get isButtonSet() { return true; }
}

/**
 * The main soho toolbar component
 */
@Component({
  selector: 'soho-toolbar, div[soho-toolbar]',
  templateUrl: './soho-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  @HostBinding('class.toolbar') get isToolbar() { return true; }
  @HostBinding('class.has-more-button') get showMoreButton() {
    return this.options.hasMoreButton;
  }
  @HostBinding('style.display') get isBlock() {
    // custom elements don't have display: block set by default so set it here.
    // if display is expected to be overridden then use div[soho-toolbar] selector
    // instead. For example when a @media query wants to set something to display: none.
    return this.element.nativeElement.tagName === 'SOHO-TOOLBAR' ? 'block' : null;
  }

  /**
   * Whether to display the overflow more-button or not regardless of
   * overflow content.
   */
  @HostBinding('class.no-actions-button') @Input() noActionsButton = false;

  /**
   * Set the has more button component option, this is used
   * to define if the more button is expected to exist in the toolbar logic.
   */
  @Input() set hasMoreButton(value: boolean) {
    this.options.hasMoreButton = value;
    if (this.toolbar) {
      this.toolbar.settings.hasMoreButton = value;
      this.markForRefresh();
    }
  }

  /**
   * Set the expected max visible buttons before overflow is forced.
   */
  @Input() set maxVisibleButtons(value: number) {
    this.options.maxVisibleButtons = value;
    if (this.toolbar) {
      this.toolbar.settings.maxVisibleButtons = value;
      this.markForRefresh();
    }
  }

  /**
   * Set the rightAligned hint. This is for toolbars with no title that should be forced to right align.
   */
  @Input() set rightAligned(value: boolean) {
    this.options.rightAligned = value;
    if (this.toolbar) {
      this.toolbar.settings.rightAligned = value;
      this.markForRefresh();
    }
  }

  /**
   * @deprecated Use the rightAligned option.
   */
  @Input() set rightAlign(value: boolean) {
    console.warn('This input has been renamed, please use the rightAligned input instead.');

    this.options.rightAligned = value;
    if (this.toolbar) {
      this.toolbar.settings.rightAligned = value;
      this.markForRefresh();
    }
  }

  /**
   * If true, uses Javascript to size the Title and Buttonset elements in a way that shows as much of the Title area as possible.
   */
  @Input() set resizeContainers(value: boolean) {
    this.options.resizeContainers = value;
    if (this.toolbar) {
      this.toolbar.settings.resizeContainers = value;
      this.markForRefresh();
    }
  }

  /**
   * If "resizeContainers" is true, setting this to true will try to display as many buttons as possible while resizing the toolbar.
   * Setting to false attempts to show the entire title instead.
   */
  @Input() set favorButtonset(value: boolean) {
    this.options.favorButtonset = value;
    if (this.toolbar) {
      this.toolbar.settings.favorButtonset = value;
      this.markForRefresh();
    }
  }

  /**
   * Allows a moreMenuSettings object to be propagated down into the Toolbar.
   * the jQuery Toolbar component handles passing these settings into the More Actions
   * menu's jQuery Popupmenu.
   */
  @Input() set moreMenuSettings(value: SohoPopupMenuOptions) {
    this.options.moreMenuSettings = value;
    if (this.toolbar) {
      this.toolbar.settings.moreMenuSettings = value;
      this.markForRefresh();
    }
  }

  /**
   * A initial setting only of the events you'd like to have hooked up in the agnular wrapper.
   * This aids in reducing change detection as each bound event that gets called (whether you
   * are interested in it or not) causes change detection to get called which causes the screen
   * to re-render each time.
   *
   * This is backward compatible if you don't use the registerForEvents input. If you want no
   * events hooked up then use registerForEvent="". Otherwise just specify the events you want
   * hooked up to sohoxi from this angular component.
   *
   * @type {string} a space delimited list of the events to be hooked up to sohoxi.
   *       example: "activated afterActivated tabAdded"
   */
  @Input() registerForEvents = undefined;

  /**
   * The beforeactivate event is fired whenever a toolbar is activated giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeActivated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The activated event is if the beforeActivate succeeds.
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The afteractivate event is fired after the toolbar has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afterActivated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The selected event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<SohoToolbarSelectedEvent>}
   */
  @Output() selected: EventEmitter<SohoToolbarSelectedEvent> = new EventEmitter<SohoToolbarSelectedEvent>();

  // Lazy load example
  // Not fully implemented, see SOHO-5011
  @Output() menuItemMouseOver: EventEmitter<HTMLButtonElement> = new EventEmitter<HTMLButtonElement>();

  private options: SohoToolbarOptions = {};
  private jQueryElement: JQuery;
  private toolbar: SohoToolbarStatic;
  private toolbarChanged: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.options.noSearchfieldReinvoke = true;

      // Assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.toolbar(this.options);
      this.toolbar = this.jQueryElement.data('toolbar');

      // bind to jquery events and emit as angular events
      this.hookupRegisteredEvents();

      this.toolbar = this.jQueryElement.data('toolbar');
    });
  }

  ngAfterViewChecked() {
    if (this.toolbarChanged) {
      this.updated();
      this.toolbarChanged = false;
    }
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.toolbar) {
        this.toolbar.destroy();
        this.toolbar = null;
      }
    });
  }

  private hookupRegisteredEvents() {
    NgZone.assertNotInAngularZone();

    let eventsToRegister = null;
    if (this.registerForEvents !== undefined) {
      eventsToRegister = this.registerForEvents.split(' ');
    }

    // if no events are registered then all event will be bound for backward compatibility.
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforeactivated')) {
      this.jQueryElement.on('beforeactivated', (event: JQuery.Event) =>
        this.ngZone.run(() => setTimeout(() => this.beforeActivated.emit(event), 1)));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'activated')) {
      this.jQueryElement.on('activated', (event: JQuery.Event) =>
        this.ngZone.run(() => setTimeout(() => this.activated.emit(event), 1)));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'afteractivated')) {
      this.jQueryElement.on('afteractivated', (event: JQuery.Event) =>
        this.ngZone.run(() => setTimeout(() => this.afterActivated.emit(event), 1)));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'selected')) {
      this.jQueryElement.on('selected', (event: JQuery.Event, item: HTMLButtonElement | HTMLAnchorElement) =>
        this.ngZone.run(() => setTimeout(() => this.selected.emit({event, item}), 1)));
    }

    // Returns original button info on mouseover event
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'mouseover')) {
      this.jQueryElement.find('.more').on('mouseover', 'li.submenu', ((event: JQuery.Event) => {
        const originalButton: HTMLButtonElement = jQuery(event.target).data('originalButton');

        if (originalButton !== undefined) {
          this.ngZone.run(() => setTimeout(() => this.menuItemMouseOver.emit(originalButton), 1));
        }
      }));
    }
  }

  updated(settings?) {
    if (this.toolbar) {
      this.ngZone.runOutsideAngular(() => this.toolbar.updated(settings));
    }
  }

  handleResize() {
    if (this.toolbar) {
      this.ngZone.runOutsideAngular(() => this.toolbar.handleResize());
    }
  }

  private markForRefresh() {
    this.toolbarChanged = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.changeDetector.markForCheck();
  }
}
