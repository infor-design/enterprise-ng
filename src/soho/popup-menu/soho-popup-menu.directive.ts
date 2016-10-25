import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[soho-popup-menu]' // tslint:disable-line
})

export class SohoPopupMenuDirective implements AfterViewInit, OnDestroy {

  private jQueryElement: JQuery;

  private popupMenu: SohoPopupMenuStatic;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  private options: SohoPopupMenuOptions = {};

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected = new EventEmitter<SohoPopupMenuEvent>();
  @Output() beforeopen = new EventEmitter<SohoPopupMenuEvent>();
  @Output() open = new EventEmitter<SohoPopupMenuEvent>();
  @Output() close = new EventEmitter<SohoPopupMenuEvent>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  @Input() set trigger(trigger: SohoPopupMenuTrigger) {
    this.options.trigger = trigger;
    if (this.popupMenu) {
      this.popupMenu.settings.trigger = trigger;
      this.popupMenu.updated();
    }
  }

  @Input() set menu(menu: string) {
    this.options.menu = menu;
    if (this.popupMenu) {
      this.popupMenu.settings.menu = menu;
      this.popupMenu.updated();
    }
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.popupmenu(this.options);
    this.popupMenu = this.jQueryElement.data('popupmenu');

    // Add listeners to emit events
    this.jQueryElement
      .on('selected', ((event: SohoPopupMenuEvent ) => { this.selected.emit(event); }))
      .on('beforeopen', ((event: SohoPopupMenuEvent ) => { this.beforeopen.emit(event); }))
      .on('close', ((event: SohoPopupMenuEvent ) => { this.close.emit(event); }))
      .on('open', ((event: SohoPopupMenuEvent ) => { this.open.emit(event); }));
  }

  updated() {
    this.popupMenu.updated();
  }

  teardown() {
    this.popupMenu.teardown();
  }

  ngOnDestroy() {
    if (this.popupMenu) {
      // @todo raise an issue on this failing on removeData!
      // this.menuButton.destroy();
      this.popupMenu = null;
    }
  }

}
