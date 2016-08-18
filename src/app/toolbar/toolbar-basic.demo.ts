import { Component, OnInit } from '@angular/core';
import { SohoButtonComponent } from '../../components/button';
import { SOHO_TOOLBAR_DIRECTIVES } from '../../components/toolbar';

@Component({
  selector: 'soho-toolbar-basic-demo',
  templateUrl: 'toolbar-basic.demo.html',
  directives: [ SOHO_TOOLBAR_DIRECTIVES, SohoButtonComponent ]
})
export class ToolbarBasicDemoComponent implements OnInit {
  private headerToolbar: boolean;
  private pageTitle: string;
  private sectionTitle: string;

  constructor() {}

  ngOnInit() {
    this.headerToolbar = false;
    this.pageTitle = 'Toolbar Demos';
    this.sectionTitle = 'Basic Toolbar Demo';
  }
}
