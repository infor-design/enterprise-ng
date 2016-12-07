import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'soho-popdown-contents', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopDownContentsComponent {
  @HostBinding('class.popdown') get isPopDownContents() { return true; }
}
