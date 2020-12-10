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
  Self,
  Optional,
  ChangeDetectorRef
} from '@angular/core';
import {
  NgControl,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'input[soho-colorpicker]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoColorPickerComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck?: boolean;

  /** Value Accessor */
  private valueAccessor?: SohoColorPickerComponentValueAccessorDelegator;

  /**
   * Local variables
   */
  private jQueryElement: any;
  private colorpicker: any;
  private isEditable?: boolean = undefined;
  isUppercase?: boolean = undefined;
  isClearable?: boolean = undefined;
  private isDisabled?: boolean = undefined;
  private isReadOnly?: boolean = undefined;
  private isShowLabel?: boolean = undefined;
  isColorOnly?: boolean = undefined;
  hasCustomColor?: boolean = undefined;
  clearableTextString = '';
  private options?: SohoColorPickerOptions = {
    showLabel: false,
    editable: true,
    uppercase: true,
    colorOnly: false,
    clearable: true,
    customColors: false,
    disabled: false
  };

  /**
   * Indicates the color list
   */
  @Input() set colors(colors: Array<SohoColorOption> | undefined) {
    (this.options as any).colors = colors;

    if (this.colorpicker) {
      this.colorpicker.settings.colors = colors;
      this.markForRefresh();
    }
  }

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean | undefined) {
    this.isDisabled = value;
    (this.options as any).disabled = value;

    if (this.colorpicker) {
      this.colorpicker.settings.disabled = value;
    }

    if (this.colorpicker) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.colorpicker.disable());
        this.isDisabled = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.colorpicker.enable());
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  get disabled() {
    return this.isDisabled;
  }

  /**
   * Enables or disables editing
   */
  @Input() set editable(value: boolean | undefined) {
    this.isEditable = value;
    (this.options as any).editable = value;

    if (this.colorpicker) {
      this.colorpicker.settings.editable = value;
    }

    if (this.colorpicker) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.colorpicker.enable());
        this.isEditable = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.colorpicker.readonly());
        this.isEditable = false;
      }
    }
  }

  get editable() {
    return this.isEditable;
  }

  /**
   * Enables or disables forces upper case hex.
   */
  @Input() set uppercase(value: boolean) {
    this.isUppercase = value;
    (this.options as any).uppercase = value;

    if (this.colorpicker) {
      this.colorpicker.settings.uppercase = value;
      this.markForRefresh();
    }
  }

  /**
   * Enables or disables the clear option.
   */
  @Input() set clearable(value: boolean) {
    this.isClearable = value;
    (this.options as any).clearable = value;

    if (this.colorpicker) {
      this.colorpicker.settings.clearable = value;
      this.markForRefresh();
    }
  }

  /**
   * Enables or disables the clear option.
   */
  @Input() set customColors(value: boolean) {
    this.hasCustomColor = value;
    (this.options as any).customColors = value;

    if (this.colorpicker) {
      this.colorpicker.settings.customColors = value;
      this.markForRefresh();
    }
  }

  /**
   * Enables or disables the colorOnly option.
   */
  @Input() set colorOnly(value: boolean) {
    this.isColorOnly = value;
    (this.options as any).colorOnly = value;

    if (this.colorpicker) {
      this.colorpicker.settings.colorOnly = value;
      this.markForRefresh();
    }
  }

  /**
   * Sets the clearableText option.
   */
  @Input() set clearableText(value: string) {
    this.clearableTextString = value;
    (this.options as any).clearableText = value;

    if (this.colorpicker) {
      this.colorpicker.settings.clearableText = value;
      this.markForRefresh();
    }
  }

  /**
   * Add extra attributes like id's to the component
   */
  @Input() set attributes(value: Array<Object> | Object) {
    (this.options as any).attributes = value;

    if (this.colorpicker) {
      this.colorpicker.settings.attributes = value;
      this.markForRefresh();
    }
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean | undefined) {
    this.isReadOnly = value;

    // 4.3.1 did not have this method in time add a safety check it works for future versions
    if (this.colorpicker && this.colorpicker.readonly) {
      if (value) {
        this.ngZone.runOutsideAngular(() => this.colorpicker.readonly());
        this.isReadOnly = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.colorpicker.enable());
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }
  }

  get readonly() {
    return this.isReadOnly;
  }

  /**
   * Sets the control to show color label
   */
  @Input() set showLabel(value: boolean | undefined) {
    this.isShowLabel = value;
    (this.options as any).showLabel = value;

    if (this.colorpicker) {
      this.colorpicker.settings.showLabel = value;
      this.markForRefresh();
    }
  }

  get showLabel() {
    return this.isShowLabel;
  }

  /**
   * Called when the colorpicker value changes
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() change: EventEmitter<SohoColorPickerEvent> = new EventEmitter<SohoColorPickerEvent>();

  /**
   * Called when the colorpicker updates in some way.
   */
  @Output('updated')  // eslint-disable-line
  updatedEvent: EventEmitter<JQuery.TriggeredEvent> = new EventEmitter<JQuery.TriggeredEvent>();

  /**
   * Public API
   */
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

  /**
   * Creates an instance of SohoColorPickerComponent.
   *
   * @param element the element this component encapsulates.
   * @param ngZone the angualar zone for this component
   * @param ngControl any associated form control (optional)
   *
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    @Self() @Optional() public ngControl: NgControl,
    public ref: ChangeDetectorRef) {

    // Is the control using a form control and/or ngModel?
    if (this.ngControl) {
      // Wrap the accessor to allow updates to be pushed,
      // but also use the standard accessors provided by angular.
      this.valueAccessor =
        new SohoColorPickerComponentValueAccessorDelegator( // teslint-disable-line
          (this.ngControl.valueAccessor as any), this); // eslint-disable-line

      // ... change the accessor on the control to use ours.
      this.ngControl.valueAccessor = this.valueAccessor;
    }
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement);

      // initialise the colorpicker control
      this.jQueryElement.colorpicker(this.options);

      // extract the api
      this.colorpicker = this.jQueryElement.data('colorpicker');

      // Add event binding
      this.jQueryElement
        .on('change', (event: JQuery.TriggeredEvent) => this.onChanged(event));

      this.runUpdatedOnCheck = true;
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {

        // this.disabled = this.isDisabled;
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        setTimeout(() => this.updated());
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Event handler for the 'changed' event on the 'colorpicker' component.
   *
   *
   * @param event the standard jQuery event.
   */
  private onChanged(event: any) {
    // Retrieve the value from the 'colorpicker' component.
    const internalValue = this.colorpicker.element.val();

    // Make sure calls to angular are made in the right zone.
    this.ngZone.run(() => {
      // ... update the model (which will fire change
      // detection if required).
      this.colorpicker.setColor(internalValue);
      (this.valueAccessor as any).onChangeFn(internalValue);

      this.change.emit(event);
    });
  }

  /**
   * In case options are being bound asynchronously, you will need to trigger updated on
   * soho colorpicker control so it updates its value labels.
   */
  public updated(): SohoColorPickerComponent {
    if (this.colorpicker) {
      // Calling updated when an item is selected, looses the selection!
      this.ngZone.runOutsideAngular(() => this.colorpicker.updated());
    }
    return this;
  }

  onUpdated(event: JQuery.TriggeredEvent) {
    // Fire the event, in the angular zone.
    this.ngZone.run(() => this.updatedEvent.next(event));
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    if (this.colorpicker) {
      this.colorpicker.destroy();
      this.colorpicker = null;
    }
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

/**
 * Provides a 'wrapper' around the {ControlValueAccessor} added by
 * angular when handling changing color.s
 *
 * This class allows the {SohoColorPickerComponent} to interoperate with
 * the {ControlValueAccessor}.  Specifically, providing access to the
 * onChange function, which we must call when the value of the colorpicker
 * is modified.
 */
class SohoColorPickerComponentValueAccessorDelegator implements ControlValueAccessor {
  /**
   * The Function to call when the value of the control changes.
   */
  public onChangeFn?: Function;

  /**
   * Creates an instance of SohoColorPickerComponentValueAccessorDelegate.
   *
   * @param delegate the value accessor
   * @param colorpicker the colorpicker linked to the accessor
   */
  constructor(
    private delegate: ControlValueAccessor,
    private colorpicker: SohoColorPickerComponent) { }

  writeValue(value: any): void {
    // Just pass it on.
    this.delegate.writeValue(value);
    this.colorpicker.markForRefresh();
  }

  registerOnChange(fn: any): void {
    // Keep a reference to the change function, then we an call it.
    this.onChangeFn = fn;

    // Give the delegate a chance to store this too.
    this.delegate.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.delegate.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    (this.delegate as any).setDisabledState(isDisabled);
  }
}
