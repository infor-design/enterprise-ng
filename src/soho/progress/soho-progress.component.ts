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
  selector: 'div[soho-progress-bar]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoProgressBarComponent {
  @Input() progress: string = '0';
  @HostBinding('class.progress-bar') isProgress = true;

  @HostBinding('style.width') get width() {
    return this.progress + '%';
  }
}

@Component({
  selector: 'div[soho-progress]', // tslint:disable-line
  template: `<div soho-progress-bar [progress]='this.value'></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoProgressComponent implements AfterViewInit, OnDestroy {
  private options: SohoProgressOptions = {};
  public value: number;

  /*
   *  @param value
   */
  @Input() set progressValue(value: number){
    this.value = value;
    if (this.progress) {
      this.progress.update(this.value);
    }
  };

  get progressValue() {
    return this.value;
  }

  /*
   *  Calling when the progress-bar value changes
   */
  @Output() change: EventEmitter<SohoProgressEvent> = new EventEmitter<SohoProgressEvent>();

  // Set the progress-bar class.
   @HostBinding('class.progress') progressClass = true;

  // Reference to the jQuery control.
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
