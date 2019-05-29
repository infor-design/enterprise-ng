import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'svg:use', // tslint:disable-line
  template: ``
})
export class SohoIconUseComponent {
  @HostBinding('attr.xmlns:xlink') xmlnsXlink = 'http://www.w3.org/1999/xlink';
  @HostBinding('attr.xlink:href') get href(): string {
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
    private renderer: Renderer2
  ) {}

  private setAlertIcon() {
    // This allows us to set a dynamic class to the class list
    // w/o overwriting other classes in the class list.
    if (this.alert && this.icon) {
      this.renderer.addClass(this.elementRef.nativeElement, this.icon);
    }
  }

  private setExtraIconsClass() {
    if (this._extraIconClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this._extraIconClass);
    }
  }

  get alert(): boolean { return this._alert; }
  get icon(): string { return this._icon; }
}
