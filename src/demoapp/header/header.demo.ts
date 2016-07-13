import { Component, HostBinding } from '@angular/core';
// import { HeaderComponent } from '../../components';
import { SoHoButtonComponent } from '../../components';
@Component({
  moduleId: module.id,
  selector: 'soho-header-demo',
  templateUrl: 'header.demo.html',
  // directives: [HeaderComponent]
  directives: [ SoHoButtonComponent ]
})
export class HeaderDemoComponent {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }
}
