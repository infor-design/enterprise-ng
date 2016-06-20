import {
    ChangeDetectorRef, Component, DoCheck, ElementRef, EventEmitter,
    Input, KeyValueDiffers, Output, ViewChild
} from '@angular/core';

@Component({
    selector : 'soho-toolbar-component',
    template :
        `
        <div class="title">
            <template [ngIf]="toolbarOptions.isHeaderToolbar">
                <button class="btn-icon application-menu-trigger" type="button">
                    <span class="audible">Show navigation</span>
                    <span class="icon app-header">
                        <span class="one"></span>
                        <span class="two"></span>
                        <span class="three"></span>
                    </span>
                </button>
                <h1 class='titleHeader'>
                    <span class='page-title'>{{toolbarOptions.pageTitle}}</span>
                    <span class='section-title'>{{toolbarOptions.sectionTitle}}</span>
                </h1>
            </template>
            <template [ngIf]="!toolbarOptions.isHeaderToolbar">
            {{toolbarOptions.sectionTitle}}
            </template>
        </div>

        <div class="buttonset" #buttonSet>
            <label *ngIf="toolbarOptions.search" class="audible" attr.for="{{toolbarOptions.search.id}}">{{toolbarOptions.search.label}}</label>
            <input *ngIf="toolbarOptions.search" class="searchfield" placeholder="{{toolbarOptions.search.label}}" id="{{toolbarOptions.search.id}}" name="{{toolbarOptions.search.label}}" />
            
            <template ngFor let-button [ngForOf]="toolbarOptions.buttons">
                
                <!-- button menu -->
                <button *ngIf="button.isMenu" [ngClass]="{hide : !button.label}" (click)="onToolbarButtonClicked($event)" id="{{button.id}}" class="{{button.class}}" title="{{button.tooltip}}" type="button" [attr.data-button]="button.data">
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" attr.xlink:href="{{button.icon}}"></use>
                    </svg>
                    <span>{{button.label}}</span>
                    <svg class="icon icon-dropdown">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dropdown"></use>
                    </svg>
                </button>
                
                <!-- standard button -->
                <button *ngIf="!button.isMenu" (click)="onToolbarButtonClicked($event)" id="{{button.id}}" class="{{button.class}}" type="button" [attr.data-button]="button.data">
                    <svg class="icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" attr.xlink:href="{{button.icon}}"></use>
                    </svg>
                    <span>{{button.label}}</span>
                </button>
                
                <ul *ngIf="button.isMenu" class="popupmenu">
                    <li *ngFor="let item of button.menu" id="{{item.id}}" [attr.data-button]="button.data" (click)="onToolbarMenuItemClicked($event)">
                        <a href="{{item.url}}">{{item.label}}</a>
                    </li>
                </ul>
            </template>
        </div>
    `,
    styles :
        [`
        :host {display:block;}
        button.hide span {display: none;}
    `]
})

export class SohoToolbarComponent implements DoCheck
{
    // Provide a reference to the buttonSet
    // used for getting data information form buttons
    // to toggle visibility, disable, and enable
    @ViewChild('buttonSet') buttonSet;

    // Input options
    @Input() toolbarOptions:ToolbarOptions = {};

    // Output Events
    @Output() toolbarLoaded:EventEmitter<boolean> = new EventEmitter();
    @Output() toolbarButtonClicked:EventEmitter<any> = new EventEmitter();
    @Output() toolbarMenuItemClicked:EventEmitter<String> = new EventEmitter();

    private settings:any;
    private toolbar:any;
    private differ: any;
    private eventsBound:boolean = false;

    constructor(
        private elementRef:ElementRef,
        private differs:KeyValueDiffers,
        private changeDetectorRef: ChangeDetectorRef
    ){
        this.differ = differs.find({}).create(null);
    }

    ngDoCheck()
    {
        let changes = this.differ.diff(this.toolbarOptions);

        if (changes)
        {
            console.log("@SohoToolbarComponent -> ngDoCheck(): toolbarOptions changed - rebuilding toolbar");

            this.changeDetectorRef.detectChanges();
            this.build();

            // Make sure events are only bound once
            if(!this.eventsBound)
            {
                this.handleEvents();
                this.eventsBound = true;
            }
        }
    }

    private build()
    {
        console.log("@SohoToolbarComponent -> build()");

        this.initialize();
        this.buildToolbar();
        this.toolbarLoaded.emit(true);
    }

    private initialize(options?:any)
    {
        var defaults:Object = {maxVisibleButtons: this.toolbarOptions.maxVisibleButtons};
        this.settings = $.extend({}, defaults, options);
    }

    private buildToolbar():void
    {
        // Reset the icon-dropdown xlink path to a relative path
        // This will prevent toolbar re-init from creating a duplicate icon
        // This is related to the other base-href svg icon path issues
        if(this.toolbar)
        {
            $(this.toolbar.element).find('svg.icon-dropdown').children('use').attr('xlink:href', '#icon-dropdown');
        }

        this.toolbar = $(this.elementRef.nativeElement).toolbar(this.settings).data('toolbar');
    }

    private handleEvents()
    {
        // Init Application Menu
        // if the toolbar is in the header
        if(this.toolbarOptions.isHeaderToolbar)
        {
            $('#application-menu').applicationmenu({triggers: [$('.application-menu-trigger')]});
        }

        // Click for button menu items added via jquery
        let self:SohoToolbarComponent = this;
        this.toolbar.element.on('click', '.popupmenu', function(e)
        {
            let target = e.target;

            if($(e.target).is('a'))
                target = $(e.target).parent();

            let buttonElementRef:ElementRef = new ElementRef(target[0]);
            self.toolbarButtonClicked.emit({buttonElementRef: buttonElementRef});
        });

        // Click for overflow menu items added via jquery
        this.toolbar.element.on('click', function(e)
        {
            let target = e.target;

            if($(e.target).is('a'))
                target = $(e.target).parent();

            let buttonElementRef:ElementRef = new ElementRef(target[0]);
            self.toolbarButtonClicked.emit({buttonElementRef: buttonElementRef});
        });
    }

    // click for toolbar buttons added via angular template
    public onToolbarButtonClicked(event)
    {
        let buttonElementRef:ElementRef = new ElementRef(event.currentTarget);
        this.toolbarButtonClicked.emit({buttonElementRef: buttonElementRef});
    }

    // click for menu items added via angular template
    public onToolbarMenuItemClicked(event)
    {
        var id = event.currentTarget.id;
        this.toolbarMenuItemClicked.emit(id);
    }
}

export interface ToolbarOptions
{
    sectionTitle      ?: string;
    pageTitle         ?: string;
    buttons           ?: Array<ToolbarButton>
    maxVisibleButtons ?: number;
    isHeaderToolbar   ?: boolean;
    differ            ?: boolean;
    search            ?:
        {
            id         ?: string;
            label      ?: string;
            data       ?: string;
            isSearch   ?: boolean;
        };
}

export interface ToolbarButton
{                                    // EXAMPLE
    id      ?:string;                // 'btn-id'
    data    ?:string;                // {'property' : 'value'}
    label   ?:string;                // 'Search'
    icon    ?:string;                //#icon-search
    class   ?:string;                // 'btn'
    isMenu  ?:boolean;               // Create popupmenu <ul> for menu
    menu    ?:Array<ToolbarButton>;  // Dropdown menu items
    url     ?:string;                // Url for href
}