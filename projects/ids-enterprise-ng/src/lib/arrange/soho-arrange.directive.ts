import {
  Directive,
  ElementRef,
  NgZone,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[soho-arrange]',
})

export class SohoArrangeDirective implements AfterViewInit, OnDestroy {
  private jQueryElement?: JQuery;
  private _arrangeOptions!: SohoArrangeOptions;
  private arrange?: SohoArrangeStatic;

  @Output() beforeArrange = new EventEmitter<SohoArrangeEvent>();
  @Output() arrangeUpdate = new EventEmitter<SohoArrangeEvent>();
  @Output() dragEnd = new EventEmitter<SohoArrangeEvent>();

  @Input() set arrangeOptions(arrangeOptions: SohoArrangeOptions) {
    this._arrangeOptions = arrangeOptions;
  }

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement.arrange(this._arrangeOptions);

      this.arrange = this.jQueryElement.data('arrange');

      // Bind to jQuery events and emit as angular events
      this.jQueryElement.on('beforearrange', (event: JQuery.TriggeredEvent, status: any) =>
        this.ngZone.run(() => this.beforeArrange.emit({ event, status })));

      this.jQueryElement.on('arrangeupdate', (event: JQuery.TriggeredEvent, status: any) =>
        this.ngZone.run(() => this.arrangeUpdate.emit({ event, status })));

      this.jQueryElement.on('dragend', (event: JQuery.TriggeredEvent) =>
        this.ngZone.run(() => this.dragEnd.emit({ event })));
    });
  }

  ngOnDestroy(): void {
    this.arrange?.destroy();
  }

  updated(settings?: SohoArrangeOptions) {
    if (settings) {
      this.arrange?.updated(settings);
    }
  }
}
