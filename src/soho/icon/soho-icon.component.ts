import {
  Component,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'svg:use', // tslint:disable-line
  template: ``
})

export class SohoIconUseComponent {
  @HostBinding('attr.xmlns:xlink') xmlnsXlink: string = 'http://www.w3.org/1999/xlink';
  @HostBinding('attr.xlink:href') @Input() icon: string;
}

@Component({
  selector: 'svg[soho-icon]',  // tslint:disable-line
  template: `<svg:use [icon]="icon"></svg:use>`
})
export class SohoIconComponent {

  private _icon: string;

  @HostBinding('attr.aria-hidden') ariaHidden: boolean = true;
  @HostBinding('attr.focusable') focusable: boolean = false;
  @HostBinding('attr.role') role: string = 'presentation';
  @HostBinding('attr.class') hostClass: string;

  @Input() alert: boolean;
  @Input() set icon(icon: string) {
    this._icon = icon ? '#icon-' + icon : '';
    this.hostClass = this.svgClass(icon);
  };

  get icon(): string {
    return this._icon;
  }

  private svgClass(icon: string) {
    let classStr  = 'icon';
    if (this.alert) {
      classStr += ' icon-' + icon;
    }

    return classStr;
  }
}
