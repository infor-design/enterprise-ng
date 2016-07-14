import {
  Component,
  HostBinding,
  Output,
  EventEmitter,
  ElementRef,
  Input
} from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'soho-application-menu',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'application-menu.component.html'
})
export class ApplicationMenuComponent {
  @HostBinding('class') get classes() {
    return 'application-menu';
  }
}