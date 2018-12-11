/// <reference path="soho-context-menu.d.ts" />

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
      this.jQueryElement.on('selected', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.selected.next({e, args})));

      this.jQueryElement.on('beforeopen', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.beforeopen.emit({e, args})));

      this.jQueryElement.on('close', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.close.emit({e, args})));

      this.jQueryElement.on('open', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.open.emit({e, args})));
    });
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
