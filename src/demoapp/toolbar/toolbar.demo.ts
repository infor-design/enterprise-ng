import { Component, OnInit } from '@angular/core';
import { TOOLBAR_COMPONENTS, ToolbarButton, SearchField} from '../';

@Component({
    moduleId: module.id,
    selector: 'soho-toolbar-demo',
    templateUrl: 'toolbar.demo.html',
    directives: [ TOOLBAR_COMPONENTS ]
})
export class ToolbarDemo implements OnInit {

    private pageTitle:string = "Page Title";
    private sectionTitle:string = "Section Title";
    private buttons:Array<ToolbarButton> = [];
    private searchField:SearchField;

    constructor() { }

    ngOnInit()
    {
        this.searchField =
        {
            id    : 'Search',
            label : 'Search Something'
        };

        let buttons:Array<ToolbarButton> = [];

        buttons.push({
            id   : 'Create',
            data : "{'btn' : 'create'}",
            text : "Create",
            icon : '#icon-add',
            class: 'btn-icon'
        });

        buttons.push({
            id    : 'charts-btn',
            data  : "{'btn' : 'charts'}",
            icon  : '#icon-pie-chart',
            class : 'btn-menu',
            menu  :
                [
                    {text : "Pie Chart"},
                    {text : "Line Chart"},
                    {text : "Bubble Chart"}
                ]
        });

        buttons.push({
            id   : 'update-btn',
            data : "{'btn' : 'update'}",
            text : "Open",
            icon : '#icon-folder',
            class: 'btn-icon'
        });

        buttons.push({
            id   : 'delete-btn',
            data : "{'btn' : 'delete'}",
            text : "Delete",
            icon : '#icon-delete',
            class: 'btn-icon'
        });

        buttons.push({
            id   : 'refresh-btn',
            data : "{'btn' : 'refresh'}",
            text : "Refresh",
            icon : '#icon-refresh',
            class: 'btn-icon'
        });

        this.buttons = buttons;
    }

}
