import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  NgZone,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { eventNames } from 'process';

export type WidgetSize = 'single' | 'double' | 'triple' | 'quad';

@Component({
  selector: 'div[soho-widget]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoWidgetComponent implements AfterViewInit {
  @HostBinding('class') get classList(): string {
    let tmp = '';

    if (this.widgetWidth && this.widgetWidth !== 'single') {
      tmp += this.widgetWidth + '-width';
    }

    if (this.widgetHeight && this.widgetHeight !== 'single') {
      tmp += tmp ? ' ' : '';
      tmp += this.widgetHeight + '-height';
    }

    if (this.removable != null && this.removable !== true) {
      tmp += tmp ? ' ' : '';
      tmp += 'no-remove';
    }

    return tmp;
  }

  @HostBinding('class.widget') isWidget = true;

  @Input() widgetWidth: WidgetSize;
  @Input() widgetHeight: WidgetSize | 'auto';
  @Input() removable: boolean;

  @Output() resizecard = new EventEmitter<any>();
  @Output() reordercard = new EventEmitter<any>();
  @Output() removecard = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement
        .on('resizecard', (e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => { this.onResizeCard(card, metadata); })
        .on('reordercard', (e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => { this.onReorderCard(card, metadata); })
        .on('removecard', (e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => { this.onRemoveCard(card, metadata); });
    });
  }

  onResizeCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card: card, metadata: metadata };

    this.ngZone.run(() => {
      this.resizecard.emit(event);
    });
  }

  onReorderCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card: card, metadata: metadata };

    this.ngZone.run(() => {
      this.reordercard.emit(event);
    });
  }

  onRemoveCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card: card, metadata: metadata };

    this.ngZone.run(() => {
      this.removecard.emit(event);
    });
  }
}
