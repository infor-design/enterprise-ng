
import {Component, Output, EventEmitter} from '@angular/core';

import {SohoAccordionComponent, SohoSelectedEvent} from '../../components/index';

@Component({
    selector : 'accordion-sample-component',
    directives : [SohoAccordionComponent],
    template : `
         <p>AccordionSampleComponent</p>
         <soho-accordion-component (selected)="onSelected($event)">
            <div class="accordion-header">
                <a href="#" id ="1-0"><span>Upper Step 1</span></a>
            </div> 
            <div class="accordion-pane">
                <div class="accordion-header">
                    <a href="#" id ="1-1"><span>Sub Step 1-1</span></a>
                </div> 
                <div class="accordion-pane">
                    <div class="accordion-header">
                        <a href="#" id ="1-1-1"><span>Sub Step 1-1-1</span></a>
                    </div>   
                    <div class="accordion-header">
                        <a href="#" id ="1-1-2"><span>Sub Step 1-1-2</span></a>
                    </div>  
                </div>   
                <div class="accordion-header">
                    <a href="#" id ="1-2"><span>Sub Step 1-2</span></a>
                </div>  
                <div class="accordion-header">
                    <a href="#" id ="1-3"><span>Sub Step 1-3</span></a>
                </div>  
            </div>
            
            <div class="accordion-header">
                <a href="#" id ="2-0"><span>Upper Step 2</span></a>
            </div> 
            <div class="accordion-pane">
                <div class="accordion-header">
                    <a href="#" id ="2-1"><span>Sub Step 2-1</span></a>
                </div>   
                <div class="accordion-header">
                    <a href="#" id ="2-2"><span>Sub Step 2-2</span></a>
                </div>  
            </div>
        </soho-accordion-component>
    `
})

export class AccordionSampleComponent
{
    @Output() selected = new EventEmitter<SohoSelectedEvent>();

    private onSelected(selectedEvent:SohoSelectedEvent)
    {
        this.selected.emit(selectedEvent);
        console.log("AccordionSampleComponent.onSelected: " + JSON.stringify(selectedEvent));
    }
}