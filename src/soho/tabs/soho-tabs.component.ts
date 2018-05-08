import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

import {
  DeprecatedEventEmitter
} from '../utils/deprecated-event-emitter';

/**
 * Internal component to support the tab title
 */
@Component({
  selector: 'a[soho-tab-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabTitleComponent {
  @HostBinding('attr.href') get hrefAttr() { return '#' + this.tabId; }
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
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('count');
  }
}

/**
 * Internal component to support a divider between tab items
 */
@Component({
  selector: 'li[soho-tab-separator]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabSeparatorComponent {
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('separator');
  }
}

/**
 * Internal component to support tab panel container content.
 */
@Component({
  selector: 'div[soho-tab-panel-container]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabPanelContainerComponent {
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    this.element.nativeElement.classList.add('tab-panel-container');
  }

  @HostBinding('class.scrollable-y') @Input() verticalScrolling;
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
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('tab-panel');
  }

  @HostBinding('attr.id')        @Input() tabId: string;
  @HostBinding('attr.contained') @Input() contained: string;
}

/**
 * Internal component to support the tab list items
 */
@Component({
  selector: 'li[soho-tab]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabComponent {
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('tab');
  }

  @HostBinding('class.dismissible') @Input() dismissible = false;
  @HostBinding('class.is-selected') @Input() selected = false;
  @HostBinding('class.is-disabled') @Input() disabled = false;
  @HostBinding('class.hidden')  @Input() hidden = false;
  @HostBinding('class.has-popupmenu') @Input() hasPopupMenu = false;
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'ul[soho-tab-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabListComponent {
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('tab-list');
  }
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'div[soho-tab-list-container]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabListContainerComponent {
  constructor(private element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('tab-list-container');
  }

  @HostBinding('class.scrollable-y') @Input() verticalScrolling;
}

/**
 * The main soho-tabs component
 */
@Component({
  selector: 'div[soho-tabs]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTabsComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @HostBinding('class.vertical')      get isVertical()     { return this.vertical; }
  @HostBinding('class.module-tabs')   get isModuleTabs()   { return this.moduleTabs; }
  @HostBinding('class.header-tabs')   get isHeaderTabs()   { return this.headerTabs; }
  @HostBinding('class.alternate')     get isAlternate()    { return this.alternate; }

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * set to true to show a secondary style for the tabs
   * @type {boolean}
   */
  @Input() alternate = false;

  /**
   * set to true to display the tabs vertically to the left of the tab-panel
   * @type {boolean}
   */
  @Input() vertical = false;

  /**
   * set to true to display the tabs as module tabs
   * @type {boolean}
   */
  @Input() moduleTabs = false;

  /**
   * set to true to display the tabs as header tabs
   * @type {boolean}
   */
  @Input() headerTabs = false;

  /**
   * The callback function called before a tab is closed.
   * Return false to prevent the tab from closing.
   */
  @Input() beforeCloseCallback: Function;

  @Input() set tabsOptions(tabsOptions: SohoTabsOptions) {
    this._tabsOptions = tabsOptions;
    if (this.jQueryElement) {
      this.tabs.settings = tabsOptions;
      this.updateRequired = true;
    }
  }
  /**
   * If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel.
   * @type {boolean}
   */
  @Input() set addTabButton(addTabButton: boolean) {
    this._tabsOptions.addTabButton = addTabButton;
    if (this.jQueryElement) {
      this.tabs.settings.addTabButton = addTabButton;
      this.updateRequired = true;
    }
  }

  /**
   * if defined as a function, will be used in-place of the default Tab Adding method
   * TODO: how to handle call back function?
   */
  @Input() set addTabButtonCallback(addTabButtonCallback: Function) {
    this._tabsOptions.addTabButtonCallback = addTabButtonCallback;
    if (this.jQueryElement) {
      this.tabs.settings.addTabButtonCallback = addTabButtonCallback;
      this.updateRequired = true;
    }
  }

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  @Input() set containerElement(containerElement: string) {
    this._tabsOptions.containerElement = containerElement;
    if (this.jQueryElement) {
      this.tabs.settings.containerElement = containerElement;
      this.updateRequired = true;
    }
  }

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   * @type {boolean}
   */
  @Input() set changeTabOnHashChange(changeTabOnHashChange: boolean) {
    this._tabsOptions.changeTabOnHashChange = changeTabOnHashChange;
    if (this.jQueryElement) {
      this.tabs.settings.changeTabOnHashChange = changeTabOnHashChange;
      this.updateRequired = true;
    }
  }

  /**
   * If defined as a function, provides an external method for adjusting the current page hash used by these tabs
   * TODO: how to handle call back function?
   */
  @Input() set hashChangeCallback(hashChangeCallback: Function) {
    this._tabsOptions.hashChangeCallback = hashChangeCallback;
    if (this.jQueryElement) {
      this.tabs.settings.hashChangeCallback = hashChangeCallback;
      this.updateRequired = true;
    }
  }

  /**
   * set to true to allow tab count markup <span class=tabcount>#</span>.
   * @type {boolean}
   */
  @Input() set tabCounts(tabCounts: boolean) {
    this._tabsOptions.tabCounts = tabCounts;
    if (this.jQueryElement) {
      this.tabs.settings.tabCounts = tabCounts;
      this.updateRequired = true;
    }
  }

  /**
   * If Vertical Tabs & true, will automatically switch to Horizontal Tabs on smaller breakpoints.
   * @type {boolean}
   */
  @Input() set verticalResponsive(verticalResponsive: boolean) {
    this._tabsOptions.verticalResponsive = verticalResponsive;
    if (this.jQueryElement) {
      this.tabs.settings.verticalResponsive = verticalResponsive;
      this.updateRequired = true;
    }
  }

  /**
   * if you would like to run the updated() function yourself instead of having
   * this tabs component check for you set this input to true. The advantage to
   * this is that if you know when to update you can be more efficient.
   */
  @Input() disableAutoUpdatedCall = false;

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

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeactivated event is fired whenever a tab is selected giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeActivated = new EventEmitter<SohoTabsEvent>();

  /**
   * The beforeactivate event is deprecated in favor of `beforeactivated`.
   * @deprecated
   * @type {EventEmitter<Object>}
   */
  @Output() beforeActivate = new DeprecatedEventEmitter<SohoTabsEvent>('beforeactivate', 'beforeactivated');

  /**
   * The activated event is fired whenever a tab is selected (or "activated");
   * @type {EventEmitter<Object>}
   */
  @Output() activated = new EventEmitter<SohoTabsEvent>();

  /**
   * The afteractivate event is fired after the has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afterActivated = new EventEmitter<SohoTabsEvent>();

  /**
   * fired before a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() beforeClose = new EventEmitter<SohoTabsEvent>();

  /**
   * fired when a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() close = new EventEmitter<SohoTabsEvent>();

  /**
   * fired after a tab closes
   * @type {EventEmitter<Object>}
   */
  @Output() afterClose = new EventEmitter<SohoTabsEvent>();

  /**
   * fire when a new tab is added.
   * @type {EventEmitter<Object>}
   */
  @Output() tabAdded = new EventEmitter<SohoTabsEvent>();

  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the soho tabs control api.
  private tabs: SohoTabsStatic;

  // An internal tabsOptions object that gets updated by using
  // the component's Inputs()
  private _tabsOptions: SohoTabsOptions = {} as SohoTabsOptions;

  /**
   * Keep track of current tab content for change detection.
   * If the number of tab change we must call tabs.updated() to
   * rebuild teh jquery tab control, if only the titles changed
   * then we can call tabs.handleResize to update the selection
   * style and the overflow.
   * NOTE: only used when disableAutoUpdatedCall is false
   */
  private tabCount: number;

  /**
   * NOTE: only used when disableAutoUpdatedCall is false
   */
  private tabIds: Array<string>;

  /**
   * NOTE: only used when disableAutoUpdatedCall is false
   */
  private tabTitles: Array<string>;

  /**
   * set to true when @input changes. This will cause the tabs.updated call
   * in the afterViewChecked. This technique has the advantage of only calling
   * updated once in the current angular cycle no matter how many inputs are
   * changed during that cycle.
   */
  private updateRequired = false;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private element: ElementRef,
    private ngZone: NgZone,
  ) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    element.nativeElement.classList.add('tab-container');
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // bind to jquery events and emit as angular events
      this.hookupRegisteredEvents();

      // initialize the tabs plugin
      this.jQueryElement.tabs(this._tabsOptions);
      this.tabs = this.jQueryElement.data('tabs');

      this.updateTabInfo();
    });
  }

  ngAfterViewChecked(): void {
    if (!this.tabs || !this.jQueryElement) {
      return;
    }

    if (this.updateRequired) {
      // call outside the angular zone so change detection isn't triggered by the soho component.
      this.ngZone.runOutsideAngular(() => this.tabs.updated());
      this.updateRequired = false;
    }

    if (this.disableAutoUpdatedCall) {
      return;
    }

    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      const $liList = this.getTabLiList();
      if (!$liList) {
        return;
      }

      const tabTitles = this.getTabTitles($liList);
      if (!tabTitles) {
        return;
      }

      const tabIds = this.getTabIds();
      if (!tabIds) {
        return;
      }

      if (this.tabCount !== $liList.length) {
        /* Must rebuild the tab control if the tab count changes */
        this.tabs.updated();
        this.tabCount = $liList.length;
        this.tabTitles = this.getTabTitles($liList);
        this.tabIds = tabIds;
        return;
      }

      for (let i = 0; i < tabIds.length; i++) {
        if (tabIds[ i ] !== this.tabIds[ i ]) {
          this.tabs.updated();
          this.tabIds = tabIds;
          this.tabTitles = this.getTabTitles($liList);
          return;
        }
      }

      /*
       * if only tab titles change then call handleResize.
       * It will update the tabs selection style and the overflow
       */
      for (let i = 0; i < tabTitles.length; i++) {
        if (tabTitles[ i ] !== this.tabTitles[ i ]) {
          this.tabs.handleResize();
          this.tabTitles = tabTitles;
          return;
        }
      }
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.tabs) {
        this.tabs.destroy();
        this.tabs = null;
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
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforeActivated')) {
      this.jQueryElement.on('beforeactivated', (event: SohoTabsEvent, tab) => this.onBeforeActivated(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'activated')) {
      this.jQueryElement.on('activated', (event: SohoTabsEvent, tab) => this.onActivated(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'afterActivated')) {
      this.jQueryElement.on('afteractivated', (event: SohoTabsEvent, tab) => this.onAfterActivated(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforeClose')) {
      this.jQueryElement.on('beforeclose', (event: SohoTabsEvent, tab) => this.onBeforeClose(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'close')) {
      this.jQueryElement.on('close', (event: SohoTabsEvent, tab) => this.onClose(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'afterClose')) {
      this.jQueryElement.on('afterclose', (event: SohoTabsEvent, tab) => this.onAfterClose(event, tab));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'tabAdded')) {
      this.jQueryElement.on('tab-added', (event: SohoTabsEvent, tab) => this.onTabAdded(event, tab));
    }
  }

  private updateTabInfo() {
    if (this.disableAutoUpdatedCall) {
      return;
    }

    /**
     * Used to auto update the control when projected content changes. Use wisely
     * as this can be slower than normal.
     */
    this.ngZone.runOutsideAngular(() => {
      const $liList: JQuery = this.getTabLiList();
      this.tabCount = $liList.length;
      this.tabTitles = this.getTabTitles($liList);
      this.tabIds = this.getTabIds();
    });
  }

  private getTabLiList() {
    // call outside the angular zone since angular doesn't need to know about this.
    return this.ngZone.runOutsideAngular(() => this.jQueryElement.find('.tab-list').find('li'));
  }

  private getTabIds(): Array<string> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    return this.ngZone.runOutsideAngular(() => {
      const anchorList = this.jQueryElement.find('.tab-list').find('a').toArray();
      return anchorList.map(anchor => anchor.getAttribute('href').substring(1));
    });
  }

  private getTabTitles($liList?: JQuery): Array<string> {
    // call outside the angular zone
    return this.ngZone.runOutsideAngular(() => {
      if (!$liList) {
        $liList = this.getTabLiList();
      }

      const tabTitles: Array<string> = [];
      const $anchorList: JQuery = $liList.find('a');
      for (let i = 0; i < $anchorList.length; i++) {
        tabTitles.push($($anchorList[i]).html());
      }
      return tabTitles;
    });
  }

  /**
   * Causes the tabs component view to be rebuilt
   */
  public updated(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.updated());
  }

  /**
   * Call resize manually when tab titles change so that the underline width matches.
   */
  public handleResize(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.handleResize());
  }

  /**
   * Adds a new tab into the tab component
   * @param tabId The tabId of the tab to be added
   * @param options ?
   * @param atIndex The index location where the tab is to be added.
   */
  public add(tabId: string, options: any, atIndex: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.add(tabId, options, atIndex));
  }

  /**
   * Removes a tab
   * @param tabId The tabId of the tab to be removed.
   * @param disableBeforeClose If true, the beforeClose callback should be called
   * before removing the tab.
   */
  remove(tabId: string, disableBeforeClose?: boolean): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.remove(tabId, disableBeforeClose));
  }

  /**
   * Hides a tab for the given tabId
   * @param tabId The id of the tab to hide
   */
  hide(tabId: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.hide(tabId));
  }

  show(tabId: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.show(tabId));
  }

  disableTab(tabId: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.disableTab(tabId));
  }

  enableTab(tabId: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.enableTab(tabId));
  }

  rename(tabId: string, name: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.rename(tabId, name));
  }

  /**
   * Gets a tab given either an event or a tabId
   * @param event And event from a tab that will allow tab retrieval
   * @param tabId The tabId of the tab to be retrieved.
   */
  getTab(event: SohoTabsEvent, tabId: string): any {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getTab seems to return a jQuery object, what to return instead?
    return this.ngZone.runOutsideAngular(() => this.tabs.getTab(event, tabId));
  }

  /**
   * Return the the currenlty active/selected tab.
   * @returns {JQuery} A JQuery object of the active tab element.
   */
  getActiveTab(): JQuery {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getActiveTab seems to return a jQuery object, what to return instead?
    return this.ngZone.runOutsideAngular(() => this.tabs.getActiveTab());
  }

  /**
   * Returns the visible tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the visible tab elements
   */
  getVisibleTabs(): Array<JQuery> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.ngZone.runOutsideAngular(() => this.tabs.getVisibleTabs());
  }

  /**
   * Returns the overflow tabs
   * @returns {Array<JQuery>} An array of JQuery objects of the overflow tab elements
   */
  getOverflowTabs(): Array<JQuery> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.ngZone.runOutsideAngular(() => this.tabs.getOverflowTabs());
  }

  /**
   * Selects the tab given an href
   * @param href an href used to find the tab to select
   */
  select(href: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.select(href));
  }

  /**
   * Disables the entire tab component
   */
  disable(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.disable());
  }

  /**
   * enables the entire tab component
   */
  enable(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs.enable());
  }

  private onBeforeActivated(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.beforeActivated.emit(event);
    }, 1));
  }

  private onActivated(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.activated.emit(event);
    }, 1));
  }

  private onAfterActivated(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.afterActivated.emit(event);
    }, 1));
  }

  private onBeforeClose(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[0];
      this.beforeClose.emit(event);

      if (this.beforeCloseCallback) {
        return this.beforeCloseCallback(event, tab);
      }
    }, 1));
  }

  private onClose(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.close.emit(event);
    }, 1));
  }

  private onAfterClose(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.afterClose.emit(event);
    }, 1));
  }

  private onTabAdded(event: SohoTabsEvent, tab) {
    // events from soho should not be in the angular zone due to
    // initializing the component outside angular.
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => {
      event.tab = tab[ 0 ];
      this.tabAdded.emit(event);
    }, 1));
  }
}
