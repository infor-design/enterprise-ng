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

  private jQueryElement: any;
  private menuButton: any;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  private options: SohoMenuButtonOptions = {
    menu: null,
    trigger: 'click'
  };

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforeopen: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() open: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() close: EventEmitter<Object> = new EventEmitter<Object>();

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  /**
   * The icon to be used
   */
  @Input() icon: string = undefined;

  @Input() set trigger(trigger: string) {
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
    this.jQueryElement.on('selected', ((event: MenuButtonEvent) => { this.selected.emit(event); }));
    this.jQueryElement.on('beforeopen', ((event: MenuButtonEvent ) => { this.beforeopen.emit(event); }));
    this.jQueryElement.on('close', ((event: MenuButtonEvent ) => { this.close.emit(event); }));
    this.jQueryElement.on('open', ((event: MenuButtonEvent ) => { this.open.emit(event); }));
  }

  updated() {
    this.menuButton.updated();
  }

  teardown() {
    this.menuButton.teardown();
  }

  ngOnDestroy() {
    this.menuButton.destroy();
  }

}

/**
 * Interface for the jQuery event emitted
 */
export interface MenuButtonEvent {
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
