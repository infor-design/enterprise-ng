import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-slider]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoSliderComponent)]
})

export class SohoSliderComponent extends BaseControlValueAccessor<number> implements AfterViewInit, AfterViewChecked, OnDestroy {

  /** Minimum Value */
  @Input() public set min(min: number) {
    this.options.min = min;
  }
  public get min(): number {
    return this.options.min;
  }

  /** Maximum Value */
  @Input() public set max(max: number) {
    this.options.max = max;
  }
  public get max(): number {
    return this.options.max;
  }
  /** Increment or decrement by step value */
  @Input() public set step(step: number) {
    this.options.step = step;
  }
  public get step(): number {
    return this.options.step;
  }

  /** value or a range of values */
  @Input() public set value(value: number[]) {
    this.options.value = value;
    if (this.slider) {
      this.slider.setValue(value[0], value[1]);
    }
  }
  public get value(): number[] {
    if (this.slider) {
      return this.slider.value();
    }
    return this.options.value;
  }

  /** Choose a range of values or select a value */
  @Input() public set range(range: boolean) {
    this.options.range = range;
  }
  public get range(): boolean {
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
  /** Tooltip Content */
  @Input() set tooltipContent(tooltipContent: string[]) {
    this.options.tooltipContent = tooltipContent;
  }
  /** Set vertical class to render the slider vertically */
  @Input() set vertical(isVertical: boolean) {
    this.isVertical = isVertical;
  }

  /** Called when the slider control changes */
  @Output() change: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

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
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private isVertical = false;
  private isVerticalOriginal = false;

  private jQueryElement: JQuery;
  private slider: SohoSliderStatic;
  private options: SohoSliderOptions = {};

  constructor(private element: ElementRef) {
    super();
  }

  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
    if (this.slider) {
      if (value) {
        this.slider.disable();
        this.isDisabled = true;
      } else {
        this.slider.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;
    if (value) {
      this.slider.readonly();
      this.isReadOnly = true;
    } else {
      this.slider.enable();
      this.isReadOnly = false;
      this.isDisabled = false;
    }
  }

  get disabled(): boolean {
    return this.isDisabled;
  }

  get readonly(): boolean {
    return this.isReadOnly;
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.slider(this.options);
    this.slider = this.jQueryElement.data('slider');

    // Bind to events
    this.jQueryElement
      .on('change', (event: SohoSliderEvent) => this.onChange(event))
      .on('updated', (event: SohoSliderEvent) => this.onUpdated(event));
  }

  ngAfterViewChecked() {
    if (this.slider) {
      // Ensure the default disabled flag is applied.
      this.disabled = this.isDisabled;
      // Delay updated a bit so the class is also set for updated to render correctly.
      if (this.isVerticalOriginal !== this.isVertical) {
        this.slider.updated();
        this.isVerticalOriginal = this.isVertical;
      }
    }
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }

  onChange(event: SohoSliderEvent) {
    const newValue = this.jQueryElement.val() as number;
    if (this.internalValue !== newValue) {
      // Update the model ...
      this.internalValue = newValue;
      event.data = newValue;

      // ... then emit the changed value.
      this.change.emit(event);
    }
  }

  onUpdated(event: SohoSliderEvent) {
    event.data = this.jQueryElement.val();
    this.updated.emit(event);
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
