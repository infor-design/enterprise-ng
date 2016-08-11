import { Component } from '@angular/core';
import {
  TOOLBAR_DIRECTIVES,
  SohoButtonComponent
} from '../.';

@Component({
  moduleId: module.id,
  selector: 'toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html',
  directives: [ TOOLBAR_DIRECTIVES, SohoButtonComponent ]
})
export class ToolbarBasicDemoComponent {
  private headerToolbar: boolean = false;
  private pageTitle: string = 'Toolbar Demos';
  private sectionTitle: string = 'Basic Toolbar Demo';
}
