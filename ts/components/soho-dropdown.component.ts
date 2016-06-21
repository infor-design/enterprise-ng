// angular imports
import {Directive, EventEmitter, Input, Output, ElementRef, AfterViewInit} from '@angular/core';

declare var jQuery:any;

@Directive({
    selector : '[soho-dropdown-component]'
})

export class SohoDropdownComponent implements AfterViewInit
{
    @Input() options:any;
    //@Output() dropdownChange:EventEmitter<any> = new EventEmitter();
    @Output() dropdownSelected:EventEmitter<any> = new EventEmitter();

    private nativeElement:any;
    private $element:any = null;

    constructor(private element:ElementRef)
    {

    }

    // events
    ngAfterViewInit()
    {
        this.nativeElement = this.element.nativeElement;
        this.$element = jQuery(this.nativeElement);

        this.build();
        this.handleEvents();
    }

    // private methods
    private build()
    {
        this.$element.dropdown(this.options);
    }

    private handleEvents()
    {
        let self:SohoDropdownComponent = this;

//        self.$element.on("change", function(e)
//        {
//            self.dropdownChange.emit(e);
//        });

        self.$element.on("selected", function(e, value, isAdded)
        {
            let eventParams = { event:e, value:value, isAdded:isAdded };
            self.dropdownSelected.emit(eventParams);
        });
    }
}