import {
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'use', // eslint-disable-line
  template: ``
})
export class SohoIconUseComponent {
  @HostBinding('attr.href') get href(): string {
    return '#' + this.icon;
  }

  @Input() icon?: string;
}

@Component({
  selector: 'svg[soho-icon]',  // eslint-disable-line
  template: `<svg:use [icon]="icon"></svg:use>`
})
export class SohoIconComponent {

  @HostBinding('class.icon') isIcon = true;
  @HostBinding('attr.aria-hidden') ariaHidden = true;
  @HostBinding('attr.focusable') focusable = false;
  @HostBinding('attr.role') role = 'presentation';
  @Input() @HostBinding('class.icon-empty-state') isEmptyState = false;

  /**
   * Extra class that will be placed on the soho-icon element.
   * Useful to set emerald06-color azure10-color to change the icon color.
   */
  @Input() set extraIconClass(extraIconClass: string) {
    this._extraIconClass = extraIconClass;
    this.setExtraIconsClass();
  }
  @Input() set alert(alert: boolean | undefined) {
    this._alert = alert;
    this.setAlertIcon();
  }

  get alert(): boolean | undefined {
    return this._alert;
  }

  @Input() set icon(icon: string | undefined) {
    this._icon = icon ? 'icon-' + icon : '';
    this.setAlertIcon();
  }

  get icon(): string | undefined {
    return this._icon;
  }

  private _alert?: boolean;
  private _icon?: string;
  private _extraIconClass?: string;

  constructor(
    private elementRef: ElementRef,
  ) { }

  private setAlertIcon() {
    // This allows us to set a dynamic class to the class list
    // w/o overwriting other classes in the class list.
    if (this.alert && this.icon) {
      this.elementRef.nativeElement.classList.add(this.icon);
    }
  }

  private setExtraIconsClass() {
    if (this._extraIconClass) {
      this.elementRef.nativeElement.classList.add(this._extraIconClass);
    }
  }
}
