// angular imports
import {Directive, EventEmitter, Input, Output, ElementRef, OnInit} from "@angular/core";

declare var jQuery:any;

@Directive({
    selector : '[soho-dropdown-component]'
})

export class SohoDropdownComponent implements OnInit
{
    @Input() options:any;
    //@Output() dropdownChange:EventEmitter<any> = new EventEmitter();
    @Output() dropdownSelected:EventEmitter<any> = new EventEmitter();

    constructor(private _elementRef:ElementRef) {}

    private sohoDropdown:any = null;

    // events
    ngOnInit()
    {
        this.sohoDropdown = $(this._elementRef.nativeElement).dropdown().data("dropdown");

        this.handleEvents();
    }

    private handleEvents()
    {
        let self:SohoDropdownComponent = this;

//        this.$element.on("change", function(e)
//        {
//            self.dropdownChange.emit(e);
//        });

        this.sohoDropdown.element.on("selected", function(e, value, isAdded)
        {
            let eventParams = { event:e, value:value, isAdded:isAdded };
            self.dropdownSelected.emit(eventParams);
        });
    }
}