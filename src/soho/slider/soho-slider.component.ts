import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'input[soho-slider]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})

export class SohoSliderComponent implements AfterViewInit, OnDestroy {

  /** Minimum Value */
  @Input() set min(min: number){
    this.options.min = min;
  }
  /** Maximum Value */
  @Input() set max(max: number){
    this.options.max = max;
  }
  /** Increment or decrement by step value */
  @Input() set step(step: number){
    this.options.step = step;
  }
  /** value or a range of values */
  @Input() set value(value: number[]){
    this.options.value = value;
  }
  /** Choose a range of values or select a value */
  @Input() set range (range: boolean){
    this.options.range = range;
  }
  /** An array of ticks that provide the value, description and color details */
  @Input() set ticks (ticks: string){
    this.options.ticks = JSON.parse(ticks);
  }
  /** Persist tooltip */
  @Input() set persistTooltip (persistTooltip: boolean){
    this.options.persistTooltip = persistTooltip;
  }
  /** Tooltip Content */
  @Input() set tooltipContent (tooltipContent: string[]){
    this.options.tooltipContent = tooltipContent;
  }
  /** Set vertical class to render the slider vertically */
  @Input() set vertical (isVertical: boolean){
    this.isVertical = isVertical;
  }

  /** Called when the slider control changes */
  @Output()
  change: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Called when the slider is updated when the model value changes */
  @Output()
  updated: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  /** Bind attributes to input element */
  @HostBinding('class.slider') get isSlider(){
    return true;
  }

  @HostBinding('class.vertical') get isVerticalSlider(){
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
  private isVertical: boolean = false;

  private jQueryElement: JQuery;
  private slider: SohoSliderStatic;
  private options: SohoSliderOptions = {};

  constructor(private element: ElementRef) { }

  @Input() set disabled (value: boolean) {
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

  @Input() set readonly (value: boolean) {
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
    this.jQueryElement.on('change', (event: SohoSliderEvent) => this.change.emit(event));
    this.jQueryElement.on('updated', (event: SohoSliderEvent) => this.updated.emit(event));
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
      this.slider = null;
    }
  }
}
