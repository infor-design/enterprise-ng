import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output
} from '@angular/core';

@Component({
  selector: 'input[soho-spinbox]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSpinboxComponent implements AfterViewInit, OnDestroy {

  /*
   *  @param value
   */
  @Input() set updateValue(val: number){
    this.val = val;
    if (this.spinbox) {
      this.spinbox.updateVal(this.val);
    }
  }

  get updateValue() {
    return this.value;
  }

  @Input() set disabled (value: boolean) {
    if (this.spinbox) {
      if (value) {
        this.spinbox.disable();
      } else {
        this.spinbox.enable();
      }
    }
  }

  get disabled(): boolean {
    return this.spinbox.isDisabled();
  }

  @Output() change: EventEmitter<Object> = new EventEmitter<Object>();

  // Set the spinbox class.
  @HostBinding('class.spinbox') spinboxClass = true;

  @HostBinding('attr.type') get spinboxType() {
    return 'text';
  }

  @HostBinding('attr.id')        @Input() id: string;
  @HostBinding('attr.name')      @Input() name: string;
  @HostBinding('attr.min')       @Input() min: number;
  @HostBinding('attr.max')       @Input() max: number;
  @HostBinding('attr.value')     @Input() value: number;
  @HostBinding('attr.step')      @Input() step: boolean;
  @HostBinding('attr.disabled')  @Input() isDisabled: boolean;

  private options: SohoSpinboxOptions = {};
  private val: number;
  private jQueryElement: JQuery;
  private spinbox: SohoSpinboxStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.spinbox(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoSpinboxEvent) => this.change.emit(event));
    this.spinbox = this.jQueryElement.data('spinbox');
  }

  ngOnDestroy() {
    if (this.spinbox) {
      this.spinbox.destroy();
      this.spinbox = null;
    }
  }
}
