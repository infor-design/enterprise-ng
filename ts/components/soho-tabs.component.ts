///<reference path="../typings/tsd.d.ts" />

import {Component, EventEmitter, Output, ElementRef, AfterViewInit, OnInit} from "@angular/core";

@Component({
    selector   : 'soho-tabs-component',
    template   : `
        <div id="tabs-normal" class="tab-container">
            <ng-content select=".tab-list"></ng-content>
        </div>
        <ng-content select=".tab-content"></ng-content>
    `
})

export class SohoTabsComponent implements OnInit
{
    @Output() tabSelected = new EventEmitter<SohoTabSelectedEvent>();

    private sohoTabs:any;

    constructor(private elementRef:ElementRef) {}

    ngOnInit()
    {
        let $tabContainer = $(this.elementRef.nativeElement).find('.tab-container');
        this.sohoTabs = $tabContainer.tabs().data("tabs");

        this.handleEvents();
    }

    private handleEvents():void
    {
        let self:SohoTabsComponent = this;

        let $tabContainer = $(this.elementRef.nativeElement).find('.tab-container');
        $tabContainer.on("afteractivate", function(e, t)
        {
            var tabId = $(e.target).find(".tab-list .is-selected a").attr("href").substring(1);
            var index = $(e.target).find(".tab" ).index($(e.target).find(".tab-list .is-selected"));
            let tabSelectedEvent:SohoTabSelectedEvent = {id: tabId, index: index};
            self.tabSelected.emit(tabSelectedEvent);
        });
    }

    onTabSelected(tabSelectedEvent:SohoTabSelectedEvent)
    {
        this.tabSelected.emit(tabSelectedEvent);
    }

    public isinitalized():boolean { return !!this.sohoTabs; };

    public getActiveTab():any { return this.sohoTabs.getActiveTab(); }

    public getTabFromId(id:string):any { return this.sohoTabs.getTabFromId(id); }
}

export interface SohoTabSelectedEvent
{
    id    : string;
    index : number;
}