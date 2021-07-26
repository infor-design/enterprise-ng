import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnInit,
} from '@angular/core';

@Component({
  selector: '[soho-notification-badge]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoNotificationBadgeComponent implements OnInit {
  private jQueryElement!: JQuery;
  private notificationBadge?: SohoNotificationBadge;
  private options?: SohoNotificationBadgeOptions = {};

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) {

  }
  @Input() set position(position: string | undefined) {
    (this.options as any).position = position;
    if (this.notificationBadge) {
      this.notificationBadge.settings.position = position;
    }
  }
  get position(): string | undefined {
    if (this.notificationBadge) {
      return this.notificationBadge.settings.position;
    }

    return (this.options as any).position;
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {

      this.jQueryElement = jQuery(this.element.nativeElement);

      const options: SohoNotificationBadgeOptions = {
        position: this.position,
      };

      this.jQueryElement.notificationbadge(options);
      console.log({
        jq: this.jQueryElement,
        el: this.element
      });
    });
  }
}
