
import {Component, ViewChild, OnInit, IterableDiffers, IterableDiffer, DoCheck} from '@angular/core';

import {TabsComponent, TabsEvent} from '../../components';

@Component({
    selector : 'tabs-dynamic-sample-component',
    directives : [TabsComponent],
    template : 'tabs-dynamic.demo.html',
    styles: [`
        button {
            background-color: #368ac0;
            border: none;
            color: white;
            padding: 10px 16px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
    `]
})
export class TabsDynamicSampleComponent implements OnInit, DoCheck {

    @ViewChild(TabsComponent) sohoTabsComponent:TabsComponent;

    private tabs:Array<any>;
    private currentTabsIndex:number = 1;
    private currentTabTitleChangeNumber:number = 1;

    private tabsArrayDiffer:IterableDiffer;

    constructor(private iterableDiffers:IterableDiffers)
    {
        this.tabsArrayDiffer = this.iterableDiffers.find([]).create(null);
    }

    ngOnInit()
    {
        this.tabs = this.tabsData[this.currentTabsIndex];
    }

    ngDoCheck()
    {
        if (!this.sohoTabsComponent)
            return;

        var changes = this.tabsArrayDiffer.diff(this.tabs);
        if (changes)
        {
            // this.sohoTabsComponent.update();

            // // place into timeout so the template can have a chance to process
            // // and get placed into teh sohoTabsComponent before we call update.
            // // ISSUE: this causes a FOUC
            setTimeout((sohoTabsComponent:TabsComponent) => {
                sohoTabsComponent.update(); }, 1, this.sohoTabsComponent);
        }
    }

    private onChangeTabs(event:TabsEvent)
    {
        console.log("TabsBasicSampleComponent.onChangeTabs: " + JSON.stringify(event));

        this.currentTabsIndex++;
        if (this.currentTabsIndex >= this.tabsData.length)
            this.currentTabsIndex = 0;

        this.tabs = this.tabsData[this.currentTabsIndex];
        this.currentTabTitleChangeNumber = 1;

        // expect change detection to message our ngDoChange and then we
        // can update the soho control based on tabs changes.
    }

    private onChangeTitles(event:TabsEvent)
    {
        for (let i:number = 0; i < this.tabs.length; i++)
        {
            // Calling setTitle on the soho component/control so that the entire
            // tabset doesn't have to be rebuilt and hence cause a FOUC.
            this.sohoTabsComponent.setTitle(
                this.tabs[i].id,
                this.tabs[i].title + " Title Change " + this.currentTabTitleChangeNumber);
        }

        this.currentTabTitleChangeNumber++;
    }

    private onTabSelected(event:TabsEvent)
    {
        console.log("TabsBasicSampleComponent.onTabSelected: " + JSON.stringify(event));
    }

    private tabsData:Array<any> =
    [
        [
            {id:'one',   title: 'One',   content: "Tab One Content"},
            {id:'two',   title: 'Two',   content: "Tab Two Content"},
            {id:'three', title: 'Three', content: "Tab Three Content"},
            {id:'four',  title: 'Four',  content: "Tab Four Content"}
        ],
        [
            {id:'abc',       title: 'Abc',   content: "Tab Abc Content"},
            {id:'def',       title: 'Def',   content: "Tab Def Content"},
            {id:'hijklmnop', title: 'Hijklmnop', content: "Tab Hijklmnop Content"},
            {id:'qrs',       title: 'Qrs',  content: "Tab Qrs Content"},
            {id:'tuv',       title: 'Tuv',  content: "Tab Tuv Content"}
        ],
        [
            {id:'good',   title: 'Good',   content: "Tab Good Content"},
            {id:'better', title: 'Better', content: "Tab Better Content"},
            {id:'best',   title: 'Best',   content: "Tab Best Content"}
        ]
    ];
}
