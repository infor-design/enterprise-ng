import { Component } from '@angular/core';
import { SohoButtonComponent } from '../../components/button';
import { TOOLBAR_DIRECTIVES } from '../../components/toolbar';

@Component({
  selector: 'toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html',
  directives: [ TOOLBAR_DIRECTIVES, SohoButtonComponent ]
})
export class ToolbarBasicDemoComponent {
  private headerToolbar: boolean = false;
  private pageTitle: string = 'Toolbar Demos';
  private sectionTitle: string = 'Basic Toolbar Demo';
}
