import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Component({
  selector: 'button[soho-menu-button]', // tslint:disable-line
  templateUrl: 'soho-menu-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoMenuButtonComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.btn-menu') get isBtnMenu() { return true; };
  @HostBinding('attr.type') get buttonType() { return 'button'; };

  private jQueryElement: JQuery;

  private menuButton: SohoPopupMenuStatic;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  private options: SohoPopupMenuOptions = {};

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected = new EventEmitter<SohoMenuButtonEvent>();
  @Output() beforeopen = new EventEmitter<SohoMenuButtonEvent>();
  @Output() open = new EventEmitter<SohoMenuButtonEvent>();
  @Output() close = new EventEmitter<SohoMenuButtonEvent>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /** The icon to be used. */
  @Input() icon: string;

  @Input() set trigger(trigger: SohoPopupMenuTrigger) {
    this.options.trigger = trigger;
    if (this.menuButton) {
      this.menuButton.settings.trigger = trigger;
      this.menuButton.updated();
    }
  }

  @Input() set menu(menu: string) {
    this.options.menu = menu;
    if (this.menuButton) {
      this.menuButton.settings.menu = menu;
      this.menuButton.updated();
    }
  }

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.popupmenu(this.options);
    this.menuButton = this.jQueryElement.data('popupmenu');

    // Add listeners to emit events
    this.jQueryElement
      .on('selected', ((event: SohoMenuButtonEvent) => { this.selected.emit(event); }))
      .on('beforeopen', ((event: SohoMenuButtonEvent ) => { this.beforeopen.emit(event); }))
      .on('close', ((event: SohoMenuButtonEvent ) => { this.close.emit(event); }))
      .on('open', ((event: SohoMenuButtonEvent ) => { this.open.emit(event); }));
  }

  updated() {
    this.menuButton.updated();
  }

  teardown() {
    this.menuButton.teardown();
  }

  ngOnDestroy() {
    if (this.menuButton) {
      // @todo raise an issue on this failing on removeData!
      // this.menuButton.destroy();
      this.menuButton = null;
    }
  }

}
