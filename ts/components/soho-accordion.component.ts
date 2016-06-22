
import {Component, AfterViewInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';

@Component({
    selector : 'soho-accordion-component',
    directives : [SohoAccordionComponent],
    template : `
        <div class="accordion" data-demo-set-links="true"> 
            <ng-content></ng-content>
        </div>
    `
})

export class SohoAccordionComponent implements AfterViewInit
{
    private sohoAccordion:any;

    @Output() selected = new EventEmitter<SohoSelectedEvent>();

    constructor(private elementRef:ElementRef){}

    ngAfterViewInit()
    {
    //    $('body').initialize('en-US');
        let $accordionContainer = $(this.elementRef.nativeElement).find('.accordion');
        this.sohoAccordion = $accordionContainer.accordion().data("accordian");
        this.handleEvents();
    }

    private handleEvents():void
    {
        let self:SohoAccordionComponent = this;

        let $accordionContainer = $(this.elementRef.nativeElement).find('.accordion');
        $accordionContainer.on("selected", function(e, t)
        {
            var accordionId = $(e.target).find(".is-focused a").attr("id");
        //    var index = $(e.target).find(".accordion-header" ).index($(e.target).find(".is-focused"));
            let selectedEvent:SohoSelectedEvent = {id: accordionId};
            e.stopPropagation();
            e.preventDefault();
            self.selected.emit(selectedEvent);
        });
    }
}

export interface SohoSelectedEvent
{
    id    : string;
}
