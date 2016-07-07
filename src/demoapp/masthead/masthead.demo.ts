import { Component, HostBinding } from "@angular/core";

@Component({
  selector: 'soho-masthead',
  templateUrl: '/demoapp/masthead/masthead.demo.html',
  styles: [`
    :host {
      display: block;
    }       
  `]
})
export class MastheadDemo{
  @HostBinding('class') get classes() {
    return 'masthead';
  }
}
