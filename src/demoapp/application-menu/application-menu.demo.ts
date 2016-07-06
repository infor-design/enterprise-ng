///<reference path="../../../typings/index.d.ts" />

import {Component, HostBinding} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
  selector: 'soho-application-menu',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/demoapp/application-menu/application-menu.demo.html'
})
export class ApplicationMenuDemo
{
  @HostBinding('id') get id() {
    return 'application-menu';
  }

  @HostBinding('class') get classes() {
    return 'application-menu is-open no-transition';
  }
}
