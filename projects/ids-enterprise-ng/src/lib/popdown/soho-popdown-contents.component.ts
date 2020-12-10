import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'soho-popdown-contents', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopDownContentsComponent {
  @HostBinding('class.popdown') get isPopDownContents() {
 return true;
}
}
