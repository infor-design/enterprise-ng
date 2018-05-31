import {
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
  selector: 'input[soho-colorpicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoColorPickerComponent)]
})
export class SohoColorPickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, OnDestroy {

  /**
   * Local variables
   */
  private jQueryElement: any;
  private colorpicker: any;
  private isEditable: boolean = null;
  private isUppercase: boolean = null;
  private isClearable: boolean = null;
  private isDisabled: boolean = null;
  private isReadOnly: boolean = null;
  private isShowLabel: boolean = null;
  private isColorOnly: boolean = null;
  private clearableTextString = '';
  private options: SohoColorPickerOptions = {
    colors: undefined,
    showLabel: false,
    editable: true,
    uppercase: true,
    colorOnly: false,
    clearable: true,
    clearableText: null
  };

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
   * Enables or disables forceing upper case hex.
   */
  @Input() set uppercase(value: boolean) {
    this.isUppercase = value;
    this.options.uppercase = value;

    if (this.colorpicker) {
      this.colorpicker.settings.uppercase = value;
    }

    if (this.colorpicker) {
      this.colorpicker.updated(this.options);
    }
  }

  /**
   * Enables or disables the clear option.
   */
  @Input() set clearable(value: boolean) {
    this.isClearable = value;
    this.options.clearable = value;

    if (this.colorpicker) {
      this.colorpicker.settings.clearable = value;
    }

    if (this.colorpicker) {
      this.colorpicker.updated(this.options);
    }
  }

  /**
   * Enables or disables the colorOnly option.
   */
  @Input() set colorOnly(value: boolean) {
    this.isColorOnly = value;
    this.options.colorOnly = value;

    if (this.colorpicker) {
      this.colorpicker.settings.colorOnly = value;
    }

    if (this.colorpicker) {
      this.colorpicker.updated(this.options);
    }
  }

  /**
   * Sets the clearableText option.
   */
  @Input() set clearableText(value: string) {
    this.clearableTextString = value;
    this.options.clearableText = value;

    if (this.colorpicker) {
      this.colorpicker.settings.clearableText = value;
    }

    if (this.colorpicker) {
      this.colorpicker.updated(this.options);
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
      this.colorpicker.updated();
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
  getLabelValue() {
    return this.colorpicker.getLabelValue();
  }
  getHexValue() {
    return this.colorpicker.getHexValue();
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.colorpicker') get isColorpicker() {
    return true;
  }

  constructor(private element: ElementRef) {
    super();
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
    if (this.colorpicker && value !== null) {
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
