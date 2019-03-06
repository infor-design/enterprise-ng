/// <reference path="soho-toolbar-flex.d.ts"/>

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

@Component({
  selector: 'input[soho-toolbar-flex-searchfield]', // tslint:disable-line
  template: '<div #toolbarFlexSearchField><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SohoToolbarFlexSearchFieldComponent implements AfterViewChecked, AfterViewInit, OnDestroy {
  /** Options. */
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

  @HostBinding('class.searchfield') get isSearchField() { return true; }

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private toolbarFlexSearchField: SohoToolbarFlexSearchFieldStatic;
  private searchFieldChanged = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.searchfield(this.options);

      // Initialize title attribute as a soho tooltip
      if (this.jQueryElement.attr('title')) {
        this.jQueryElement.tooltip();
      }

      this.toolbarFlexSearchField = this.jQueryElement.data('toolbarsearchfield');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('selected', (...args) =>
        this.ngZone.run(() => this.selected.emit(args)));

      this.jQueryElement.on('cleared', (...args) =>
        this.ngZone.run(() => this.cleared.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.searchFieldChanged) {
      this.ngZone.runOutsideAngular(() => this.toolbarFlexSearchField.updated());
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
      if (this.toolbarFlexSearchField) {
        // destroy the soho component.
        this.toolbarFlexSearchField.destroy();
        this.toolbarFlexSearchField = undefined;
      }
    });
  }

  clear(): void {
    this.ngZone.runOutsideAngular(() => this.toolbarFlexSearchField.clear());
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
 * soho toolbar flex more button
 */
@Component({
  selector: 'soho-toolbar-flex-more-button', // tslint:disable-line
  template: `<button class="btn-actions">
    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
      <use xlink:href="#icon-more"></use>
    </svg>
    <span class="audible">More Actions</span>
  </button>
  <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexMoreButtonComponent {
  @HostBinding('class.more') get isMoreButton() { return true; }
  @HostBinding('class.toolbar-section') get isToolbarSection() { return true; }
  @Input() isDisabled = false;
  @Input() ajaxBeforeFunction: Function;
  @Input() menuId: string;
}

/**
 * soho toolbar flex page title.
 */
@Component({
  selector: '[soho-toolbar-flex-page-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexPageTitleComponent {
  @HostBinding('class.page-title') get isPageTitle() { return true; }
}

/**
 * soho toolbar flex section title.
 */
@Component({
  selector: '[soho-toolbar-flex-section-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexSectionTitleComponent {
  @HostBinding('class.section-title') get isSectionTitle() { return true; }
}

/**
 * Generic soho toolbar flex section
 */
@Component({
  selector: 'soho-toolbar-flex-section', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarFlexSectionComponent {
  @HostBinding('class.toolbar-section') get isToolbarSection() { return true; }
  @Input() @HostBinding('class.favor') isTitleFavor = false;
  @Input() @HostBinding('class.title') isTitle = false;
  @Input() @HostBinding('class.buttonset') isButtonSet = false;
  @Input() @HostBinding('class.search') isSearch = false;
}

/**
 * Soho toolbar Navigation button
 */
@Component({
  selector: 'button[soho-toolbar-flex-nav-button]', // tslint:disable-line
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
export class SohoToolbarFlexNavButtonComponent {
  @HostBinding('class.btn-icon') get isIconButton() { return true; }
  @HostBinding('class.application-menu-trigger') get isAppMenuTrigger() { return true; }
  @HostBinding('attr.type') get typeAttr() { return 'button'; }
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
  @HostBinding('class.flex-toolbar') get isToolbar() { return true; }

  /**
   * Allows a moreMenuSettings object to be propagated down into the Toolbar Flex.
   * the jQuery Toolbar Flex component handles passing these settings into the More Actions
   * menu's jQuery Popupmenu.
   */
  @Input() set moreMenuBeforeOpenFunction(beforeOpen: AjaxBeforeMoreMenuOpenFunction) {
    this.options.beforeMoreMenuOpen = beforeOpen;
    if (this.toolbarFlex) {
      this.toolbarFlex.settings.beforeMoreMenuOpen = beforeOpen;
      this.markForRefresh();
    }
  }

  /**
   * The selected event is fired when a toolbar button has been clicked.
   */
  @Output() selected: EventEmitter<SohoToolbarFlexSelectedEvent> = new EventEmitter<SohoToolbarFlexSelectedEvent>();

  private options: SohoToolbarFlexOptions = {};
  private jQueryElement: JQuery;
  private toolbarFlex: SohoToolbarFlexStatic;
  private toolbarFlexChanged: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {

      // Assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.toolbarflex(this.options);
      this.toolbarFlex = this.jQueryElement.data('toolbarflex');

      this.jQueryElement.on('selected', (event: JQuery.TriggeredEvent, item: HTMLButtonElement | HTMLAnchorElement) =>
        this.ngZone.run(() => {
          this.selected.emit({event, item});
        }));

      this.toolbarFlex = this.jQueryElement.data('toolbarflex');
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
      }
      if (this.toolbarFlex) {
        this.toolbarFlex.destroy();
        this.toolbarFlex = null;
      }
    });
  }

  updated(settings?) {
    if (this.toolbarFlex) {
      this.ngZone.runOutsideAngular(() => this.toolbarFlex.updated(settings));
    }
  }

  private markForRefresh() {
    this.toolbarFlexChanged = true;

    this.changeDetector.markForCheck();
  }
}
