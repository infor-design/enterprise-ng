import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';

/**
 * Supported button types.
 */
export type SohoButtonType = 'primary' | 'secondary' | 'tertiary' | 'icon';

@Component({
  selector: 'button[soho-button]', // tslint:disable-line
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoButtonComponent implements AfterViewInit, OnDestroy {

  // -------------------------------------------
  // Supported button types.
  // -------------------------------------------

  static PRIMARY: SohoButtonType = 'primary';
  static SECONDARY: SohoButtonType = 'secondary';
  static TERTIARY: SohoButtonType = 'tertiary';
  static ICON: SohoButtonType = 'icon';

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  private jQueryElement: any;

  /**
   * Reference to the Soho control api.
   */
  private button: any;

  /**
   * The type of the button.
   */
  private buttonType: SohoButtonType;

  /**
   * The type of the button, defaulting to 'secondary'.
   */
  @Input('soho-button') set sohoButton(type: SohoButtonType) {
    this.buttonType = type ? type : SohoButtonComponent.SECONDARY;
  }
  /**
   * The icon to be used
   *  - shows when the state is true if toggle has a value
   */
  @Input() icon: string;

  /**
   * Sets the button type to 'submit' when true
   */
  @Input() isSubmit = false;

  /**
   * Sets whether the button should have a ripple effect on click
   */
  @Input() ripple = true;

  /**
   * Binary state (toggle):
   *  0 - shows toggle
   *  1 - shows icon (default)
   */
  @Input() state = true;

  /**
   * The icon to be used when the state is false.
   */
  @Input() toggle: string;

  @HostBinding('class.btn-primary')
  get btnPrimary() {
    return this.buttonType === SohoButtonComponent.PRIMARY;
  };

  @HostBinding('class.btn-secondary')
  get btnSecondary() {
    return this.buttonType === SohoButtonComponent.SECONDARY;
  };

  @HostBinding('class.btn-tertiary')
  get btnTertiary(): boolean {
    return this.buttonType === SohoButtonComponent.TERTIARY;
  };

  @HostBinding('class.btn-icon')
  get btnIcon(): boolean {
    return this.buttonType === SohoButtonComponent.ICON;
  };

  @HostBinding('class.no-ripple')
  get noRipple(): boolean {
    return !this.ripple;
  };

  @HostBinding('attr.type') type = this.isSubmit ? 'submit' : 'button';

  @HostListener('click') toggleState() {
    this.state = !this.state;
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.button();
    this.button = this.jQueryElement.data('button');
  }

  ngOnDestroy() {
    if (this.button) {
      this.button.destroy();
      this.button = null;
    }
  }

  get currentIcon() {
    if (!this.toggle) {
      return this.icon;
    }
    return this.state ? this.icon : this.toggle;
  }
}
