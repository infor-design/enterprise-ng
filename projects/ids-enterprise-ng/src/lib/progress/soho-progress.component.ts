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
  selector: 'soho-progress', // eslint-disable-line
  template: `<div [class.progress-bar]="true" [attr.data-value]="value"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoProgressComponent implements AfterViewInit, OnDestroy {
  public value?: number;
  /*
   *  @param value
   */
  @Input() set progressValue(value: number | undefined) {
    this.value = value;
    if (this.progress) {
      this.progress.update((this.value as any));
    }
  }

  get progressValue(): number | undefined {
    return this.value;
  }

  /*
   *  Calling when the progress-bar value changes
   *
   * Fired when the dropdown list is opened.
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output() change?: EventEmitter<Object>;

  // Set the progress-bar class.
  @HostBinding('class.progress') progressClass = true;

  @HostBinding('style.display') get dispType() {
    return 'block';
  }

  private options: SohoProgressOptions = {};
  private jQueryElement?: JQuery;
  private progress?: SohoProgressStatic | null;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement.children[0]);
    this.jQueryElement.progress(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoProgressEvent) => this.change?.emit(event));
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
