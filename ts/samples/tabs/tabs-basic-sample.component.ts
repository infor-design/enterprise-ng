
import {Component} from '@angular/core';

import {SohoTabsComponent} from '../../components/index';
import {SohoTabSelectedEvent} from "../../components/soho-tabs.component";

@Component({
    selector : 'tabs-sample-component',
    directives : [SohoTabsComponent],
    template : `
        <soho-tabs-component (tabSelected)="onTabSelected($event)"> 
        
            <ul class="tab-list">
                <li><a href="#One">One</a></li>
                <li><a href="#Two">Two</a></li>
                <li><a href="#Three">Three</a></li>
            </ul>
            
            <div class="tab-content">
                <div id="One">One Content</div>
                <div id="Two">Two Content</div>
                <div id="Three">Three Content</div>
            </div>
        
        </soho-tabs-component>
    `
})
export class TabsBasicSampleComponent {

    private onTabSelected(event:SohoTabSelectedEvent) {
        console.log("TabsBasicSampleComponent.onTabSelected: " + JSON.stringify(event));
    }
}