import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-slider]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoSliderComponent)]
})

export class SohoSliderComponent extends BaseControlValueAccessor<number> implements AfterViewInit, AfterViewChecked, OnDestroy {

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck?: boolean;

  /** Minimum Value */
  @Input() public set min(min: number | undefined) {
    this.options.min = min;
  }
  public get min(): number | undefined {
    return this.options.min;
  }

  /** Maximum Value */
  @Input() public set max(max: number | undefined) {
    this.options.max = max;
  }
  public get max(): number | undefined {
    return this.options.max;
  }
  /** Increment or decrement by step value */
  @Input() public set step(step: number | undefined) {
    this.options.step = step;
  }
  public get step(): number | undefined {
    return this.options.step;
  }

  /** value or a range of values */
  @Input() public set value(value: number[] | undefined) {
    this.options.value = value;
    if (this.slider && value) {
      this.slider.setValue(value[0], value[1]);
    }
  }
  public get value(): number[] | undefined {
    if (this.slider) {
      return this.slider.value();
    }
    return this.options.value;
  }

  /** Choose a range of values or select a value */
  @Input() public set range(range: boolean | undefined) {
    this.options.range = range;
  }
  public get range(): boolean | undefined {
    return this.options.range;
  }

  /** An array of ticks that provide the value, description and color details */
  @Input() public set ticks(ticks: string) {
    this.options.ticks = JSON.parse(ticks);
  }

  /** Persist tooltip */
  @Input() set persistTooltip(persistTooltip: boolean) {
    this.options.persistTooltip = persistTooltip;
  }

  /** Option to control the position of tooltip. ['top' , 'bottom'] */
  @Input() set tooltipPosition(tooltipPosition: 'top' | 'bottom') {
    this.options.tooltipPosition = tooltipPosition;
  }

  /** Tooltip Content */
  @Input() set tooltipContent(tooltipContent: string[]) {
    this.options.tooltipContent = tooltipContent;
  }

  /** Set vertical class to render the slider vertically */
  @Input() set vertical(isVertical: boolean) {
    this.isVertical = isVertical;
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;
  }

  /**
   * Called when the slider control changes
   *
   * @todo replace override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Called when the slider is being slid */
  @Output() sliding: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Called when the slider starts to be slid */
  @Output() slidestart: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Called when the slider is finished sliding, change will also fire here. */
  @Output() slidestop: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Called when the slider is updated when the model value changes */
  @Output() updated: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Bind attributes to input element */
  @HostBinding('class.slider') get isSlider() {
    return true;
  }

  @HostBinding('class.vertical') get isVerticalSlider() {
    return this.isVertical;
  }

  @HostBinding('attr.type') get sliderType() {
    return 'range';
  }

  /**
   * Local variables
   */
  private isDisabled?: boolean = undefined;
  private isReadOnly?: boolean = undefined;
  private isVertical = false;
  private isVerticalOriginal = false;

  private jQueryElement?: JQuery;
  private slider?: SohoSliderStatic | null;
  private options: SohoSliderOptions = {};

  constructor(private element: ElementRef, private ngZone: NgZone,) {
    super();
  }

  @Input() set disabled(value: boolean | undefined) {
    this.isDisabled = value;
    if (this.slider) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.slider?.disable());
        this.isDisabled = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.slider?.enable());
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }

  @Input() set readonly(value: boolean | undefined) {
    this.isReadOnly = value;
    if (value) {
      this.ngZone.runOutsideAngular(() => this.slider?.readonly());
      this.isReadOnly = true;
    } else {
      this.ngZone.runOutsideAngular(() => this.slider?.enable());
      this.isReadOnly = false;
      this.isDisabled = false;
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.slider(this.options);
      this.slider = this.jQueryElement.data('slider');

      // Bind to events
      this.jQueryElement
        .on('slidestart', (event: SohoSliderEvent) => this.onSlideStop(event))
        .on('slidestop', (event: SohoSliderEvent) => this.onSlideStart(event))
        .on('sliding', (event: SohoSliderEvent) => this.onSliding(event))
        .on('change', (event: SohoSliderEvent) => this.onChange(event))
        .on('updated', (event: SohoSliderEvent) => this.onUpdated(event));

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.slider && this.runUpdatedOnCheck) {
      // Ensure the default disabled flag is applied.
      this.disabled = this.isDisabled;
      // Delay updated a bit so the class is also set for updated to render correctly.
      if (this.isVerticalOriginal !== this.isVertical) {
        this.slider.updated();
        this.isVerticalOriginal = this.isVertical;
      }

      this.ngZone.runOutsideAngular(() => {
        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }

  onChange(event: SohoSliderEvent) {
    const newValue = this.jQueryElement?.val() as number;
    if (this.internalValue !== newValue) {
      // Update the model ...
      this.internalValue = newValue;
      event.data = newValue;

      // ... then emit the changed value.
      this.change.emit(event);
    }
  }

  onSliding(event: SohoSliderEvent) {
    event.data = this.jQueryElement?.val();
    this.sliding.emit(event);
  }

  onSlideStart(event: SohoSliderEvent) {
    event.data = this.jQueryElement?.val();
    this.slidestart.emit(event);
  }

  onSlideStop(event: SohoSliderEvent) {
    event.data = this.jQueryElement?.val();
    this.slidestop.emit(event);
  }

  onUpdated(event: SohoSliderEvent) {
    event.data = this.jQueryElement?.val();
    this.updated.emit(event);
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
