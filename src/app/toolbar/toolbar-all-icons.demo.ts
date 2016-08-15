import { Component } from '@angular/core';
import { SohoButtonComponent } from '../../components/button';
import { TOOLBAR_DIRECTIVES } from '../../components/toolbar';

@Component({
  selector: 'toolbar-all-icons-demo',
  templateUrl: 'toolbar-all-icons.demo.html',
  directives: [ TOOLBAR_DIRECTIVES, SohoButtonComponent ]
})
export class ToolbarAllIconsDemoComponent {}
