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
  NgZone,
  ChangeDetectorRef
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: 'input[soho-timepicker]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoTimePickerComponent)]
})
export class SohoTimePickerComponent extends BaseControlValueAccessor<any> implements AfterViewInit, AfterViewChecked, OnDestroy {
  private runUpdatedOnCheck?: boolean;
  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private timepicker?: SohoTimePickerStatic | null;
  private isDisabled?: boolean = undefined;
  private isReadOnly?: boolean = undefined;
  private options?: SohoTimePickerOptions = {
    roundToInterval: false,
    returnFocus: true
  };

  /**
   * Indicates mode, either 'standard' or 'range'; default value is 'standard'
   */
  @Input() set mode(mode: SohoTimePickerMode) {
    (this.options as any).mode = mode;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Indicates the pattern for the time format.
   */
  @Input() set timeFormat(timeFormat: string) {
    (this.options as any).timeFormat = timeFormat;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }
  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the minutes dropdown;
   * default value is 5.
   */
  @Input() set minuteInterval(minuteInterval: number) {
    (this.options as any).minuteInterval = minuteInterval;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If a non-matching minutes value is entered, will round the minutes value to the nearest interval on the blur event;
   * default value is false;
   */
  @Input() set roundToInterval(roundToInterval: boolean) {
    (this.options as any).roundToInterval = roundToInterval;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * The name of the locale to use for this instance. If not set, the current locale will be used.
   */
  @Input() set locale(locale: string) {
    (this.options as any).locale = locale;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * The name of the language to use for this instance. If not set, the current locale will be used or the the passed locale will be used.
   */
  @Input() set language(language: string) {
    (this.options as any).language = language;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * An integer from 1 to 60; multiples of this value are displayed as options in the seconds dropdown;
   * default value is 5.
   */
  @Input() set secondInterval(secondInterval: number) {
    (this.options as any).secondInterval = secondInterval;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If defined as a JQuery-wrapped element, will be used as the target element.
   */
  @Input() set parentElement(parentElement: JQuery) {
    (this.options as any).parentElement = parentElement;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * If set to false, focus will not be returned to the calling element;
   * default value is true.
   */
  @Input() set returnFocus(returnFocus: boolean) {
    (this.options as any).returnFocus = returnFocus;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    (this.options as any).attributes = attributes;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Set the input to tabbable
   */
  @Input() set tabbable(tabbable: boolean) {
    (this.options as any).tabbable = tabbable;
    if (this.timepicker) {
      this.markForRefresh();
    }
  }

  /**
   * Sets the control to be disabled or not.
   */
  @Input() set disabled(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.timepicker == null) {
      this.isDisabled = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isDisabled = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => {
        (this.timepicker as any).disable();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        (this.timepicker as any).enable();
        this.isReadOnly = false;
      });
    }
  }

  /**
   * Public API
   */
  get disabled(): boolean | undefined {
    return this.isDisabled;
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.timepicker == null) {
      this.isReadOnly = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isReadOnly = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => (this.timepicker as any).readonly());
    } else {
      this.ngZone.runOutsideAngular(() => {
        (this.timepicker as any).enable();
        this.isDisabled = false;
      });
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  /**
   * Called when the datepicker value changes
   *
   * @todo remove override of native attribute.
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change: EventEmitter<SohoTimePickerEvent> = new EventEmitter<SohoTimePickerEvent>();


  public setValue(time: string | undefined) {
    // There is no API to set the value on the timepicker, so this
    // emulates what the control does internally.
    (this.timepicker as any).element.val(time).trigger('change');
  }

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('class.timepicker') get isTimepicker() {
    return true;
  }

  /**
   * Creates an instance of SohoTimePickerComponent.
   *
   * @param element the element this component encapsulates.
   * @param ngZone the angular zone for this component.
   * @param ref reference to the change detector
   *
   */
  constructor(private element: ElementRef,
    private ngZone: NgZone,
    public ref: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the timepicker control
      this.jQueryElement.timepicker(this.options);

      // extract the api
      this.timepicker = this.jQueryElement.data('timepicker');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement
        .on('change', (args: SohoTimePickerEvent) => this.onChange(args));

      if (this.internalValue) {
        (this.timepicker as any).element.val(this.internalValue);
      }

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      // Ensure the enabled/disabled flags are set.
      if (this.isDisabled !== null && this.isDisabled !== undefined) {
        this.disabled = this.isDisabled;
      }
      if (this.isReadOnly !== null && this.isReadOnly !== undefined) {
        this.readonly = this.isReadOnly;
      }

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.timepicker) {
          this.timepicker?.updated();
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      if (this.timepicker) {
        // Destroy any widget resources.
        this.timepicker?.destroy();
        this.timepicker = null;
      }
    });
  }

  /**
   * Handle the control being changed.
   */
  onChange(event: SohoTimePickerEvent) {
    this.internalValue = this.timepicker?.element.val();

    // Set the date on the event.
    event.data = this.internalValue;

    // When the request for data has completed, make sure we
    // update the 'dropdown' control.
    this.ngZone.run(() => {
      // Fire the event
      this.change.emit(event);
    });
  }

  /**
   * Override writeValue to allow the time picker
   * element to be updated correctly.
   *
   * @param value - the new value
   */
  writeValue(value: any) {
    super.writeValue(value);
    if (this.timepicker) {
      // The processing is required to ensure we use the correct format
      // in the control.
      this.timepicker?.element.val(value);
    }
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }
}
