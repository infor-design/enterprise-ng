import {
  Component,
  AfterViewInit,
  HostBinding,
  ElementRef
} from '@angular/core';

import {
  SoHoButtonComponent
} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-header',
  templateUrl: 'header.component.html',
  directives: [ SoHoButtonComponent ]
})
export class HeaderComponent implements AfterViewInit {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // ngAfterViewInit lifecycle event - called after Angular creates the component's view(s).
    // meaning the content is in the DOM and it's ok to run jQuery against it

    let $toolbarElement: any = jQuery('.toolbar');
    $toolbarElement.toolbar();

    let $applicationMenuElement: any = $('.application-menu');
    $applicationMenuElement.applicationmenu({triggers: [jQuery('.application-menu-trigger')]});
  }
}
