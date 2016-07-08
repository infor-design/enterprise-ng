import { Component, HostBinding, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'soho-masthead',
  templateUrl: 'masthead.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MastheadComponent{
  @HostBinding('class') get classes() {
    return 'masthead';
  }

  @Input() ariaLabel:string = "Go To Home UI Test Suite";
}
