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
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';
import {
  NgControl,
  ControlValueAccessor
} from '@angular/forms';

@Component({
  selector: 'input[soho-colorpicker]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoColorPickerComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck: boolean;

  /** Value Accessor */
  private valueAccessor: SohoColorPickerComponentValueAccessorDelegator;

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
      this.markForRefresh();
    }
  }

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;

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
        this.ngZone.runOutsideAngular(() => this.colorpicker.enable());
        this.isEditable = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.colorpicker.readonly());
        this.isEditable = false;
      }
    }
  }

  /**
   * Enables or disables forces upper case hex.
   */
  @Input() set uppercase(value: boolean) {
    this.isUppercase = value;
    this.options.uppercase = value;

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
    this.options.clearable = value;

    if (this.colorpicker) {
      this.colorpicker.settings.clearable = value;
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
        this.ngZone.runOutsideAngular(() => this.colorpicker.readonly());
        this.isReadOnly = true;
      } else {
        this.ngZone.runOutsideAngular(() => this.colorpicker.enable());
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
      this.markForRefresh();
    }
  }

  /**
   * Called when the colorpicker value changes
   */
  @Output() change: EventEmitter<SohoColorPickerEvent> = new EventEmitter<SohoColorPickerEvent>();

  /**
   * Called when the colorpicker updates in some way.
   */
  @Output('updated')  // tslint:disable-line
  updatedEvent: EventEmitter<Object> = new EventEmitter<JQuery.Event>();

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

  /**
   * Creates an instance of SohoColorPickerComponent.
   * @param {ElementRef} element the element this component encapsulates.
   * @param {NgZone} ngZone the angualar zone for this component
   * @param {NgControl} ngControl any associated form control (optional)
   * @memberof SohoColorPickerComponent
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
        new SohoColorPickerComponentValueAccessorDelegator( // tslint:disable-line
          this.ngControl.valueAccessor, this); // tslint:disable-line

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
        .on('change', (event: JQuery.Event) => this.onChanged(event));

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
        setTimeout(() => this.updated() );
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Event handler for the 'changed' event on the 'colorpicker' component.
   *
   * @private
   * @param {*} event the standard jQuery event.
   * @memberof SohoColorPickerComponent
   */
  private onChanged(event: any) {
    // This code does not work properly if run in the angular zone.
    NgZone.assertNotInAngularZone();

    // Retrieve the value from the 'colorpicker' component.
    const internalValue = this.colorpicker.element.val();

    // Make sure calls to angular are made in the right zone.
    this.ngZone.run(() => {
      // ... update the model (which will fire change
      // detection if required).
      this.colorpicker.setColor(internalValue);
      this.valueAccessor.onChangeFn(internalValue);

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
      this.ngZone.runOutsideAngular( () => this.colorpicker.updated() );
    }
    return this;
  }

  private onUpdated(event: JQuery.Event) {
    // Fire the event, in the angular zone.
    this.ngZone.run(() => this.updatedEvent.next(event) );
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
 *
 * @class SohoColorPickerComponentValueAccessorDelegator
 * @implements {ControlValueAccessor}
 */
class SohoColorPickerComponentValueAccessorDelegator implements ControlValueAccessor {
  /**
   * The Function to call when the value of the control changes.
   */
  public onChangeFn: Function;

  /**
   * Creates an instance of SohoColorPickerComponentValueAccessorDelegate.
   *
   * @param {ControlValueAccessor} delegate the value accessor
   * @param {SohoColorPickerComponent} colorpicker the colorpicker linked to the accessor
   * @memberof SohoColorPickerComponentValueAccessorDelegate
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
    this.delegate.setDisabledState(isDisabled);
  }
}
