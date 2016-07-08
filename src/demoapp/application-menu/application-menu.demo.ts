import { Component, HostBinding } from "@angular/core";
import { ROUTER_DIRECTIVES } from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'soho-application-menu',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'application-menu.demo.html'
})
export class ApplicationMenuDemo
{
  @HostBinding('class') get classes() {
    return 'application-menu is-open no-transition';
  }
}
