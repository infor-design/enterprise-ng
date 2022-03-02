import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-searchfield-header',
  templateUrl: 'searchfield-header.demo.html',
})
export class SearchFieldHeaderDemoComponent {
  @HostBinding('class.header') get isHeader() {
    return true;
  }
  @HostBinding('class.is-personalizable') get isPersonalizable() {
    return true;
  }
}
