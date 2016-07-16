import {
  Component,
  EventEmitter,
  Output,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'soho-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterViewInit, OnDestroy {

  @Output() beforeactivate: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() activated: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afteractivate: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() close: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afterClose: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() tabAdded: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: any;
  private tabs: any;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement.children[0]);

    // add listeneres to emit events
    this.jQueryElement.bind('beforeactivate', ((event: TabsEvent) => {this.beforeactivate.emit(event); }));
    this.jQueryElement.bind('activated', ((event: TabsEvent) => {this.activated.emit(event); }));
    this.jQueryElement.bind('afteractivate', ((event: TabsEvent) => {this.afteractivate.emit(event); }));
    this.jQueryElement.bind('close', ((event: TabsEvent) => {this.close.emit(event); }));
    this.jQueryElement.bind('afterclose', ((event: TabsEvent) => {this.afterClose.emit(event); }));
    this.jQueryElement.bind('tab-added', ((event: TabsEvent) => {this.tabAdded.emit(event); }));

    this.jQueryElement.tabs({
      // If set to true, creates a button at the end of the tab list that can be used to add an empty tab and panel
      addTabButton: false,

      // if defined as a function, will be used in-place of the default Tab Adding method
      addTabButtonCallback: null,

      // Defines a separate element to be used for containing the tab panels.  Defaults to the Tab Container itself
      containerElement: null,

      // If true, will change the selected tab on invocation based on the URL that exists after the hash
      changeTabOnHashChange: false,

      // If defined as a function, provides an external method for adjusting the current page hash used by these tabs
      hashChangeCallback: null,

      // If true, Displays a modifiable count above each tab.
      tabCounts: false
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

  public isinitalized(): boolean {
    return !!this.tabs;
  }

  /**
   * The class setter for the tabs div element
   */
  get tabsClasses() {
    return 'tab-container';
  }
  /**
   * The class setter for the tabs div element
   */
  get verticalTabsClasses() {
    return 'vertical';
  }
  /**
   * The class setter for the tabs div element
   */
  get alternateTabsClasses() {
    return 'alternate';
  }
  /**
   * The class setter for the tabs div element
   */
  get moduleTabsClasses() {
    return 'module-tabs';
  }
}

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
