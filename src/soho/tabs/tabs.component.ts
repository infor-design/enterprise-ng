
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  // ViewChild
} from '@angular/core';

/**
 * Internal component to support the tab list items
 */
@Component({
  selector: 'li[soho-tab]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabComponent {
  @HostBinding('class.tab') get isTab() { return true; };

  @HostBinding('class.dismissible')   @Input() dismissible:  boolean = false;
  @HostBinding('class.is-selected')   @Input() selected:     boolean = false;
  @HostBinding('class.is-disabled')   @Input() disabled:     boolean = false;
  @HostBinding('class.hidden')        @Input() hidden:       boolean = false;
  @HostBinding('class.has-popupmenu') @Input() hasPopupMenu: boolean = false;
}

/**
 * Internal component to support the tab title
 */
@Component({
  selector: 'a[soho-tab-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabTitleComponent {
  @HostBinding('attr.href') get hrefAttr() { return '#' + this.tabId; };
  @Input() tabId: string;
}

/**
 * Internal component to support the tab with a 'count' on it.
 */
@Component({
  selector: 'span[soho-tab-count]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabCountComponent {
  @HostBinding('class.count') get isTabCount() { return true; };
}

/**
 * Internal component to support menu/dropdown tabs
 */
@Component({
  selector: 'li[soho-tab-separator]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() { return true; };
}

/**
 * Internal component to support tab panel content.
 */
@Component({
  selector: 'div[soho-tab-panel]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabPanelComponent {
  @HostBinding('class.tab-panel') get isTabPanel() { return true; };
  @HostBinding('attr.id')        @Input() tabId: string;
  @HostBinding('attr.contained') @Input() contained: string;
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'ul[soho-tab-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabsListComponent {
  @HostBinding('class.tab-list') get isTabList() { return true; };
  @Input() headerTabs: boolean = false;

  // -----------------------------------------------------------------------------------------
  // Have to emulate '.page-container > tab-container.vertical' styles due to it being
  // a child selector. Any component using this component will end up placing an element
  // between the '.page-container' and 'tab-container.vertical' causing child selector
  // not to get used.
  // TODO ppatton once the css handles encapsulaing markup then this can be removed.
  // -----------------------------------------------------------------------------------------
  @HostBinding('style.height') get tabListHeight() { return this.sohoTabsComponent.vertical ? '100%' : ''; };
  private sohoTabsComponent: SohoTabsComponent;
  constructor(@Inject(forwardRef(() => SohoTabsComponent)) sohoTabsComponent: SohoTabsComponent) {
    this.sohoTabsComponent = sohoTabsComponent;
  }
  // -----------------------------------------------------------------------------------------
}

/**
 * The main soho-tabs component
 */
@Component({
  selector: 'div[soho-tabs]', // tslint:disable-line
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTabsComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tab-container') get isTabContainer() { return true; };
  @HostBinding('class.vertical')      get isVertical()     { return this.vertical; };
  @HostBinding('attr.alternate')      get isAlternate()    { return this.alternate; };

  // -----------------------------------------------------------------------------------------
  // Have to emulate '.page-container > tab-container.vertical' styles due to it being
  // a child selector. Any component using this component will end up placing an element
  // between the '.page-container' and 'tab-container.vertical' causing child selector
  // not to get used.
  // -----------------------------------------------------------------------------------------
  @HostBinding('style.height') get getHeightStyle() { return (this.vertical) ? '100%' : ''; };
  @HostBinding('style.overflow') get getOverflowStyle() { return (this.vertical) ? 'auto' : ''; };

  // @ViewChild(SohoTabsListComponent) tabsListComponent: SohoTabsListComponent;

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * set to true to allow tab count markup <span class=tabcount>#</span>.
   * @type {boolean}
   */
  @Input() tabCounts: boolean = false;

  /**
   * set to true to show a secondary style for the tabs
   * @type {boolean}
   */
  @Input() alternate: boolean = false;

  /**
   * set to true to display the tabs vertically to the left of the tab-panel
   * @type {boolean}
   */
  @Input() vertical: boolean = false;

  /**
   * set to true to display the tabs in the main header
   * @type {boolean}
   * TODO implement header tabs.
   */
  @Input() headerTabs: boolean = false;

  /**
   * show the tabs as module tabs
   * @type {boolean}
   * TODO implement module tabs.
   */
  @Input() moduleTabs: boolean = false;

  /**
   * If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel.
   * @type {boolean}
   */
  @Input() addTabButton: boolean = false;

  /**
   * if defined as a function, will be used in-place of the default Tab Adding method
   * TODO: how to handle call back function?
   */
  @Input() addTabButtonCallback: Function;

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  @Input() containerElement: string;

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   * @type {boolean}
   */
  @Input() changeTabOnHashChange: boolean = false;

  /**
   * If defined as a function, provides an external method for adjusting the current page hash used by these tabs
   * TODO: how to handle call back function?
   */
  @Input() hashChangeCallback: Function;

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeactivate event is fired whenever a tab is selected giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeactivate: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * The activated event is fired whenever a tab is selected (or "activated");
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * The afteractivate event is fired after the has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afteractivate: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * fired when a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() close: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * fired after a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() afterClose: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * fire when a new tab is added.
   * @type {EventEmitter<Object>}
   */
  @Output() tabAdded: EventEmitter<Object> = new EventEmitter<Object>();

  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: any;

  // Reference to the soho tabs control api.
  private tabs: any;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    // bind to jquery events and emit as angular events
    this.jQueryElement.bind('beforeactivate', ((event: SohoTabsEvent) => {this.beforeactivate.emit(event); }));
    this.jQueryElement.bind('activated', ((event: SohoTabsEvent) => {this.activated.emit(event); }));
    this.jQueryElement.bind('afteractivate', ((event: SohoTabsEvent) => {this.afteractivate.emit(event); }));
    this.jQueryElement.bind('close', ((event: SohoTabsEvent) => {this.close.emit(event); }));
    this.jQueryElement.bind('afterclose', ((event: SohoTabsEvent) => {this.afterClose.emit(event); }));
    this.jQueryElement.bind('tab-added', ((event: SohoTabsEvent) => {this.tabAdded.emit(event); }));

    // initialize the tabs plugin
    this.jQueryElement.tabs({
      addTabButton: this.addTabButton,
      addTabButtonCallback: undefined, // this.addButtonCallback,
      containerElement: this.containerElement,
      changeTabOnHashChange: this.changeTabOnHashChange,
      hashChangeCallback: undefined, // this.hashChangeCallback,
      tabCounts: this.tabCounts
    });
    this.tabs = this.jQueryElement.data('tabs');
  }

  ngOnDestroy() {
    this.tabs.destroy();
  }

  /**
   * Causes the tabs component view to be rebuilt
   * @returns {SohoTabsComponent} returns this tab component to allow method chaining.
   */
  public updated(): SohoTabsComponent {
    this.tabs.updated();
    return this;
  }

  /**
   * Adds a new tab into the tab component
   * @param tabId The tabId of the tab to be added
   * @param options ?
   * @param atIndex The index location where the tab is to be added.
   * @returns {SohoTabsComponent} returns this tab component to allow method chaining.
   */
  public add(tabId: string, options: any, atIndex: number): any {
    this.tabs.add(tabId, options, atIndex);
    return this;
  }

  /**
   * Removes a tab
   * @param tabId The tabId of the tab to be removed.
   */
  public remove(tabId: string): void {
    this.tabs.remove(tabId);
  }

  /**
   * Hides a tab for the given tabId
   * @param tabId The id of the tab to hide
   * @returns {SohoTabsComponent} Returns this SohoTabsComponent so allows method chaining.
   */
  public hide(tabId: string): SohoTabsComponent {
    this.tabs.hide(tabId);
    return this;
  }

  public show(tabId: string): SohoTabsComponent {
    this.tabs.hide(tabId);
    return this;
  }

  public disableTab(tabId: number): SohoTabsComponent {
    this.tabs.disableTab(tabId);
    return this;
  }

  public enableTab(tabId: number): SohoTabsComponent {
    this.tabs.enableTab(tabId);
    return this;
  }

  public rename(tabId: string, name: string): void {
    this.tabs.rename(tabId, name);
  }

  /**
   * Gets a tab given either an event or a tabId
   * @param event And event from a tab that will allow tab retrieval
   * @param tabId The tabId of the tab to be retrieved.
   * @returns {JQuery} The JQuery object of a tab element.
   */
  public getTab(event: SohoTabsEvent, tabId: string): any {
    // TODO: getTab seems to return a jQuery object, what to return instead?
    return this.tabs.getTab(event, tabId);
  }

  /**
   * Return the the currenlty active/selected tab.
   * @returns {JQuery} A JQuery object of the active tab element.
   */
  public getActiveTab(): JQuery {
    // TODO: getActiveTab seems to return a jQuery object, what to return instead?
    return this.tabs.getActiveTab();
  }

  /**
   * Returns the visible tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the visible tab elements
     */
  public getVisibleTabs(): Array<JQuery> {
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.tabs.getVisibleTabs();
  }

  /**
   * Returns the overflow tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the overflow tab elements
   */
  public getOverflowTabs(): Array<JQuery> {
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
   return this.tabs.getOverflowTabs();
  }

  /**
   * Selects the tab given an href
   * @param href an href used to find the tab to select
   */
  public select(href: string): void {
    this.tabs.select(href);
  }

  /**
   * Disables the entire tab component
   */
  public disable(): void {
    this.tabs.disable();
  }

  /**
   * enables the entire tab component
   */
  public enable(): void {
    this.tabs.enable();
  }

  // public isinitalized(): boolean {
  //   return !!this.tabs;
  // }
}
