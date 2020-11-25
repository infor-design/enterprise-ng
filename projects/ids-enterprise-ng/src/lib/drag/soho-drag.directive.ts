import {
  Directive,
  ElementRef,
  NgZone,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[soho-drag]'
})
export class SohoDragDirective implements AfterViewInit, OnDestroy {
  @Input() set dragOptions(dragOptions: SohoDragOptions) {
    this._dragOptions = dragOptions;
  }
  @Output() dragStart = new EventEmitter<SohoDragEvent>();
  @Output() dragEnd = new EventEmitter<SohoDragEvent>();
  @Output() dragging = new EventEmitter<SohoDragEvent>();
  private jQueryElement?: JQuery;
  private _dragOptions?: SohoDragOptions;
  private drag?: SohoDragStatic;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      this.jQueryElement.drag(this._dragOptions);

      this.drag = this.jQueryElement.data('drag');

      // bind to jquery events and emit as angular events
      this.jQueryElement.on('dragstart', (event: JQuery.TriggeredEvent, ui: any) =>
        this.ngZone.run(() => this.dragStart.emit({ event, ui })));

      this.jQueryElement.on('dragend', (event: JQuery.TriggeredEvent, ui: any) =>
        this.ngZone.run(() => this.dragEnd.emit({ event, ui })));

      this.jQueryElement.on('drag', (event: JQuery.TriggeredEvent, ui: any) =>
        this.ngZone.run(() => this.dragging.emit({ event, ui })));
    });
  }

  getElementsFromPoint(x: number, y: number): Element[] {
    return this.drag?.getElementsFromPoint(x, y);
  }

  ngOnDestroy() {
    this.drag?.destroy();
  }

  updated(settings?: SohoDragOptions) {
    if (settings) {
      this.drag?.updated(settings);
    }
  }
}
