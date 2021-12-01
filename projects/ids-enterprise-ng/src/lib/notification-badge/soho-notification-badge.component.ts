import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  private notificationBadge?: SohoNotificationBadge | null;
  private options?: SohoNotificationBadgeOptions = {};

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

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

  @Input() set color(color: string | undefined) {
    (this.options as any).color = color;
    if (this.notificationBadge) {
      this.notificationBadge.settings.color = color;
    }
  }
  get color(): string | undefined {
    if (this.notificationBadge) {
      return this.notificationBadge.settings.color;
    }

    return (this.options as any).color;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    (this.options as any).attributes = attributes;
    if (this.notificationBadge) {
      this.notificationBadge.settings.attributes = attributes;
    }
  }
  get attributes(): Array<Object> | Object | undefined {
    if (this.notificationBadge) {
      return this.notificationBadge.settings.attributes;
    }

    return (this.options as any).attributes;
  }

  show(): void {
    this.ngZone.runOutsideAngular(() => { 
      this.jQueryElement.find('.notification-dot').removeClass('is-disabled');
    });
  }

  hide(): void {
    this.ngZone.runOutsideAngular(() => { 
      this.jQueryElement.find('.notification-dot').addClass('is-disabled');
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      const options: SohoNotificationBadgeOptions = {
        position: this.position,
        color: this.color,
        attributes: this.attributes
      };

      // Initialize the notification badge component.
      this.jQueryElement.notificationbadge(options);

     });
  }
}
