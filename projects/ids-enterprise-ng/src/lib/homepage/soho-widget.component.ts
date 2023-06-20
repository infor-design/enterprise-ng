import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

export type WidgetSize = 'single' | 'double' | 'triple' | 'quad';

@Component({
  selector: 'div[soho-widget]', // eslint-disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoWidgetComponent implements AfterViewInit, OnInit {
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

  @HostBinding('class.no-header') get isNoHeader() {
    return this.noHeader;
  }

  @HostBinding('class.no-shadow') get isNoShadow() {
    return this.noShadow;
  }

  @Input() widgetWidth?: WidgetSize;
  @Input() widgetHeight?: WidgetSize | 'auto';
  @Input() removable?: boolean;

  @Input() noHeader: boolean | undefined;
  @Input() noShadow: boolean | undefined;

  @Input() set contentPaddingX(value: number | undefined) {
    (this.options as any).contentPaddingX = value;
    if (this.cards) {
      this.options.contentPaddingX = value;
    }
  }

  @Input() set bordered(value: boolean | string | undefined) {
    (this.options as any).bordered = value;
    if (this.cards) {
      this.options.bordered = value;
    }
  }

  @Input() set contentPaddingY(value: number | undefined) {
    (this.options as any).contentPaddingY = value;
    if (this.cards) {
      this.options.contentPaddingY = value;
    }
  }

  @Input() set detailRefId(value: string | undefined) {
    (this.options as any).detailRefId = value;
    if (this.cards) {
      this.options.detailRefId = value;
    }
  }

  @Output() resizecard = new EventEmitter<any>();
  @Output() reordercard = new EventEmitter<any>();
  @Output() removecard = new EventEmitter<any>();

  private options: SohoCardOptions = {};
  private cards?: SohoCardStatic | null;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  // Reference to the jQuery element.
  private jQueryElement?: JQuery;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      if (typeof (this.options.bordered) === 'string' && this.options.bordered !== null) {
        this.bordered = this.options.bordered.toLocaleLowerCase() === 'true';
      }
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);
      this.jQueryElement.cards(this.options);

      this.jQueryElement.cards({
        bordered: this.bordered,
        noHeader: this.noHeader,
        contentPaddingX: this.contentPaddingX,
        contentPaddingY: this.contentPaddingY,
        noShadow: this.noShadow,
        detailRefId: this.detailRefId,
      })

      this.jQueryElement
        .on('resizecard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onResizeCard(card, metadata))
        .on('reordercard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onReorderCard(card, metadata))
        .on('removecard', (_e: JQuery.TriggeredEvent, card: JQuery, metadata: object) => this.onRemoveCard(card, metadata));
    });
  }

  onResizeCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card, metadata };

    this.ngZone.run(() => {
      this.resizecard.emit(event);
    });
  }

  onReorderCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card, metadata };

    this.ngZone.run(() => {
      this.reordercard.emit(event);
    });
  }

  onRemoveCard(card: JQuery<HTMLElement>, metadata: object) {
    const event: SohoHomePageWidgetEditEvent = { widget: this, card, metadata };

    this.ngZone.run(() => {
      this.removecard.emit(event);
    });
  }
}
