import { Component, HostBinding } from '@angular/core';
import { HeaderComponent } from '../../components';
@Component({
  moduleId: module.id,
  selector: 'soho-header-demo',
  templateUrl: 'header.demo.html'
  // directives: [HeaderComponent]
})
export class HeaderDemo
{
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }
}
