
import {Component, EventEmitter, Output, ElementRef, AfterViewInit, OnInit} from "@angular/core";

@Component({
    selector: 'soho-tabs',
    templateUrl: 'soho-tabs.component.html'
})

export class TabsComponent implements AfterViewInit
{
    @Output() afteractivate: EventEmitter<Object> = new EventEmitter<Object>();
    @Output() tabselected: EventEmitter<Object> = new EventEmitter<Object>();

    private jQueryElement: any;

    private tabs:any;

    constructor(private element:ElementRef) {}

    // had to move this to ngAfterViewInit for the
    // tabs-dynamic-sample.component.ts to work.
    ngAfterViewInit()
    {
        this.jQueryElement = jQuery(this.element.nativeElement).find('.tab-container');

        this.jQueryElement.bind('afteractivate', ((event:TabsEvent) => {this.afteractivate.emit(event); }));

        this.update();
    }

    public update():void
    {
        this.jQueryElement.tabs();
        this.tabs = this.jQueryElement.data('tabs');
    }

    private onTabSelected(tabSelectedEvent:TabsEvent) { this.tabselected.emit(tabSelectedEvent); }

    public setTitle(id:string, newTitle:string):void { this.tabs.rename(id, newTitle);}

    public isinitalized():boolean { return !!this.tabs; };

    public getActiveTab():any { return this.tabs.getActiveTab(); }

    public getTabFromId(id:string):any { return this.tabs.getTabFromId(id); }
}


/**
 * Interface for the jQuery event emitted
 */
export interface TabsEvent {
  currentTarget: HTMLElement;
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
