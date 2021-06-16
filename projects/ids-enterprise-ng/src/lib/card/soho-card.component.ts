import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  Output,
} from '@angular/core';

// tslin:disable-next-line:no-unused-variable
import { Observable } from 'rxjs';

@Component({
  selector: 'soho-card-header',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoCardHeaderComponent {
  @HostBinding('class.card-header') get isCardHeader() {
    return true;
  }
  @HostBinding('style.display') block = 'block';
}

@Component({
  selector: 'soho-card-pane',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoCardPaneComponent {
  @HostBinding('class.card-pane') get isCardPane() {
    return true;
  }
  @HostBinding('style.display') none = 'none';
}

@Component({
  selector: 'soho-card', // eslint-disable-line
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoCardComponent implements AfterViewInit {
  @Input('soho-card') id: string | undefined; // eslint-disable-line
  @Input() expandableHeader: boolean | undefined; // eslint-disable-line
  @Input() verticalButtonAction: boolean | undefined; // eslint-disable-line
  @Input() autoHeight: boolean | undefined; // eslint-disable-line
  @HostBinding('style.display') block = 'block';
  @HostBinding('class.card') get isCard() {
    return true;
  }
  @HostBinding('class.expandable-card') get isExpandableHeader() {
    return this.expandableHeader;
  }
  @HostBinding('class.auto-height') get isAutoHeight() {
    return this.autoHeight;
  }

  @Input() set closed(value: boolean | undefined) {
    this._closed = value;
    if (value && this.jQueryElement) {
      this.close();
    }
  }

  /**
   * Closed the state of the component
   */
  get closed(): boolean | undefined {
    return this._closed;
  }

  // Expose methods in case Angular needs to control the DOM
  // using Observable
  @Input() toggle?: Observable<boolean>;

  // Add events for Angular elements to listen to
  @Output() beforeexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforecollapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() expand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() collapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afterexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() aftercollapse: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement?: JQuery;
  private card?: SohoCardStatic | null;
  private _closed?: boolean;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      if (this.toggle) {
        this.toggle.subscribe(value => this.toggleOpen(value));
      }

      // Add listeners to emit events
      this.jQueryElement.on('beforeexpand', (event: SohoCardEvent) => this.onBeforeExpand(event));
      this.jQueryElement.on('beforecollapse', (event: SohoCardEvent) => this.onBeforeCollapse(event));
      this.jQueryElement.on('expand', (event: SohoCardEvent) => this.onExpand(event));
      this.jQueryElement.on('collapse', (event: SohoCardEvent) => this.onCollapse(event));
      this.jQueryElement.on('afterexpand', (event: SohoCardEvent) => this.onAfterExpand(event));
      this.jQueryElement.on('aftercollapse', (event: SohoCardEvent) => this.onAfterCollapse(event));

      // Add listeners to emit events
      // Initiate the element via jQuery
      this.jQueryElement.cards({
        id: this.id,
        expandableHeader: this.expandableHeader,
        expanded: !this.closed,
        verticalButtonAction: this.verticalButtonAction,
      });

      this.card = this.jQueryElement.data('cards');

      if (this.closed) {
        this.toggleOpen(false);
      } else if (typeof this.closed !== 'undefined') {
        this.toggleOpen(true);
      }
    });
  }

  /**
   * Toggles the state of the expandable card based on the passed param.
   */
  toggleOpen(open: boolean) {
    this.ngZone.runOutsideAngular(() => {
      this._closed = !open;
      if (open) {
        this.card?.open();
      } else {
        this.card?.close();
      }
    });
  }

  close(): void {
    this.ngZone.runOutsideAngular(() => this.card?.close());
  }

  open(): void {
    this.ngZone.runOutsideAngular(() => this.card?.open());
  }

  private onBeforeExpand(event: SohoCardEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.beforeexpand.emit(event));
  }

  private onBeforeCollapse(event: SohoCardEvent) {
    this.ngZone.run(() => this.beforecollapse.emit(event));
  }

  private onExpand(event: SohoCardEvent) {
    this.ngZone.run(() => this.expand.emit(event));
  }

  private onCollapse(event: SohoCardEvent) {
    this.ngZone.run(() => this.collapse.emit(event));
  }

  private onAfterExpand(event: SohoCardEvent) {
    this.ngZone.run(() => this.afterexpand.emit(event));
  }

  private onAfterCollapse(event: SohoCardEvent) {
    this.ngZone.run(() => this.aftercollapse.emit(event));
  }
}
