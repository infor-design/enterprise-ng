import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'soho-progress', // tslint:disable-line
  template: `<div [class.progress-bar]="true" [attr.data-value]="value"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoProgressComponent implements AfterViewInit, OnDestroy {
  public value: number;
  /*
   *  @param value
   */
  @Input() set progressValue(value: number) {
    this.value = value;
    if (this.progress) {
      this.progress.update(this.value);
    }
  }

  get progressValue() {
    return this.value;
  }

  /*
   *  Calling when the progress-bar value changes
   */
  @Output() change: EventEmitter<Object>;

  // Set the progress-bar class.
  @HostBinding('class.progress') progressClass = true;

  @HostBinding('style.display') get dispType() {
    return 'block';
  }

  private options: SohoProgressOptions = {};
  private jQueryElement: JQuery;
  private progress: SohoProgressStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement.children[0]);
    this.jQueryElement.progress(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoProgressEvent) => this.change.emit(event));
    this.progress = this.jQueryElement.data('progress');
  }

  ngOnDestroy() {
    if (this.progress) {
      this.progress.destroy();
      this.progress = null;
    }
  }

  update(value: number) {
    if (this.progress) {
      this.progress.update(value);
    }
  }
}
