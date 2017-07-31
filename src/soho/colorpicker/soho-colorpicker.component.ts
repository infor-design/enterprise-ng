import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils';


@Component({
  selector: 'input[soho-colorpicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  providers: [provideControlValueAccessor(SohoColorPickerComponent)]
})
export class SohoColorPickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

  /**
   * Indicates the color list
   */
  @Input() set colors(colors: Array<SohoColorOption>) {
    this.options.colors = colors;
    if (this.colorpicker) {
      this.colorpicker.updated();
    }
  }

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

    if (this.colorpicker) {
      if (value) {
        this.colorpicker.disable();
        this.isDisabled = true;
      } else {
        this.colorpicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    if (this.colorpicker) {
      if (value) {
        this.colorpicker.readonly();
        this.isReadOnly = true;
      } else {
        this.colorpicker.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  /**
   * Called when the datepicker value changes
   */
  @Output() change: EventEmitter<SohoColorPickerEvent> = new EventEmitter<SohoColorPickerEvent>();

  /**
   * Public API
   */
  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.colorpicker') get isColorpicker() {
    return true;
  };

  /**
   * Local variables
   */
  private jQueryElement: any;
  private colorpicker: any;
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private options: SohoColorPickerOptions = {
    colors: undefined,
    showLabel: false
  };

  constructor(private element: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    alert();
    this.jQueryElement.colorpicker(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
    .on('change', (e: any, args: SohoColorPickerEvent) => this.onChange(args));

    this.colorpicker = this.jQueryElement.data('colorpicker');

    if (this.value) {
      this.colorpicker.element.val(this.value);
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoColorPickerEvent) {
    if (!event) {
      // sometimes the event is not available
      this.value = this.colorpicker.element.val();
      return;
    }
    this.change.emit(event);
  }

  ngOnDestroy() {
    if (this.colorpicker) {
      this.colorpicker.destroy();
      this.colorpicker = null;
    }
  }
}
