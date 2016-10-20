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

  @Input() set min(min: number){
    this.options.min = min;
  }

  @Input() set max(max: number){
    this.options.max = max;
  }

  @Input() set step(step: number){
    this.options.step = step;
  }

  @Input() set value(value: number[]){
    this.options.value = value;
  }

  @Input() set range (range: boolean){
    this.options.range = range;
  }

  @Input() set ticks (ticks: string){
    this.options.ticks = JSON.parse(ticks);
  }

  @Input() set persistTooltip (persistTooltip: boolean){
    this.options.persistTooltip = persistTooltip;
  }

  @Input() set tooltipContent (tooltipContent: string[]){
    this.options.tooltipContent = tooltipContent;
  }

  @Input() set vertical (isVertical: boolean){
    this.isVertical = isVertical;
  }

  @Output()
  change: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  @Output()
  updated: EventEmitter<SohoSliderEvent> = new EventEmitter<SohoSliderEvent>();

  @HostBinding('class.vertical') get isSlider(){
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
    if (this.slider)
    {
      if (value){
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
    if (value){
      this.slider.readonly();
      this.isReadOnly = true;
    }
    else {
      this.slider.enable();
      this.isReadOnly = false;
      this.isDisabled = false;
    }
  }

  get disabled() {
    return this.isDisabled;
  }

  get readonly() {
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
    if (this.slider){
      this.slider.destroy();
      this.slider = null;
    }
  }
}
