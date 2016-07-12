import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';

export const BUTTON_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  ICON: 'icon',
};

// List of valid buton types.
const BUTTON_TYPE_LIST = [
  BUTTON_TYPES.ICON,
  BUTTON_TYPES.PRIMARY,
  BUTTON_TYPES.SECONDARY,
  BUTTON_TYPES.TERTIARY
];

@Component({
  moduleId: module.id,
  selector: 'button[soho-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoHoButtonComponent implements AfterViewInit, OnDestroy {
  private jQueryElement: any;
  private button: any;
  private buttonType: any;

  @Input('soho-button') set sohoButton(type: string) {
    if (BUTTON_TYPE_LIST.includes(type)) {
      this.buttonType = type;
    } else if (type) {
      throw Error(`'${type}' is not valid, it must be one of ${BUTTON_TYPE_LIST}.`);
    } else {
      this.buttonType = BUTTON_TYPES.PRIMARY;
    }
  }
  /**
   * The icon to be used
   *  - shows when the state is true if toggle has a value
   */
  @Input() icon: string;
  /**
   * Sets the button type to 'submit' when true
   */
  @Input() isSubmit: boolean = false;
  /**
   * Sets whether the button should have a ripple effect on click
   */
  @Input() ripple: boolean = true;
  /**
   * Binary state (toggle):
   *  0 - shows toggle
   *  1 - shows icon (default)
   */
  @Input() state: boolean = true;
  /**
   * The icon to be used when the state is false
   */
  @Input() toggle: string;

  @HostBinding('class.btn-primary') get btnPrimary() { return this.buttonType === BUTTON_TYPES.PRIMARY; };
  @HostBinding('class.btn-secondary') get btnSecondary(): boolean { return this.buttonType === BUTTON_TYPES.SECONDARY; };
  @HostBinding('class.btn-tertiary') get btnTertiary(): boolean { return  this.buttonType === BUTTON_TYPES.TERTIARY; };
  @HostBinding('class.btn-icon') get btnIcon(): boolean { return this.buttonType === BUTTON_TYPES.ICON; };
  @HostBinding('class.no-ripple') get noRipple(): boolean { return !this.ripple; };
  @HostBinding('attr.type') type = this.isSubmit ? 'submit' : 'button';
  @HostListener('click') toggleState() {
    this.state = !this.state;
  }

  constructor(private element: ElementRef) {}
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.button();
    this.button = this.jQueryElement.data('button');
  }
  ngOnDestroy() {
    this.button.destroy();
  }
  get currentIcon() {
    if (!this.toggle) {
      return this.icon;
    }
    return this.state ? this.icon : this.toggle;
  }
}
