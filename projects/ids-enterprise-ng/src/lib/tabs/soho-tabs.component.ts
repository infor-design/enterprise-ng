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
  selector: 'a[soho-tab-title]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabTitleComponent {
  @HostBinding('attr.href') get hrefAttr() {
    return '#' + this.tabId;
  }
  @Input() tabId?: string;
}

/**
 * Internal component to support the tab with a 'count' on it.
 */
@Component({
  selector: 'span[soho-tab-count]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabCountComponent {
  // @ts-ignore
  constructor(_element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element?.nativeElement.classList.add('count');
  }
}

/**
 * Internal component to support a divider between tab items
 */
@Component({
  selector: 'li[soho-tab-separator]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabSeparatorComponent {
  constructor(_element: ElementRef) { // @ts-ignore
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element.nativeElement.classList.add('separator');
  }
}

/**
 * Internal component to support tab panel container content.
 */
@Component({
  selector: 'div[soho-tab-panel-container]', // eslint-disable-line
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

  @HostBinding('class.scrollable-y') @Input() verticalScrolling: any;
}

/**
 * Internal component to support tab panel content.
 */
@Component({
  selector: 'div[soho-tab-panel]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabPanelComponent {
  constructor(_element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element.nativeElement.classList.add('tab-panel');
  }

  @HostBinding('attr.id') @Input() tabId?: string;
  @HostBinding('attr.contained') @Input() contained?: string;
}

/**
 * Internal component to support the tab list items
 */
@Component({
  selector: 'li[soho-tab]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabComponent {
  constructor(_element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element.nativeElement.classList.add('tab');
  }

  @HostBinding('class.dismissible') @Input() dismissible = false;
  @HostBinding('class.is-selected') @Input() selected = false;
  @HostBinding('class.is-disabled') @Input() disabled = false;
  @HostBinding('class.hidden') @Input() hidden = false;
  @HostBinding('class.has-popupmenu') @Input() hasPopupMenu = false;
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'ul[soho-tab-list]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabListComponent {
  constructor(_element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element.nativeElement.classList.add('tab-list');
  }
}

/**
 * Main tabset header component
 */
@Component({
  selector: 'div[soho-tab-list-container]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabListContainerComponent {
  constructor(_element: ElementRef) {
    // Adding the class this way to ensure that it is applied before the AfterViewInit.
    // Avoiding @HostBinding for this since an *ngIf causes bindings to be processed
    // after the AfterViewInit
    _element.nativeElement.classList.add('tab-list-container');
  }

  @HostBinding('class.scrollable-y') @Input() verticalScrolling: any;
}

/**
 * The main soho-tabs component
 */
@Component({
  selector: 'div[soho-tabs]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTabsComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  @HostBinding('class.vertical') get isVertical() {
    return this.vertical;
  }
  @HostBinding('class.module-tabs') get isModuleTabs() {
    return this.moduleTabs;
  }
  @HostBinding('class.header-tabs') get isHeaderTabs() {
    return this.headerTabs;
  }
  @HostBinding('class.alternate') get isAlternate() {
    return this.alternate;
  }

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * set to true to show a secondary style for the tabs
   *
   */
  @Input() alternate = false;

  /**
   * set to true to display the tabs vertically to the left of the tab-panel
   *
   */
  @Input() vertical = false;

  /**
   * set to true to display the tabs as module tabs
   *
   */
  @Input() moduleTabs = false;

  /**
   * set to true to display the tabs as header tabs
   *
   */
  @Input() headerTabs = false;

  /**
   * The callback function called before a tab is closed.
   * Return false to prevent the tab from closing.
   */
  @Input() beforeCloseCallback?: Function;

  @Input() set tabsOptions(tabsOptions: SohoTabsOptions) {
    this._tabsOptions = tabsOptions;
    if (this.jQueryElement) {
      (this.tabs as any).settings = tabsOptions;
      this.updateRequired = true;
    }
  }
  /**
   * If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel.
   *
   */
  @Input() set addTabButton(addTabButton: boolean) {
    this._tabsOptions.addTabButton = addTabButton;
    if (this.jQueryElement) {
      (this.tabs as any).settings.addTabButton = addTabButton;
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
      (this.tabs as any).settings.addTabButtonCallback = addTabButtonCallback;
      this.updateRequired = true;
    }
  }

  /**
   * If set to true, will force an App Menu trigger to be present on Non-Vertical Tabs implementatations.
   */
  @Input() set appMenuTrigger(appMenuTrigger: boolean) {
    this._tabsOptions.appMenuTrigger = appMenuTrigger;
    if (this.jQueryElement) {
      (this.tabs as any).settings.appMenuTrigger = appMenuTrigger;
      this.updateRequired = true;
    }
  }

  /**
   * If defined, replaces the default "Menu" text used in the app menu trigger.
   */
  @Input() set appMenuTriggerText(appMenuTriggerText: string) {
    this._tabsOptions.appMenuTriggerText = appMenuTriggerText;
    if (this.jQueryElement) {
      (this.tabs as any).settings.appMenuTriggerText = appMenuTriggerText;
      this.updateRequired = true;
    }
  }

  /**
   *  If true, causes an app menu trigger's text content to be visually hidden (but still exists for accessiblity purposes)
   */
  @Input() set appMenuTriggerTextAudible(appMenuTriggerTextAudible: boolean) {
    this._tabsOptions.appMenuTriggerTextAudible = appMenuTriggerTextAudible;
    if (this.jQueryElement) {
      (this.tabs as any).settings.appMenuTriggerTextAudible = appMenuTriggerTextAudible;
      this.updateRequired = true;
    }
  }

  /**
   *  If defined, will be used by any internal Tabs AJAX calls as the desired request settings.
   */
  @Input() set ajaxOptions(ajaxOptions: object) {
    this._tabsOptions.ajaxOptions = ajaxOptions;
    if (this.jQueryElement) {
      (this.tabs as any).settings.ajaxOptions = ajaxOptions;
      this.updateRequired = true;
    }
  }

  /**
   * Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
   */
  @Input() set containerElement(containerElement: string) {
    this._tabsOptions.containerElement = containerElement;
    if (this.jQueryElement) {
      (this.tabs as any).settings.containerElement = containerElement;
      this.updateRequired = true;
    }
  }

  /**
   * If true, will change the selected tab on invocation based on the URL that exists after the hash
   *
   */
  @Input() set changeTabOnHashChange(changeTabOnHashChange: boolean) {
    this._tabsOptions.changeTabOnHashChange = changeTabOnHashChange;
    if (this.jQueryElement) {
      (this.tabs as any).settings.changeTabOnHashChange = changeTabOnHashChange;
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
      (this.tabs as any).settings.hashChangeCallback = hashChangeCallback;
      this.updateRequired = true;
    }
  }

  /**
   * If true, when using full URLs in tab HREFs, or when using Ajax calls, tabs will be loaded as needed instead of the markup
   * all being established at once.
   */
  @Input() set lazyLoad(lazyLoad: boolean) {
    this._tabsOptions.lazyLoad = lazyLoad;
    if (this.jQueryElement) {
      (this.tabs as any).settings.lazyLoad = lazyLoad;
      this.updateRequired = true;
    }
  }

  /**
   * If true, will display a tooltip or Module Tabs with cut-off text content.
   */
  @Input() set moduleTabsTooltips(moduleTabsTooltips: boolean) {
    this._tabsOptions.moduleTabsTooltips = moduleTabsTooltips;
    if (this.jQueryElement) {
      (this.tabs as any).settings.moduleTabsTooltips = moduleTabsTooltips;
      this.updateRequired = true;
    }
  }

  /**
   * If true, will display a tooltip on Multi Tabs with cut-off text content.
   */
  @Input() set multiTabsTooltips(multiTabsTooltips: boolean) {
    this._tabsOptions.multiTabsTooltips = multiTabsTooltips;
    if (this.jQueryElement) {
      (this.tabs as any).settings.multiTabsTooltips = multiTabsTooltips;
      this.updateRequired = true;
    }
  }

  /**
   * If defined, it will display the position of counts.
   */
  @Input() set countsPosition(countsPosition: undefined | 'top' | 'bottom') {
    this._tabsOptions.countsPosition = countsPosition;
    if (this.jQueryElement) {
      (this.tabs as any).settings.countsPosition = countsPosition;
      this.updateRequired = true;
    }
  }

  /**
   * If defined, will serve as a way of pulling in external content to fill tabs.
   */
  @Input() set source(source: Function) {
    this._tabsOptions.source = source;
    if (this.jQueryElement) {
      (this.tabs as any).settings.source = source;
      this.updateRequired = true;
    }
  }

  /**
   * If a source method is defined, this flexible object can be passed into the source method, and augmented with
   * parameters specific to the implementation.
   */
  @Input() set sourceArguments(sourceArguments: Function) {
    this._tabsOptions.sourceArguments = sourceArguments;
    if (this.jQueryElement) {
      (this.tabs as any).settings.sourceArguments = sourceArguments;
      this.updateRequired = true;
    }
  }

  /**
   * set to true to allow tab count markup <span class=tabcount>#</span>.
   *
   */
  @Input() set tabCounts(tabCounts: boolean) {
    this._tabsOptions.tabCounts = tabCounts;
    if (this.jQueryElement) {
      (this.tabs as any).settings.tabCounts = tabCounts;
      this.updateRequired = true;
    }
  }

  /**
   * If Vertical Tabs & true, will automatically switch to Horizontal Tabs on smaller breakpoints.
   *
   */
  @Input() set verticalResponsive(verticalResponsive: boolean) {
    this._tabsOptions.verticalResponsive = verticalResponsive;
    if (this.jQueryElement) {
      (this.tabs as any).settings.verticalResponsive = verticalResponsive;
      this.updateRequired = true;
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this._tabsOptions.attributes = attributes;
    if (this.jQueryElement) {
      (this.tabs as any).settings.attributes = attributes;
      this.updateRequired = true;
    }
  }

  /** Sets the tabs to be sortable by drag and drop. **/
  @Input() set sortable(sortable: boolean) {
    this._tabsOptions.sortable = sortable;
    if (this.jQueryElement) {
      (this.tabs as any).settings.sortable = sortable;
      this.updateRequired = true;
    }
  }

  /**
   * if you would like to run the updated() function yourself instead of having
   * this tabs component check for you set this input to true. The advantage to
   * this is that if you know when to update you can be more efficient.
   */
  @Input() disableAutoUpdatedCall = false;

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeactivated event is fired whenever a tab is selected giving the event handler a chance
   * to "veto" the tab selection change.
   *
   */
  @Output() beforeActivated = new EventEmitter<SohoTabsEvent>();

  /**
   * The beforeactivate event is deprecated in favor of `beforeactivated`.
   *
   * @deprecated
   */
  @Output() beforeActivate = new DeprecatedEventEmitter<SohoTabsEvent>('beforeactivate', 'beforeactivated');

  /**
   * The activated event is fired whenever a tab is selected (or "activated");
   */
  @Output() activated = new EventEmitter<SohoTabsEvent>();

  /**
   * The afteractivate event is fired after the has been activated.
   */
  @Output() afterActivated = new EventEmitter<SohoTabsEvent>();

  /**
   * fired before a tab closes
   */
  @Output() beforeClose = new EventEmitter<SohoTabsEvent>();

  /**
   * fired when a tab closes
   *
   * @todo replace override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() close = new EventEmitter<SohoTabsEvent>();

  /**
   * fired after a tab closes
   */
  @Output() afterClose = new EventEmitter<SohoTabsEvent>();

  /**
   * fire when a new tab is added.
   *
   */
  @Output() tabAdded = new EventEmitter<SohoTabsEvent>();

  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the soho tabs control api.
  private tabs?: SohoTabsStatic | null;

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
  private tabCount?: number;

  /**
   * NOTE: only used when disableAutoUpdatedCall is false
   */
  private tabIds?: Array<string>;

  /**
   * NOTE: only used when disableAutoUpdatedCall is false
   */
  private tabTitles?: Array<string>;

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
    _changeDetectorRef: ChangeDetectorRef,
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
      this.jQueryElement.on('beforeactivated', (event: SohoTabsEvent, tab) => this.onBeforeActivated(event, tab));
      this.jQueryElement.on('activated', (event: SohoTabsEvent, tab) => this.onActivated(event, tab));
      this.jQueryElement.on('afteractivated', (event: SohoTabsEvent, tab) => this.onAfterActivated(event, tab));
      this.jQueryElement.on('beforeclose', (event: SohoTabsEvent, tab) => this.onBeforeClose(event, tab));
      this.jQueryElement.on('close', (event: SohoTabsEvent, tab) => this.onClose(event, tab));
      this.jQueryElement.on('afterclose', (event: SohoTabsEvent, tab) => this.onAfterClose(event, tab));
      this.jQueryElement.on('tab-added', (event: SohoTabsEvent, tab) => this.onTabAdded(event, tab));

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
      this.ngZone.runOutsideAngular(() => this.tabs?.updated());
      this.updateRequired = false;
    }

    if (this.disableAutoUpdatedCall) {
      return;
    }

    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      const $liList = this.getTabLiList();
      const $activateTab = this.getActivatedTab();

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
        this.tabs?.updated();
        this.tabCount = $liList.length;
        this.tabTitles = this.getTabTitles($liList);
        this.tabIds = tabIds;
        this.activateTab($activateTab);
        return;
      }

      for (let i = 0; i < tabIds.length; i++) {
        if (this.tabIds && tabIds[i] !== this.tabIds[i]) {
          this.tabs?.updated();
          this.tabIds = tabIds;
          this.tabTitles = this.getTabTitles($liList);
          this.activateTab($activateTab);
          return;
        }
      }

      /*
       * if only tab titles change then call handleResize.
       * It will update the tabs selection style and the overflow
       */
      for (let j = 0; j < tabTitles.length; j++) {
        if (this.tabTitles && tabTitles[j] !== this.tabTitles[j]) {
          this.tabs?.handleResize();
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
        this.jQueryElement = undefined;
      }
      if (this.tabs) {
        this.tabs.destroy();
        this.tabs = null;
      }
    });
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
      const $liList: any | JQuery = this.getTabLiList();
      this.tabCount = $liList.length;
      this.tabTitles = this.getTabTitles($liList);
      this.tabIds = this.getTabIds();
    });
  }

  private getTabLiList() {
    // call outside the angular zone since angular doesn't need to know about this.
    return this.ngZone.runOutsideAngular(() => this.jQueryElement?.find('.tab-list').find('li'));
  }

  private getActivatedTab(): JQuery | undefined {
    // get the current selected tab outside of the angular zone
    return this.ngZone.runOutsideAngular(() => this.jQueryElement?.siblings('.tab-panel-container').find('.tab-panel.is-visible'));
  }

  private getTabIds(): Array<string> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    return this.ngZone.runOutsideAngular(() => {
      const anchorList = this.jQueryElement?.find('.tab-list').find('a').toArray();
      return (anchorList as any).map((anchor: any) => (anchor as any).getAttribute('href').substring(1));
    });
  }

  private getTabTitles($liList?: JQuery): Array<string> {
    // call outside the angular zone
    return this.ngZone.runOutsideAngular(() => {
      if (!$liList) {
        $liList = this.getTabLiList();
      }

      const tabTitles: Array<string> = [];
      const $anchorList: any | JQuery = $liList?.find('a');
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
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
    this.ngZone.runOutsideAngular(() => this.tabs?.updated());
  }

  /**
   * @param tab The tab element in the list that needs to be activated
   * @returns 
   */
  public activateTab(tab: JQuery | undefined) {
    return this.ngZone.runOutsideAngular(() => {
      if (!tab) {
        return;
      }

      const tabHref = `#${tab?.attr('id')}`;
      this.tabs?.activate(tabHref);
    });
  }

  /**
   * Call resize manually when tab titles change so that the underline width matches.
   */
  public handleResize(doResponsiveCheck?: boolean): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.handleResize(doResponsiveCheck));
  }

  /**
   * Manually call updated and refresh out of the zone.
   */
  public refresh(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.tabs?.updated();
      }, 1);
    });
  }

  /**
   * Adds a new tab into the tab component
   *
   * @param tabId The tabId of the tab to be added
   * @param options ?
   * @param atIndex The index location where the tab is to be added.
   */
  public add(tabId: string, options: any, atIndex: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.add(tabId, options, atIndex));
  }

  /**
   * Removes a tab
   *
   * @param tabId The tabId of the tab to be removed.
   * @param disableBeforeClose If true, the beforeClose callback should be called
   * before removing the tab.
   */
  remove(tabId: string, disableBeforeClose?: boolean): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.remove(tabId, disableBeforeClose));
  }

  /**
   * Hides a tab for the given tabId
   *
   * @param tabId The id of the tab to hide
   */
  hide(tabId: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.hide(tabId));
  }

  show(tabId: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.show(tabId));
  }

  disableTab(tabId: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.disableTab(tabId));
  }

  enableTab(tabId: number): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.enableTab(tabId));
  }

  rename(tabId: string, name: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.tabs?.rename(tabId, name));
  }

  /**
   * Gets a tab given either an event or a tabId
   *
   * @param event And event from a tab that will allow tab retrieval
   * @param tabId The tabId of the tab to be retrieved.
   */
  getTab(event: SohoTabsEvent, tabId: string): any {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getTab seems to return a jQuery object, what to return instead?
    return this.ngZone.runOutsideAngular(() => this.tabs?.getTab(event, tabId));
  }

  /**
   * Return the currenlty active/selected tab.
   *
   * @return  A JQuery object of the active tab element.
   */
  getActiveTab(): JQuery {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getActiveTab seems to return a jQuery object, what to return instead?
    return this.ngZone.runOutsideAngular(() => (this.tabs as any).getActiveTab());
  }

  /**
   * Returns the visible tabs
   *
   * @return  An array of JQuery objects of the visible tab elements
   */
  getVisibleTabs(): Array<JQuery> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.ngZone.runOutsideAngular(() => (this.tabs as any).getVisibleTabs());
  }

  /**
   * Returns the overflow tabs
   *
   * @return  An array of JQuery objects of the overflow tab elements
   */
  getOverflowTabs(): Array<JQuery> {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    // TODO: getVisibleTabs seems to return a jQuery array, what to return instead?
    return this.ngZone.runOutsideAngular(() => (this.tabs as any).getOverflowTabs());
  }

  /**
   * Selects the tab given an href
   *
   * @param href an href used to find the tab to select
   */
  select(href: string): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => (this.tabs as any).select(href));
  }

  /**
   * Disables the entire tab component
   */
  disable(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => (this.tabs as any).disable());
  }

  /**
   * enables the entire tab component
   */
  enable(): void {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => (this.tabs as any).enable());
  }

  private onBeforeActivated(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.beforeActivated.emit(event);
    });
  }

  private onActivated(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.activated.emit(event);
    });
  }

  private onAfterActivated(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.afterActivated.emit(event);
    });
  }

  private onBeforeClose(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.beforeClose.emit(event);

      if (this.beforeCloseCallback) {
        return this.beforeCloseCallback(event, tab);
      }
    });
  }

  private onClose(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.close.emit(event);
    });
  }

  private onAfterClose(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.afterClose.emit(event);
    });
  }

  private onTabAdded(event: SohoTabsEvent, tab: any) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => {
      event.tab = tab[0];
      this.tabAdded.emit(event);
    });
  }
}
