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
  selector: 'button[soho-button]', // eslint-disable-line
  templateUrl: 'soho-button.component.html',
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
  private jQueryElement?: JQuery;

  /** Reference to the Soho control api. */
  private button?: SohoButtonStatic | null;

  /** The type of the button. */
  private buttonType?: SohoButtonType;

  private _buttonOptions: SohoButtonOptions = {};
  private _isToggle = false;
  private _isTogglePressed = false;
  private _iconAlign = 'start';
  private _isPressed = false;

  /**
   * The type of the button, defaulting to 'secondary'.
   *
   * Allow override of input, to match component selector.
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('soho-button') set sohoButton(type: SohoButtonType) {
    this.buttonType = type ? type : SohoButtonComponent.SECONDARY;
  }

  /**
   * Sets the button options
   */
  @Input() set buttonOptions(buttonOptions: SohoButtonOptions) {
    ArgumentHelper.checkNotNull('buttonOptions', buttonOptions);

    this._buttonOptions = buttonOptions;
    if (this.button) {
      // todo: how to update the button when options change?
    }
  }
  get buttonOptions(): SohoButtonOptions {
    return this._buttonOptions;
  }

  @Input() set toggleOnIcon(toggleOnIcon: string) {
    this._buttonOptions.toggleOnIcon = toggleOnIcon;
    if (this.jQueryElement) {
      // todo: how to update the button when toggleOnIcon changes?
    }
  }

  @Input() set toggleOffIcon(toggleOffIcon: string) {
    this._buttonOptions.toggleOffIcon = toggleOffIcon;
    if (this.jQueryElement) {
      // todo: how to update the button when toggleOffIcon changes?
    }
  }

  @Input() set replaceText(replaceText: boolean) {
    this._buttonOptions.replaceText = replaceText;
    if (this.jQueryElement) {
      ((this.button as any).settings as any).replaceText = replaceText;
    }
  }

  @Input() set hideMenuArrow(value: boolean | undefined) {
    this._buttonOptions.hideMenuArrow = value;
    if (this.button) {
      this.button.settings.hideMenuArrow = value;
    }
  }

  get hideMenuArrow(): boolean | undefined {
    return this._buttonOptions.hideMenuArrow;
  }

  /**
   * Used to add a bigger hit area (for mobile)
   */
  @Input() set hitbox(value: boolean | undefined) {
    this._buttonOptions.hitbox = value;
    if (this.button) {
      this.button.settings.hitbox = value;
    }
  }

  get hitbox(): boolean | undefined {
    return this._buttonOptions.hitbox;
  }

  /**
   * Used to set a notification badge on the button
   */
  @Input() set notificationBadge(value: boolean | undefined) {
    this._buttonOptions.notificationBadge = value;
    if (this.button) {
      this.button.settings.notificationBadge = value;
    }
  }

  get notificationBadge(): boolean | undefined {
    return this._buttonOptions.notificationBadge;
  }

  /**
   * Set the position and color of the notification badge on the button
   */
  @Input() set notificationBadgeOptions(value: SohoNotificationBadgeOptions | undefined) {
    this._buttonOptions.notificationBadgeOptions = value;
    if (this.button) {
      this.button.settings.notificationBadgeOptions = value;
    }
  }

  get notificationBadgeOptions(): SohoNotificationBadgeOptions | undefined {
    return this._buttonOptions.notificationBadgeOptions;
  }

  /**
   * Used to set an extra class on the soho-icon being used by soho-button.
   * Useful to set emerald06-color azure10-color to change the icon color.
   */
  @Input() extraIconClass?: string;

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
  @Input() icon?: string;

  /**
   * The icon placement
   */
  @Input() set iconAlign(iconAlign: string) {
    this._iconAlign = iconAlign;
  }

  get iconAlign(): string {
    return this._iconAlign;
  }

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
  @Input() state?: boolean;

  /**
   * The icon to be used when the state is false.
   *
   * @deprecated use isToggle=true input instead along with toggleOnIcon/toggleOffIcon options
   */
  @Input() toggle?: string;

  /**
   * Sets the expandable-expander class to be placed on the button for the
   * soho-expandablearea to use as it's expand/collapse trigger
   *
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

  @HostBinding('class.btn-moveto-left') @Input() moveToLeft: any;
  @HostBinding('class.btn-moveto-right') @Input() moveToRight: any;
  @HostBinding('class.btn-moveto-selected') @Input() moveToSelected: any;

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
    if (this.toggle) {  // eslint-disable-line
      this.state = !this.state; // eslint-disable-line
    }
  }

  @HostBinding('attr.aria-pressed') get ariaPressed() {
    return this.isTogglePressed;
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
        this.toggle = 'star-outlined'; // eslint-disable-line
        this.icon = 'star-filled';
      }
    }
    if (this.notificationBadge && this.notificationBadgeOptions?.position === 'upper-right') {
      this.iconAlign = 'end';
    }
  }

  ngAfterViewInit() {

    this.ngZone.runOutsideAngular(() => {
      const self = this;
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

      if (this.state !== undefined) { // eslint-disable-line
        // turn off the default handling of the favorite icon switching
        // in the sohoxi controls (button.js). This is so that only this
        // button-component handles the switching of the toggle icon for
        // favorite.
        if (this.buttonType === SohoButtonComponent.FAVORITE) {
          this.jQueryElement.off('click.favorite');
        }
      }

      // Remove aria-pressed attribute if button is not toggle
      if (!this.isToggle) {
        if (this.jQueryElement.attr('aria-pressed') !== undefined) {
          this.jQueryElement.removeAttr('aria-pressed');
        }
      }

      // There are no 'extra' event handlers for button.

      // Add observer for button changes in html
      const observer = new MutationObserver(function (mutations) {
        if (mutations[0].attributeName === 'soho-button' && self.jQueryElement) {
          const buttonStyles = [
            'btn',
            'btn-primary',
            'btn-secondary',
            'btn-tertiary',
            'btn-icon',
            'icon-favorite',
            'default'
          ];
          const removeClassStyles = () => {
            if (self.jQueryElement) {
              buttonStyles.forEach(style => {
                if (self.jQueryElement?.hasClass(style)) {
                  self.jQueryElement.removeClass(style);
                }
              })
            }
          }
          const type = self.jQueryElement.attr('soho-button');
          const buttonOptions: SohoButtonOptions = { style: self._buttonOptions.style, type: self._buttonOptions.type };

          switch (type) {
            case 'btn':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.BTN;
              buttonOptions.style = 'btn';
              break;
            case 'primary':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.PRIMARY;
              buttonOptions.style = 'btn-primary';
              break;
            case 'secondary':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.SECONDARY;
              buttonOptions.style = 'btn-secondary';
              break;
            case 'tertiary':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.TERTIARY;
              buttonOptions.style = 'btn-tertiary';
              break;
            case 'icon':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.ICON;
              buttonOptions.type = 'btn-icon';
              break;
            case 'favorite':
              removeClassStyles();
              self.buttonType = SohoButtonComponent.FAVORITE;
              buttonOptions.type = 'icon-favorite';
              break;
            case 'default':
              removeClassStyles();
              buttonOptions.style = 'default';
              buttonOptions.type = 'default';
              break;
          }
          self.updated(buttonOptions);
        }
      });
      observer.observe(this.element.nativeElement, {
        attributes: true,
        attributeFilter: ['soho-button']
      }
      );
    });
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.button) {
        this.button.destroy();
        this.button = null;
      }
    });
  }

  get hasIcon() {
    return (this.icon || (this.buttonOptions.toggleOnIcon && this.buttonOptions.toggleOffIcon)) && (this.iconAlign !== 'end');
  }

  get hasIconEnd() {
    return (this.icon || (this.buttonOptions.toggleOnIcon && this.buttonOptions.toggleOffIcon)) && (this.iconAlign === 'end');
  }

  get currentIcon() {
    if (this.isToggle && this.buttonOptions.toggleOnIcon && this.buttonOptions.toggleOffIcon) {
      return this.isTogglePressed ? this.buttonOptions.toggleOnIcon : this.buttonOptions.toggleOffIcon;
    }

    if (this.toggle) { // eslint-disable-line
      return this.state ? this.icon : this.toggle; // eslint-disable-line
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

  updated(settings?: SohoButtonOptions) {
    if (settings) {
      this._buttonOptions = Soho.utils.mergeSettings((this.element as any)[0], settings, this._buttonOptions);
    }

    this.ngZone.runOutsideAngular(() => {
      if (this.button) {
        this.button.updated(this._buttonOptions);
      }
    });
  }
}
