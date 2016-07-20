import { Component, OnInit } from '@angular/core';
import { TOOLBAR_COMPONENTS} from '../';

@Component({
    moduleId: module.id,
    selector: 'soho-toolbar-demo',
    templateUrl: 'toolbar.demo.html',
    directives: [ TOOLBAR_COMPONENTS ]
})
export class ToolbarDemoComponent implements OnInit {

    private pageTitle: string;
    private sectionTitle: string;
    private buttons: Array<ToolbarButton> = [];
    private searchField: SearchField;

    constructor() {}

    ngOnInit() {

        this.pageTitle = 'Page Title';
        this.sectionTitle = 'Section Title';

        this.searchField = {
            id    : 'Search',
            label : 'Search Something'
        };

        let buttons: Array<ToolbarButton> = [];

        buttons.push({
            id       : 'Create',
            data     : '{\'btn\' : \'create\'}',
            text     : 'Create',
            icon     : '#icon-add',
            cssClass : 'btn-icon'
        });

        buttons.push({
            id       : 'charts-btn',
            data     : '{\'btn\' : \'charts\'}',
            icon     : '#icon-pie-chart',
            cssClass : 'btn-menu',
            menu     : [
                {text : 'Pie Chart'},
                {text : 'Line Chart'},
                {text : 'Bubble Chart'}
            ]
        });

        buttons.push({
            id       : 'update-btn',
            data     : '{\'btn\' : \'update\'}',
            text     : 'Open',
            icon     : '#icon-folder',
            cssClass : 'btn-icon'
        });

        buttons.push({
            id       : 'delete-btn',
            data     : '{\'btn\' : \'delete\'}',
            text     : 'Delete',
            icon     : '#icon-delete',
            cssClass : 'btn-icon'
        });

        buttons.push({
            id       : 'refresh-btn',
            data     : '{\'btn\' : \'refresh\'}',
            text     : 'Refresh',
            icon     : '#icon-refresh',
            cssClass : 'btn-icon'
        });

        this.buttons = buttons;
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
