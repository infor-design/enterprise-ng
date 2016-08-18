import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { SOHO_TOOLBAR_DIRECTIVES } from '../../components/toolbar';
import { SohoButtonComponent } from '../../components/button';
import { SohoMenuButtonComponent } from '../../components/menu-button';

@Component({
    selector: 'toolbar-datadriven-demo',
    templateUrl: 'toolbar-datadriven.demo.html',
    directives: [
      SOHO_TOOLBAR_DIRECTIVES,
      SohoButtonComponent,
      SohoMenuButtonComponent
    ]
})
export class ToolbarDataDrivenDemoComponent implements OnInit {

  @ViewChild('sohoToolbar') sohoToolbar: any;

  private pageTitle: string;
  private sectionTitle: string;
  private buttons: Array<ToolbarButton> = [];
  private searchField: SearchField;

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {

      this.pageTitle = 'Page Title';
      this.sectionTitle = 'Data Driven Toolbar';

      this.searchField = {
          id    : 'Search',
          label : 'Search Something'
      };

      let buttons = this.buildToolbarButtonArray();
      this.buttons = buttons;

      // Mock dynamically loading a button menu
      let self: ToolbarDataDrivenDemoComponent = this;
      setTimeout(function () {

        // Add a new menu
        self.addNewMenu();

        // Force template to update
        self._changeDetectorRef.detectChanges();

        // Update toolbar
        self.updated();

      }, 100);
  }

  private buildToolbarButtonArray(): Array<ToolbarButton> {
    let buttons: Array<ToolbarButton> = [];

    buttons.push({
      id       : 'Create',
      data     : '{\'btn\' : \'create\'}',
      text     : 'Create',
      icon     : 'add',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'charts-btn',
      data     : '{\'btn\' : \'charts\'}',
      icon     : 'pie-chart',
      cssClass : 'btn-menu',
      menu     : [
        {id: 'pie',    text: 'Pie Chart',    data: '{\'menu\': \'pie\'}'},
        {id: 'line',   text: 'Line Chart',   data: '{\'menu\': \'line\'}'},
        {id: 'bubble', text: 'Bubble Chart', data: '{\'menu\': \'bubble\'}'}
      ]
    });

    buttons.push({
      id       : 'update-btn',
      data     : '{\'btn\' : \'update\'}',
      text     : 'Open',
      icon     : 'folder',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'delete-btn',
      data     : '{\'btn\' : \'delete\'}',
      text     : 'Delete',
      icon     : 'delete',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'refresh-btn',
      data     : '{\'btn\' : \'refresh\'}',
      text     : 'Refresh',
      icon     : 'refresh',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'actions-btn',
      data     : '{\'btn\' : \'actions\'}',
      text     : 'Actions',
      cssClass : 'btn-menu'
    });

    return buttons;
  }

  private addNewMenu() {

    let menu = [
      {id: 'sub-one',   text: 'Sub One',   data: '{\'menu\': \'pie\'}'},
      {id: 'sub-two',   text: 'Sub Two',   data: '{\'menu\': \'line\'}'},
      {id: 'sub-three', text: 'Sub Three', data: '{\'menu\': \'bubble\'}'}
    ];

    this.buttons[this.buttons.length - 1].menu = menu;
  }

  private updated() {
    this.sohoToolbar.updated();
  }
}

interface ToolbarButton {
    id       ?: string;
    cssClass ?: string;
    text     ?: string;
    icon     ?: string;
    data     ?: string;
    menu     ?: any;
}

interface SearchField {
    id    ?: string;
    label ?: string;
    data  ?: string;
}
