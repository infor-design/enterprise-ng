import {
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'use', // tslint:disable-line
  template: ``
})
export class SohoIconUseComponent {
  @HostBinding('attr.href') get href(): string {
    return '#' + this.icon;
  }

  @Input() icon: string;
}

@Component({
  selector: 'svg[soho-icon]',  // tslint:disable-line
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
  @Input() set alert(alert: boolean) {
    this._alert = alert;
    this.setAlertIcon();
  }
  @Input() set icon(icon: string) {
    this._icon = icon ? 'icon-' + icon : '';
    this.setAlertIcon();
  }

  private _alert: boolean;
  private _icon: string;
  private _extraIconClass: string;

  constructor(
    private elementRef: ElementRef,
  ) {}

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

  get alert(): boolean { return this._alert; }
  get icon(): string { return this._icon; }
}
