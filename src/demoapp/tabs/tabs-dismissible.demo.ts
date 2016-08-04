import { Component } from '@angular/core';
import { TABS_COMPONENTS } from '../';

@Component({
  moduleId: module.id,
  selector: 'tabs-dismissible-demo',
  templateUrl: './tabs-dismissible.demo.html',
  directives: [ TABS_COMPONENTS ]
})
export class TabsDismissibleDemoComponent { }
