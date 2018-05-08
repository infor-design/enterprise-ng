import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input, NgZone,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[soho-context-menu]', // tslint:disable-line
})

export class SohoContextMenuDirective implements AfterViewInit, OnDestroy {
  private jQueryElement: JQuery;

  private contextMenu: SohoPopupMenuStatic;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------
  private options: SohoPopupMenuOptions = {
    trigger: 'rightClick'
  };

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected = new EventEmitter<SohoContextMenuEvent>();
  @Output() beforeopen = new EventEmitter<SohoContextMenuEvent>();
  @Output() open = new EventEmitter<SohoContextMenuEvent>();
  @Output() close = new EventEmitter<SohoContextMenuEvent>();

  // -------------------------------------------
  // Component Inputs

  @Input() set trigger(trigger: SohoPopupMenuTrigger) {
    this.options.trigger = trigger;
    if (this.contextMenu) {
      this.contextMenu.settings.trigger = trigger;
      this.contextMenu.updated();
    }
  }

  @Input() set menu(menu: string) {
    this.options.menu = menu;
    if (this.contextMenu) {
      this.contextMenu.settings.menu = menu;
      this.contextMenu.updated();
    }
  }

  /** beforeOpen - ajax callback for open event */
  @Input() set beforeOpen(beforeOpen: SohoPopupMenuSourceFunction) {
    this.options.beforeOpen = beforeOpen;
    if (this.contextMenu) {
      this.contextMenu.settings.beforeOpen = beforeOpen;
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

  get beforeOpen(): SohoPopupMenuSourceFunction {
    if (this.contextMenu) {
      return this.contextMenu.settings.beforeOpen;
    }

    return this.options.beforeOpen;
  }

  constructor(private element: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.popupmenu(this.options);
      this.contextMenu = this.jQueryElement.data('popupmenu');

      // Add listeners to emit events
      this.hookupRegisteredEvents();
    });
  }

  private hookupRegisteredEvents() {
    NgZone.assertNotInAngularZone();

    let eventsToRegister = null;
    if (this.registerForEvents !== undefined) {
      eventsToRegister = this.registerForEvents.split(' ');
    }

    // if no events are registered then all event will be bound for backward compatibility.
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'selected')) {
      this.jQueryElement.on('selected', (e: JQuery.Event, args: JQuery) =>
        this.ngZone.run(() => setTimeout(() => this.selected.next({e, args}), 1)));
    }
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforeopen')) {
      this.jQueryElement.on('beforeopen', (e: JQuery.Event, args: JQuery) =>
        this.ngZone.run(() => setTimeout(() => this.beforeopen.emit({e, args}), 1)));
    }
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'close')) {
      this.jQueryElement.on('close', (e: JQuery.Event, args: JQuery) =>
        this.ngZone.run(() => setTimeout(() => this.close.emit({e, args}), 1)));
    }
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'open')) {
      this.jQueryElement.on('open', (e: JQuery.Event, args: JQuery) =>
        this.ngZone.run(() => setTimeout(() => this.open.emit({e, args}), 1)));
    }
  }

  updated() {
    this.ngZone.runOutsideAngular(() => this.contextMenu.updated());
  }

  teardown() {
    this.ngZone.runOutsideAngular(() => this.contextMenu.teardown());
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.contextMenu) {
        // @todo raise an issue on this failing on removeData!
        // this.menuButton.destroy();
        this.contextMenu.destroy();
        this.contextMenu = null;
      }
    });
  }
}
