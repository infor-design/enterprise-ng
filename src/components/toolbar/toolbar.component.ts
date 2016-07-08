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
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarTitleComponent {

    @HostBinding('class') hostClasses:string = 'title';

    constructor(){}

    get titleClasses ():string {return this.hostClasses;}
}

@Component({
    selector: 'soho-toolbar-button-set',
    template: `<ng-content></ng-content>`,
    styles : [`:host {display:inline-block;}`],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ToolbarButtonSetComponent {

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