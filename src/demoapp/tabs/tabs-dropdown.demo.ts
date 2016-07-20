import { Component } from '@angular/core';
import { TABS_COMPONENTS } from '../';

@Component({
  moduleId: module.id,
  selector: 'tabs-dropdown-demo',
  templateUrl: './tabs-dropdown.demo.html',
  directives: [ TABS_COMPONENTS ]
})
export class TabsDropdownDemoComponent { }
