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
    if (type) {
      this.buttonType = type;
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

  @HostBinding('class') get buttonClass() {
    const classes: string[] = [];
    if (this.buttonType) {
      classes.push(`btn-${this.buttonType}`);
    }
    if (!this.ripple) {
      classes.push('no-ripple');
    }
    return classes.join(' ');
  }
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
