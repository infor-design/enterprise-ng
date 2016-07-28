import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

/**
 * Internal component to support menu/dropdown tabs
 */
@Component({
  moduleId: module.id,
  selector: 'ul[soho-tab-list]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabListComponent {
  @HostBinding('class.tab-list') get isTabList() { return true; };
}

/**
 * Internal component to support the tab list items
 */
@Component({
  moduleId: module.id,
  selector: 'li[soho-tab]',
  template: `<a href="#{{tabId}}"><ng-content></ng-content>{{tabTitle}}</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabComponent {
  @HostBinding('class.tab') get isTab() { return true; };
  @HostBinding('class.dismissible') get isDismissable()  { return this.dismissible; };
  @HostBinding('class.is-selected') get isSelected()     { return this.selected; };

  @Input() tabId: string;
  @Input() tabTitle: string;
  @Input() dismissible: boolean = false;
  @Input() selected: boolean = false;
}

/**
 * Internal component to support menu/dropdown tabs
 */
@Component({
  moduleId: module.id,
  selector: 'li[soho-tab-separator]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() { return true; };
}

/**
 * Internal component to support menu/dropdown tabs
 */
@Component({
  moduleId: module.id,
  selector: 'li[soho-menu-tab]',
  template: `<a href="#">{{tabTitle}}</a><ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoMenuTabComponent extends SohoTabComponent {
  @HostBinding('class.tab') get isTab() { return true; };
  @HostBinding('class.has-popupmenu') get isPopupMenu() { return true; };
  @Input() tabTitle: string;
}

/**
 * Internal component to support the menu tab items
 */
@Component({
  moduleId: module.id,
  selector: 'li[soho-menu-tab-item]',
  template: `<a attr.href="#{{tabId}}"><ng-content></ng-content>{{tabTitle}}</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabTitleComponent extends SohoTabComponent {
  @Input() tabId: string;
  @Input() tabTitle: string;
}

/**
 * Internal component to support tabs with counts.
 */
@Component({
  moduleId: module.id,
  selector: 'span[soho-tab-count]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabCountComponent {
  @HostBinding('class.count') get isCount() { return true; };
}

/**
 * Internal component to support tab panel content.
 */
@Component({
  moduleId: module.id,
  selector: 'div[soho-tab-panel]',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoTabPanelComponent {
  @HostBinding('attr.id') @Input() tabId: string;
  @HostBinding('class.tab-panel') get isTabPanel() { return true; };
}

/**
 * The main soho-tabs component
 */
@Component({
  moduleId: module.id,
  selector: 'div[soho-tabs]',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit, OnDestroy, OnInit {
  @HostBinding('class.tab-container') get isTabContainer() { return true; };

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  @Input() tabId: string;

  /**
   * The tabId that binds the soho-tab to a soho-tab-panel.
   // TODO do I want a tabId input or just use element id to match tabs to tab panels. Right
   */
  @Input() tabsId: string;

  /**
   * set to true to allow tab count markup <span class=tabcount>#</span>.
   * @type {boolean}
   *
   */
  // TODO make a component for tab counts? <span tab-count> ??
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
   * TODO Need to handle the tab-panels not being encapsuelated by this component. Use recommended service approach.
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
  @Input() containerElement: Element;

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

  private jQueryElement: any;
  private tabs: any;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    // bind to jquery events and emit as angular events
    this.jQueryElement.bind('beforeactivate', ((event: TabsEvent) => {this.beforeactivate.emit(event); }));
    this.jQueryElement.bind('activated', ((event: TabsEvent) => {this.activated.emit(event); }));
    this.jQueryElement.bind('afteractivate', ((event: TabsEvent) => {this.afteractivate.emit(event); }));
    this.jQueryElement.bind('close', ((event: TabsEvent) => {this.close.emit(event); }));
    this.jQueryElement.bind('afterclose', ((event: TabsEvent) => {this.afterClose.emit(event); }));
    this.jQueryElement.bind('tab-added', ((event: TabsEvent) => {this.tabAdded.emit(event); }));

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

  public updated(): any {
    return this.tabs.updated();
  }

  public add(tabId: string, options: any, atIndex: number): any {
    return this.tabs.add(tabId, options, atIndex);
  }

  public remove(tabId: string) {
    this.tabs.remove(tabId);
  }

  public getTabFromId(tabId: string): any {
    return this.tabs.getTabFromId(tabId);
  }

  public hide(tabId: string): any {
    return this.tabs.hide(tabId);
  }

  public show(tabId: string): any {
    return this.tabs.hide(tabId);
  }

  public disableTab(tabId: number): any {
    return this.tabs.disableTab(tabId);
  }

  public enableTab(tabId: number): any {
    return this.tabs.enableTab(tabId);
  }

  public rename(tabId: string, name: string): void {
    this.tabs.rename(tabId, name);
  }

  public getActiveTab(): any {
    return this.tabs.getActiveTab();
  }

  public getVisibleTabs(): any {
    return this.tabs.getVisibleTabs();
  }

  public getOverflowTabs(): any {
   return this.tabs.getOverflowTabs();
  }

  public select(href: string) {
    return this.tabs.selectx(href);
  }

  public disable(): void {
    this.tabs.disable();
  }

  public enable(): void {
    this.tabs.enable();
  }

  // public isinitalized(): boolean {
  //   return !!this.tabs;
  // }

  // /**
  //  * The class setter for the tabs div element
  //  */
  // get tabsClasses() {
  //   return 'tab-container';
  // }
  // /**
  //  * The class setter for the tabs div element
  //  */
  // get tabsListClasses() {
  //   return 'tab-list';
  // }
  // /**
  //  * The class setter for the tabs div element
  //  */
  // get verticalTabsClasses() {
  //   return 'vertical';
  // }
  // /**
  //  * The class setter for the tabs div element
  //  */
  // get alternateTabsClasses() {
  //   return 'alternate';
  // }
  // /**
  //  * The class setter for the tabs div element
  //  */
  // get moduleTabsClasses() {
  //   return 'module-tabs';
  // }
}

/**
 * Holds all directives usable for the tabs component.
 */
export const TABS_COMPONENTS = [
  TabsComponent,
  SohoTabComponent,
  SohoTabListComponent,
  SohoTabSeparatorComponent,
  SohoMenuTabComponent,
  SohoTabTitleComponent,
  SohoTabCountComponent,
  SohoTabPanelComponent,
];

/**
 * Interface for the jQuery event emitted
 */
export interface TabsEvent {
  currentTarget: HTMLElement;
  data: any;
  delegateTarget: HTMLElement;
  handleObj: Object;
  isTrigger: number;
  namespace: string;
  result: any;
  rnamespace: any;
  target: HTMLElement;
  timeStamp: number;
  type: string;
}
