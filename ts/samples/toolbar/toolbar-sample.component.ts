
import {Component, OnInit, Input} from '@angular/core';
import {fixXlinkHrefs} from '../../fix-xlink-refs';
import {SohoToolbarComponent, ToolbarOptions, ToolbarButton} from '../../components/index';

@Component({
    selector : 'toolbar-sample-component',
    directives : [SohoToolbarComponent],
    template :
    `
        <soho-toolbar-component 
            class="toolbar has-title-button"
            [toolbarOptions]="toolbarOptions"
            (toolbarLoaded)="onToolbarLoaded($event)"
            (toolbarButtonClicked)="onToolbarButtonClicked($event)"
            (toolbarMenuItemClicked)="onToolbarMenuItemClicked($event)">
        </soho-toolbar-component>
    `
})

export class ToolbarSampleComponent implements OnInit
{
    @Input() toolbarOptions:ToolbarOptions = {};

    constructor(){}

    ngOnInit()
    {
        this.buildToolbar();
    }

    private onToolbarLoaded()
    {
        console.log('@ToolbarSampleComponent - > toolbar loaded');
        fixXlinkHrefs();
    }

    private onToolbarButtonClicked()
    {
        console.log('@ToolbarSampleComponent - > button clicked');
    }

    private onToolbarMenuItemClicked()
    {
        console.log('@ToolbarSampleComponent - > menu item clicked');
    }

    private buildToolbar():void
    {
        let toolbarOptions:ToolbarOptions =
        {
            sectionTitle : 'Soho Toolbar Component',
            pageTitle : 'Test Toolbar',
            buttons :
            [
                {
                    id : 'create-btn',
                    data : "{'btn' : 'create'}",
                    label : "Create New",
                    icon : '#icon-add',
                    class: 'btn-icon'
                },
                {
                    id : 'charts-btn',
                    data : "{'btn' : 'charts'}",
                    icon : '#icon-pie-chart',
                    class : 'btn-menu',
                    isMenu : true,
                    menu :
                    [
                        {label : "Pie Chart"},
                        {label : "Line Chart"},
                        {label : "Bubble Chart"}
                    ]
                },
                {
                    id : 'update-btn',
                    data : "{'btn' : 'update'}",
                    label : "Open",
                    icon : '#icon-folder',
                    class: 'btn-icon'
                },
                {
                    id : 'delete-btn',
                    data : "{'btn' : 'delete'}",
                    label : "Delete",
                    icon : '#icon-delete',
                    class: 'btn-icon'
                },
                {
                    id : 'refresh-btn',
                    data : "{'btn' : 'refresh'}",
                    label : "Refresh",
                    icon : '#icon-refresh',
                    class: 'btn-icon'
                }
            ],
            maxVisibleButtons : 3,
            isHeaderToolbar : false
        };

        this.toolbarOptions = toolbarOptions;
    }
}