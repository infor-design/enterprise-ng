import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Directive({
  selector: '[soho-context-menu], [soho-menu-button]', // tslint:disable-line
})

export class SohoContextMenuDirective implements AfterViewInit, OnDestroy {
  private jQueryElement: JQuery;

  private contextMenu: SohoPopupMenuStatic;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------
  private options: SohoPopupMenuOptions = {};

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

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.popupmenu(this.options);
    this.contextMenu = this.jQueryElement.data('popupmenu');

    // Add listeners to emit events
    this.jQueryElement
      .on('selected', ((event: SohoContextMenuEvent) => { this.selected.emit(event); }))
      .on('beforeopen', ((event: SohoContextMenuEvent ) => { this.beforeopen.emit(event); }))
      .on('close', ((event: SohoContextMenuEvent ) => { this.close.emit(event); }))
      .on('open', ((event: SohoContextMenuEvent ) => { this.open.emit(event); }));
  }

  updated() {
    this.contextMenu.updated();
  }

  teardown() {
    this.contextMenu.teardown();
  }

  ngOnDestroy() {
    if (this.contextMenu) {
      // @todo raise an issue on this failing on removeData!
      // this.menuButton.destroy();
      this.contextMenu = null;
    }
  }

}
