import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {ToolbarDataDrivenDemoService} from './toolbar-datadriven-demo.service';

@Component({
    selector: 'soho-toolbar-datadriven-demo',
    templateUrl: './toolbar-datadriven.demo.html',
    providers: [ToolbarDataDrivenDemoService]
})
export class ToolbarDataDrivenDemoComponent implements OnInit {

  @ViewChild('sohoToolbar') sohoToolbar: any;

  public pageTitle: string;
  public sectionTitle: string;
  public buttons: Array<ToolbarButton> = [];
  public searchField: SearchField;
  public actionsLoaded = false;
  public inHeader = false;

  constructor(private toolbarDataDrivenDemoService: ToolbarDataDrivenDemoService) {}

  ngOnInit() {

    this.pageTitle = 'Page Title';
    this.sectionTitle = 'Data Driven Toolbar';

    this.searchField = {
        id    : 'Search',
        label : 'Search Something'
    };

    this.buttons = this.buildToolbarButtonArray();
  }

  // Lazy loading example
  onMenuItemMouseOver(event: HTMLButtonElement) {
    const button = JSON.parse(event[0].dataset.action);

    if (button.btn === 'actions' && !this.actionsLoaded) {
       this.toolbarDataDrivenDemoService.getToolbarData().then( (items: any) => {
        this.buttons[this.buttons.length - 1].menu = items.data;
        this.actionsLoaded = true;

         // TODO: this does not work properly
         // Update toolbar after new data items have been retrieved
         setTimeout(() => { this.updated(); }, 1);
       });
    }
  }

  onSelected(event: SohoToolbarSelectedEvent) {
    const data = event.item[0].dataset.action;
    $('body').toast({
      title: 'Selected',
      message : '' + data
    });
  }

  private buildToolbarButtonArray(): Array<ToolbarButton> {
    const buttons: Array<ToolbarButton> = [];

    buttons.push({
      id       : 'Create',
      data     : '{"btn" : "create"}',
      text     : 'Create',
      icon     : 'add',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'Create Menu',
      data     : '{"btn" : "create"}',
      icon     : 'add',
      text     : 'Create',
      cssClass : 'btn-icon',
      menu     : [
        {id: 'create 1',    text: 'Create 1',    data: '{\'menu\': \'create1\'}'},
        {id: 'create 2',   text: 'Create 2',   data: '{\'menu\': \'create2\'}'},
      ]
    });

    buttons.push({
      id       : 'charts-btn',
      data     : '{"btn" : "charts"}',
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
      data     : '{"btn" : "open"}',
      text     : 'Open',
      icon     : 'folder',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'delete-btn',
      data     : '{"btn" : "delete"}',
      text     : 'Delete',
      icon     : 'delete',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'refresh-btn',
      data     : '{"btn" : "refresh"}',
      text     : 'Refresh',
      icon     : 'refresh',
      cssClass : 'btn-icon'
    });

    buttons.push({
      id       : 'actions-btn',
      data     : '{"btn" : "actions"}',
      text     : 'Actions',
      cssClass : 'btn-menu',
      menu     : [{'label': 'Loading...'}]
    });

    return buttons;
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
