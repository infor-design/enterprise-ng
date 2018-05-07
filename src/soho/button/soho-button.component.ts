import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';

/**
 * Supported button types.
 */
export type SohoButtonType = 'btn' | 'primary' | 'secondary' | 'tertiary' | 'icon' | 'favorite' | 'modal' | 'modal-primary';

@Component({
  selector: 'button[soho-button]', // tslint:disable-line
  templateUrl: './soho-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoButtonComponent implements AfterViewInit, OnDestroy, OnInit {

  // -------------------------------------------
  // Supported button types.
  // -------------------------------------------

  static BTN: SohoButtonType = 'btn';
  static PRIMARY: SohoButtonType = 'primary';
  static SECONDARY: SohoButtonType = 'secondary';
  static TERTIARY: SohoButtonType = 'tertiary';
  static ICON: SohoButtonType = 'icon';
  static FAVORITE: SohoButtonType = 'favorite';
  static MODAL: SohoButtonType = 'modal';
  static MODAL_PRIMARY: SohoButtonType = 'modal-primary';

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery control. */
  private jQueryElement: JQuery;

  /** Reference to the Soho control api. */
  private button: SohoButtonStatic;

  /** The type of the button. */
  private buttonType: SohoButtonType;

  private _buttonOptions: SohoButtonOptions = {};
  private _isToggle = false;
  private _isTogglePressed = false;
  private _isPressed = false;

  /** The type of the button, defaulting to 'secondary'. */
  @Input('soho-button') set sohoButton(type: SohoButtonType) {
    this.buttonType = type ? type : SohoButtonComponent.SECONDARY;
  }

  /**
   * Sets the button options
   */
  @Input() set buttonOptions(buttonOptions: SohoButtonOptions) {
    ArgumentHelper.checkNotNull('buttonOptions', buttonOptions);

    this._buttonOptions = buttonOptions;
    if (this.jQueryElement) {
      // todo: how to update the button when options change?
    }
  }
  get buttonOptions(): SohoButtonOptions {
    return this._buttonOptions;
  }

  @Input() set toggleOnIcon(toggleOnIcon: string) {
    this._buttonOptions.toggleOnIcon = toggleOnIcon;
    if (this.jQueryElement) {
      // todo: how to update the button when toggleOnIcon change?
    }
  }

  @Input() set toggleOffIcon(toggleOffIcon: string) {
    this._buttonOptions.toggleOffIcon = toggleOffIcon;
    if (this.jQueryElement) {
      // todo: how to update the button when toggleOffIcon change?
    }
  }

  /**
   * Whether this button should be a toggle button or not. Alternate toggle on/off icons
   * can be used through toggleOnIcon/toggleOffIcon inputs.
   */
  @Input() set isToggle(isToggle: boolean) {
    this._isToggle = isToggle;
  }

  get isToggle(): boolean {
    return this._isToggle;
  }

  /**
   * Whether the toggle button should be in a pressed state or not.
   */
  @Input() set isTogglePressed(isTogglePressed: boolean) {
    this._isTogglePressed = isTogglePressed;
  }

  get isTogglePressed(): boolean {
    return this._isTogglePressed;
  }

  /**
   * The icon to be used
   *  - shows when the state is true if toggle has a value
   */
  @Input() icon: string;

  /** Sets the button type to 'submit' when true. */
  @Input() isSubmit = false;

  /** Sets whether the button should have a ripple effect on click. */
  @Input() ripple = true;

  /**
   * Binary state (toggle):
   *  0 - shows toggle
   *  1 - shows icon (default)
   *
   *  @deprecated use isToggle=true input instead along with toggleOnIcon/toggleOffIcon options
   */
  @Input() state = undefined;

  /**
   * The icon to be used when the state is false.
   * @deprecated use isToggle=true input instead along with toggleOnIcon/toggleOffIcon options
   */
  @Input() toggle: string;

  /**
   * Sets the expandable-expander class to be placed on the button for the
   * soho-expandablearea to use as it's expand/collapse trigger
   * @type {boolean}
   */
  @Input() expandableExpander = false;

  @HostBinding('class.btn')
  get btn() {
    return this.buttonType === SohoButtonComponent.BTN;
  }

  @HostBinding('class.btn-primary')
  get btnPrimary() {
    return this.buttonType === SohoButtonComponent.PRIMARY;
  }

  @HostBinding('class.btn-secondary')
  get btnSecondary() {
    return this.buttonType === SohoButtonComponent.SECONDARY;
  }

  @HostBinding('class.btn-tertiary')
  get btnTertiary(): boolean {
    return this.buttonType === SohoButtonComponent.TERTIARY;
  }

  @HostBinding('class.btn-icon')
  get btnIcon(): boolean {
    return this.buttonType === SohoButtonComponent.ICON || this.buttonType === SohoButtonComponent.FAVORITE;
  }

  @HostBinding('class.btn-toggle') get btnToggle() {
    return this.isToggle;
  }

  @HostBinding('class.btn-modal') get btnModal() {
    return this.buttonType === SohoButtonComponent.MODAL;
  }

  @HostBinding('class.btn-modal-primary') get btnModalPrimary() {
    return this.buttonType === SohoButtonComponent.MODAL_PRIMARY;
  }

  @HostBinding('class.is-pressed') get btnTogglePressed() {
    return this.isTogglePressed;
  }

  @HostBinding('class.icon-favorite') get iconFavorite(): boolean {
    return this.buttonType === SohoButtonComponent.FAVORITE;
  }

  @HostBinding('class.btn-moveto-left') @Input() moveToLeft;
  @HostBinding('class.btn-moveto-right') @Input() moveToRight;
  @HostBinding('class.btn-moveto-selected') @Input() moveToSelected;

  @HostBinding('class.no-ripple')
  get noRipple(): boolean {
    return !this.ripple;
  }

  @HostBinding('attr.type') get type() {
    return this.isSubmit ? 'submit' : 'button';
  }

  @HostBinding('class.expandable-expander') get isExpandableExpander() {
    return this.expandableExpander;
  }

  /**
   * @deprecated no longer needed once this.toggle is removed.
   */
  @HostListener('click') toggleState() {
    if (this.toggle) {
      this.state = !this.state;
    }
  }

  @HostBinding('attr.aria-pressed') get ariaPressed() {
    return this.isPressed();
  }

  /**
   * Constructor.
   *
   * @param elementRef - the element matching the component's selector.
   */
  constructor(private element: ElementRef, private ngZone: NgZone) {
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngOnInit() {
    if (this.buttonType === SohoButtonComponent.FAVORITE) {
      if (this.isToggle) {
        this.toggleOffIcon = 'star-outlined';
        this.toggleOnIcon = 'star-filled';
      } else {
        // deprecated in 4.3.0 sohoxi
        this.toggle = 'star-outlined';
        this.icon = 'star-filled';
      }
    }
  }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialise the Soho control.
      this.jQueryElement.button(this._buttonOptions);

      // Initialize title attribute as a soho tooltip
      if (this.jQueryElement.has('[title]') && !this.jQueryElement.has('[popover]')) {
        this.jQueryElement.tooltip();
      }

      // Once the control is initialised, extract the control
      // plug-in from the element.  The element name is defined
      // by the plug-in, but in this case is 'button'.
      this.button = this.jQueryElement.data('button');

      if (this.state !== undefined) {
        // turn off the default handling of the favorite icon switching
        // in the sohoxi controls (button.js). This is so that only this
        // button-component handles the switching of the toggle icon for
        // favorite.
        if (this.buttonType === SohoButtonComponent.FAVORITE) {
          this.jQueryElement.off('click.favorite');
        }
      }
    });

    // There are no 'extra' event handler for button.
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.button) {
        this.button.destroy();
        this.button = null;
      }
    });
  }

  get hasIcon() {
    return (this.icon || (this.buttonOptions.toggleOnIcon && this.buttonOptions.toggleOffIcon));
  }

  get currentIcon() {
    if (this.isToggle && this.buttonOptions.toggleOnIcon && this.buttonOptions.toggleOffIcon) {
      return this.isPressed() ? this.buttonOptions.toggleOnIcon : this.buttonOptions.toggleOffIcon;
    }

    if (this.toggle) {
      return this.state ? this.icon : this.toggle;
    }

    return this.icon;
  }

  /**
   * @deprecated use isToggle and isTogglePressed instead.
   */
  public isPressed(): boolean {
    return this.ngZone.runOutsideAngular(() => {
      const pressed = this.element.nativeElement.getAttribute('aria-pressed');
      this._isPressed = (pressed === true || pressed === 'true');
      return this._isPressed;
    });
  }
}
