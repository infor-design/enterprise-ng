///<reference path="../../../typings/index.d.ts" />

import { Component, AfterViewInit, HostBinding } from "@angular/core";

@Component({
  selector: 'soho-header',
  templateUrl: '/demoapp/header/header.demo.html',
})
export class HeaderDemo implements AfterViewInit
{
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }

  ngAfterViewInit()
  {
    // ngAfterViewInit lifecycle event - called after Angular creates the component's view(s).
    // meaning the content is in the DOM and it's ok to run jQuery against it
    let $toolbarElement:any = $('.toolbar');
    $toolbarElement.toolbar();

    let $applicationMenuElement:any = $('#application-menu');
    $applicationMenuElement.applicationmenu({triggers: [$('.application-menu-trigger')]});
  }
}
