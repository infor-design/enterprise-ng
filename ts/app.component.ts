///<reference path="./typings/tsd.d.ts" />

import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {SohoIcons, SohoIconsExtended, SohoMastheadComponent, SohoHeaderComponent, SohoNavigationComponent,
        SohoTabsComponent, SohoToolbarComponent, SohoAccordianComponent, SohoDropdownComponent} from "./components/index";

// can't get barrel files to work w/o adding index to path

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, SohoMastheadComponent, SohoHeaderComponent, SohoNavigationComponent, ROUTER_DIRECTIVES],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <soho-masthead-component class="masthead"></soho-masthead-component>
        <soho-navigation-component></soho-navigation-component>
        <div class="page-container">
            <soho-header-component class="header is-personalizable"></soho-header-component>
            <div id="maincontent" class="page-container scrollable" role="main">
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})

@RouteConfig ([
    {path: '/toolbar',   name: 'SohoToolbarComponent',   component: SohoToolbarComponent},
    {path: '/tabs',      name: 'SohoTabsComponent',      component: SohoTabsComponent},
    {path: '/accordian', name: 'SohoAccordianComponent', component: SohoAccordianComponent},
    {path: '/dropdown',  name: 'SohoDropdownComponent',  component: SohoDropdownComponent}
])

export class AppComponent{}

