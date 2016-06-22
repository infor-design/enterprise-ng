
import {Component} from '@angular/core';

import {SohoTabsComponent} from '../../components/index';
import {SohoTabSelectedEvent} from "../../components/soho-tabs.component";

@Component({
    selector : 'tabs-datadriven-sample-component',
    directives : [SohoTabsComponent],
    template : `
        <soho-tabs-component (tabSelected)="onTabSelected($event)"> 
        
            <ul class="tab-list">
                <li *ngFor="let tab of tabs">
                    <a href="#{{tab.id}}">{{tab.title}}</a>
                </li>
            </ul>
            
            <div class="tab-content">
                <div *ngFor="let tab of tabs" id="{{tab.id}}">{{tab.content}}</div>
            </div>
        
        </soho-tabs-component>
    `
})
export class TabsDataDrivenSampleComponent {

    private tabs:Array<any> = [];

    ngOnInit()
    {
        this.tabs.push({id:'one',   title: 'One',   content: "Tab One Content"});
        this.tabs.push({id:'two',   title: 'Two',   content: "Tab Two Content"});
        this.tabs.push({id:'three', title: 'Three', content: "Tab Three Content"});
        this.tabs.push({id:'four',  title: 'Four',  content: "Tab Four Content"});
    }

    private onTabSelected(event:SohoTabSelectedEvent)
    {
        console.log("TabsDataDrivenSampleComponent.onTabSelected: " + JSON.stringify(event));
    }
}