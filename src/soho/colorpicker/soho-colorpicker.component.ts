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
} from '../utils/base-control-value-accessor';


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
      this.colorpicker.settings.colors = colors;
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
   * Enables or disables editing
   */
  @Input() set editable(value: boolean) {
    this.isEditable = value;
    this.options.editable = value;

    if (this.colorpicker) {
      this.colorpicker.settings.editable = value;
    }

    if (this.colorpicker) {
      if (value) {
        this.colorpicker.enable();
        this.isEditable = true;
      } else {
        this.colorpicker.readonly();
        this.isEditable = false;
      }
    }
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;

    // 4.3.1 did not have this method in time add a safety check it works for future versions
    if (this.colorpicker && this.colorpicker.readonly) {
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
   * Sets the control to show color label
   */
  @Input() set showLabel(value: boolean) {
    this.isShowLabel = value;
    this.options.showLabel = value;

    if (this.colorpicker) {
      this.colorpicker.settings.showLabel = value;
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
  get showLabel() {
    return this.isShowLabel;
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
  private isEditable: boolean = null;
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private isShowLabel: boolean = null;
  private options: SohoColorPickerOptions = {
    colors: undefined,
    showLabel: false,
    editable: true
  };

  constructor(private element: ElementRef, private changeDetectionRef: ChangeDetectorRef) {
    super(changeDetectionRef);
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Needs the value set pre-init
    this.jQueryElement.val(this.internalValue);
    this.jQueryElement.colorpicker(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement
      .on('change', (e: any, args: SohoColorPickerEvent) => this.onChange(args));

    this.colorpicker = this.jQueryElement.data('colorpicker');

    if (this.internalValue) {
      this.colorpicker.element.val(this.internalValue);
      this.colorpicker.setColor(this.internalValue);
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoColorPickerEvent) {

    if (!event) {
      // sometimes the event is not available
      this.internalValue = this.colorpicker.element.val();
      this.colorpicker.setColor(this.internalValue);
      return;
    }
    this.change.emit(event);
  }

  /**
   * Override writeValue to allow the time picker
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.colorpicker) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.colorpicker.element.val(value);
      this.colorpicker.setColor(value);
    }
  }

  ngOnDestroy() {
    if (this.colorpicker) {
      this.colorpicker.destroy();
      this.colorpicker = null;
    }
  }
}
