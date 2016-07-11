import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
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
  @Input('soho-button') set sohoButton(type: string) {
    if (type) {
      this.buttonType = type;
    } else {
      this.buttonType = BUTTON_TYPES.PRIMARY;
    }
  }
  @Input() icon: string;
  @Input() ripple: boolean = true;
  @Input() isSubmit: boolean = false;

  get buttonClass() {
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

  private jQueryElement: any;
  private button: any;
  private buttonType: any;

  constructor(private element: ElementRef) {}
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.button();
    this.button = this.jQueryElement.data('button');
  }
  ngOnDestroy() {
    this.button.destroy();
  }
}
