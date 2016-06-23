///<reference path="../../typings/tsd.d.ts" />

import {Component, OnInit, HostBinding} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
    selector    : 'soho-navigation-component',
    directives  : [ROUTER_DIRECTIVES],
    template    : `
      <div class="accordion panel inverse" data-options="{'allowOnePane': true, rerouteOnLinkClick: false}" >
          <div class="accordion-header list-item"><a [routerLink]="['ExpandableAreaSample']"><span>ExpandableArea Component</span></a></div>
          <div class="accordion-header list-item"><a [routerLink]="['ToolbarSample']"><span>Toolbar Component</span></a></div>
          <div class="accordion-header list-item"><a [routerLink]="['DropdownSample']"><span>Dropdown Component</span></a></div>
          <div class="accordion-header list-item"><a [routerLink]="['AccordionSample']"><span>Accordian Component</span></a></div>
          <div class="accordion-header"><a href="javascript:void(0);"><span>Tabs</span></a></div>
          <div class="accordion-pane">
              <div class="accordion-header list-item"><a [routerLink]="['TabsBasicSample']"><span>Basic TabsComponent</span></a></div>
              <div class="accordion-header list-item"><a [routerLink]="['TabsDataDrivenSample']"><span>Data-Driven TabsComponent</span></a></div>
              <div class="accordion-header list-item"><a [routerLink]="['TabsDynamicSample']"><span>Dynamic TabsComponent</span></a></div>
          </div>
      </div>

      <div class="branding">
        <svg class="icon" viewBox="0 0 34 34" focusable="false" aria-hidden="true" role="presentation">
          <use attr.xlink:href="{{baseUrl}}#icon-logo"></use>
        </svg>
      </div>
    `
})

export class SohoNavigationComponent
{
    @HostBinding('id') hostId = 'application-menu';
    @HostBinding('class') hostClasses = 'application-menu';// is-open no-transition';

    private baseUrl:string = window.location.href.replace(window.location.hash, "");
}
