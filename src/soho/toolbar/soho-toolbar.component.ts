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
  OnDestroy,
} from '@angular/core';

// copied wrapper component from soho-searchfield.component.ts. not sure it's needed.
// @Component({
//   selector: 'span[soho-toolbar-searchfield-wrapper]', // tslint:disable-line
//   template: `<ng-content></ng-content>`
// })
// export class SohoToolbarSearchFieldWrapperComponent {
//   @HostBinding('class.searchfield-wrapper') get isSearchfieldWrapper() { return true; }
//   @HostBinding('class.toolbar-searchfield-wrapper') get isToolbarSearchfieldWrapper() { return true; }
// }

@Component({
  selector: 'input[soho-toolbar-searchfield]', // tslint:disable-line
  template: '<div #toolbarSearchField><ng-content></ng-content></div>'
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
  ) {}

  ngAfterViewInit() {
    // ------------------------------------------------------------------------
    // Use setTimeOut so that the search field control isn't initialized
    // with the toolbarsearchfield inputs until after the toolbar is created.
    // ------------------------------------------------------------------------
    setTimeout(() => {
      this.initSohoControl();
    }, 1);
  }

  private initSohoControl() {
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
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('cleared', (...args) => this.cleared.emit(args));
  }

  ngAfterViewChecked() {
    if (this.searchFieldChanged) {
      this.toolbarsearchfield.updated();
      this.searchFieldChanged = false;
    }
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.destroy();
      this.toolbarsearchfield = undefined;
    }
  }

  clear(): void {
    this.toolbarsearchfield.clear();
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
    <button class="btn-actions page-changer" type="button">
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
  @HostBinding('class.more') get isMoreButton() { return true; };
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
  @HostBinding('class.page-title') get isPageTitle() { return true; };
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
  @HostBinding('class.section-title') get isSectionTitle() { return true; };
}

/**
 * Soho toolbar Navigation button
 */
@Component({
  selector: 'button[soho-nav-button]', // tslint:disable-line
  template: `
      <span class="audible">
        <ng-content></ng-content>
      </span>
      <span class="icon app-header">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
      </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarNavButtonComponent {
  @HostBinding('class.application-menu-trigger') get isAppMenuTrigger() { return true; };
  @HostBinding('class.btn-icon') get isIconButton() { return true; };
  @HostBinding('attr.type') get typeAttr() { return 'button'; };
}

/**
 * Soho toolbar title
 */
@Component({
  selector: 'soho-toolbar-title',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarTitleComponent {
  @HostBinding('class.title') get isTitle() { return true; };
}

/**
 * Soho toolbar buttonset
 */
@Component({
  selector: 'soho-toolbar-button-set',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoToolbarButtonSetComponent {
  @HostBinding('class.buttonset') get isButtonSet() { return true; };
  @HostBinding('style.display') get isInlineBlock() { return 'inline-block'; };
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
  @HostBinding('class.toolbar') get isToolbar() { return true; };
  @HostBinding('class.has-more-button') get showMoreButton() {
    return this.options.hasMoreButton;
  }
  @HostBinding('style.display') get isBlock() {
    // custom elements don't have display: block set by default so set it here.
    // if display is expected to be overridden then use div[soho-toolbar] selector
    // instead. For example when a @media query wants to set something to display: none.
    return this.element.nativeElement.tagName === 'SOHO-TOOLBAR' ? 'block' : null;
  }

  @Input() set hasMoreButton(value: boolean) {
    this.options.hasMoreButton = value;
    if (this.toolbar) {
      this.toolbar.settings.hasMoreButton = value;
      this.markForRefresh();
    }
  }

  @Input() set maxVisibleButtons(value: number) {
    this.options.maxVisibleButtons = value;
    if (this.toolbar) {
      this.toolbar.settings.maxVisibleButtons = value;
      this.markForRefresh();
    }
  }

  @Input() set rightAlign(value: boolean) {
    this.options.rightAlign = value;
    if (this.toolbar) {
      this.toolbar.settings.rightAlign = value;
      this.markForRefresh();
    }
  }

  @Input() set resizeContainers(value: boolean) {
    this.options.resizeContainers = value;
    if (this.toolbar) {
      this.toolbar.settings.resizeContainers = value;
      this.markForRefresh();
    }
  }

  @Input() set favorButtonset(value: boolean) {
    this.options.favorButtonset = value;
    if (this.toolbar) {
      this.toolbar.settings.favorButtonset = value;
      this.markForRefresh();
    }
  }

  /**
   * The beforeactivate event is fired whenever a toolbar is activated giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeActivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The activated event is if the beforeActivate succeeds.
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The afteractivate event is fired after the toolbar has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afterActivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

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
    private element: ElementRef
  ) {}

  ngAfterViewInit() {
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.toolbar(this.options);
    this.toolbar = this.jQueryElement.data('toolbar');

    // bind to jquery events and emit as angular events
    this.jQueryElement
    .on('beforeactivate', ((event: JQueryEventObject) => { this.beforeActivate.emit(event); }))
    .on('activated', ((event: JQueryEventObject) => { this.activated.emit(event); }))
    .on('afteractivate', ((event: JQueryEventObject) => { this.afterActivate.emit(event); }))
    .on('selected', (event: JQueryEventObject, item: HTMLButtonElement | HTMLAnchorElement) => {
      this.selected.emit({ event, item });
    });

    // Returns original button info on mouseover event
    this.jQueryElement.find('.more').on('mouseover', 'li.submenu', ((event: JQueryEventObject) => {
      const originalButton: HTMLButtonElement = jQuery(event.target).data('originalButton');

      if (originalButton !== undefined) {
        this.menuItemMouseOver.emit(originalButton);
      }
    }));

    this.toolbar = this.jQueryElement.data('toolbar');
  }

  ngAfterViewChecked() {
    if (this.toolbarChanged) {
      this.toolbar.updated();
      this.toolbarChanged = false;
    }
  }

  ngOnDestroy() {
    if (this.toolbar) {
      this.toolbar.destroy();
      this.toolbar = null;
    }
  }

  updated() {
    if (this.toolbar) {
      this.toolbar.updated();
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
