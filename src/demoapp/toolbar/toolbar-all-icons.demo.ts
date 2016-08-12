import { Component } from '@angular/core';
import { TOOLBAR_DIRECTIVES, SohoButtonComponent } from '../.';

@Component({
  moduleId: module.id,
  selector: 'toolbar-all-icons-demo',
  templateUrl: 'toolbar-all-icons.demo.html',
  directives: [ TOOLBAR_DIRECTIVES, SohoButtonComponent ]
})
export class ToolbarAllIconsDemoComponent {}
