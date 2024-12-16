import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApplicationMenuLazyService } from './application-menu-lazy-service.demo';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'application-menu-lazy-menu',
    templateUrl: 'application-menu-lazy-menu.demo.html',
    standalone: false
})
export class ApplicationMenuLazyMenuDemoComponent {

  @Input() menuSpec?: Array<any>;

  @Output() subMenuLoaded: EventEmitter<any> = new EventEmitter<any>();
  private menuExpanded: boolean | undefined = false;

  constructor(private _lazyMenuService: ApplicationMenuLazyService) { }

  public onLazyMenuClicked($event: any) {
    const element = $event.currentTarget;

    this.menuExpanded = this.isExpanded(element);
    this._lazyMenuService.getMenuItems().then((response) => {

      if (!this.menuExpanded) {
        const url = element.getAttribute('data-mock-url');
        this._lazyMenuService.updateMenu(response, url);

        const menuSpec = this._lazyMenuService.getMenuSpec();
        this.subMenuLoaded.emit({ menuSpec, event: $event });
      }
    });
  }

  public isExpanded(button: any): boolean | undefined {
    if (button && button.parentElement.getElementsByTagName('a')[0]) {
      return button.parentElement.getElementsByTagName('a')[0].getAttribute('aria-expanded') === 'true';
    }
  }
  // Recursive call back
  public onSubMenuLoaded(menuObject: any) {
    this.subMenuLoaded.emit({ menuSpec: menuObject.menuSpec, event: menuObject.event });
  }
}
