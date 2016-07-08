import {
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from '@angular/core';

declare var jQuery: any;

@Component({
    selector: 'soho-toolbar-title',
    template: `
        <!-- if in the header -->
        <template [ngIf]="inHeader">
             <button class="btn-icon application-menu-trigger" type="button">
                <span class="audible">Show navigation</span>
                <span class="icon app-header">
                    <span class="one"></span>
                    <span class="two"></span>
                    <span class="three"></span>
                </span>
            </button>
            <h1 class='titleHeader'>
                <span class='page-title'>{{pageTitle}}</span>
                <span class='section-title'>{{sectionTitle}}</span>
            </h1>
        </template>
        
        <!-- if not in the header -->
        <template [ngIf]="!inHeader">
            <span class='section-title'>{{sectionTitle}}</span>
        </template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarTitleComponent {

    @Input() inHeader:boolean = false;
    @Input() pageTitle:string;
    @Input() sectionTitle:string;

    @HostBinding('class') hostClasses:string = 'title';

    constructor(){}

    get titleClasses ():string {return this.hostClasses;}
}

@Component({
    selector: 'soho-toolbar-button-set',
    template: `

        <!-- search field -->
        <label *ngIf="searchField" class="audible" attr.for="{{searchField.id}}">
            {{searchField.label}}
        </label>
        <input *ngIf="searchField" class="searchfield" id="{{searchField.id}}" placeholder="{{searchField.label}}" name="{{searchField.label}}"/>
    
        <!-- buttons -->
        <template ngFor let-button [ngForOf]="buttons">
            <button id="{{button?.id}}" class="{{button?.class}}" attr.data-button="{{button?.data}}" type="button">
                <svg class="icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" attr.xlink:href="{{button?.icon}}"></use>
                </svg>
                <span>{{button?.text}}</span>
                <svg *ngIf="button.menu" class="icon icon-dropdown">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-dropdown"></use>
                </svg>
            </button>
        
            <!-- dropdown menus for buttons -->
            <ul *ngIf="button.menu" class="popupmenu">
                <li *ngFor="let item of button.menu" id="{{item?.id}}">
                    <a href="" attr.data="{{item?.data}}">{{item?.text}}</a>
                </li>
            </ul>
        </template>
    `,
    styles : [`:host {display:inline-block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarButtonSetComponent {

    @Input() searchField:SearchField;
    @Input() buttons:ToolbarButton;

    @HostBinding('class') hostClasses:string = 'buttonset';

    constructor(){}

    get buttonSetClasses ():string {return this.hostClasses;}
}

// Not sure how the interfaces should be handled?
// Global typings file? Or export from the component?
export interface ToolbarButton
{
    id     ?: string;
    class  ?: string;
    text   ?: string;
    icon   ?: string;
    data   ?: string;
    menu   ?: any;
}
export interface SearchField
{
    id    ?: string;
    label ?: string;
    data  ?: string;
}


@Component({
    moduleId: module.id,
    selector: 'soho-toolbar',
    templateUrl: `toolbar.component.html`,
    styles: [`:host {display: block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarComponent {

    @Input() maxVisibleButtons:number = 3;
    @Input() rightAlign:boolean = false;

    @HostBinding('class') hostClasses:string = 'toolbar';

    // Add Events for Angular elements to listen to (can only have exposed events)
    @Output() toolbarClicked: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

    private jQueryElement: any;
    private toolbar:any;

    constructor(private element: ElementRef){}

    ngAfterViewInit() {

        // Assign element to local variable
        this.jQueryElement = jQuery(this.element.nativeElement);


        let options = {
            maxVisibleButtons: this.maxVisibleButtons,
            rightAlign : this.rightAlign
        };

        // Instantiate the element via jQuery
        this.jQueryElement.toolbar(options);
        this.toolbar = this.jQueryElement.data('toolbar');


        // Add listeners to emit events
        this.jQueryElement.on('selected', ((event: ToolbarEvent, item:any) =>
        {
            event.item = item;
            event.data = item[0].dataset;
            this.toolbarClicked.emit(event);
            console.log(event);
        }));
    }

    get toolbarClasses ():string {return this.hostClasses;}
}

/**
 * Holds all directives usable for toolbar
 */
export const TOOLBAR_COMPONENTS = [
    ToolbarComponent,
    ToolbarTitleComponent,
    ToolbarButtonSetComponent
];

/**
 * Interface for the jQuery event emitted
 */
export interface ToolbarEvent {
    currentTarget: HTMLElement;
    item:any;
    data: any;
    delegateTarget: HTMLElement;
    handleObj: Object;
    isTrigger: number;
    namespace: string;
    result: any;
    rnamespace: any;
    target: HTMLElement;
    timeStamp: number;
    type: string;
}