///<reference path="../../typings/tsd.d.ts" />

import {Component, AfterViewInit} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {SohoMastheadComponent} from "./soho-masthead.component";
import {SohoHeaderComponent} from "./soho-header.component";
import {SohoNavigationComponent} from "./soho-navigation.component";
import {fixXlinkHrefs} from '../../fix-xlink-refs';

import {ToolbarSampleComponent} from '../toolbar/toolbar-sample.component';
import {TabsSampleComponent} from '../tabs/tabs-sample.component';
import {AccordianSampleComponent} from '../accordian/accordian-sample.component';
import {DropdownSampleComponent} from '../dropdown/dropdown-sample.component';

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
    {path: '/toolbar',   name: 'ToolbarSample',   component: ToolbarSampleComponent},
    {path: '/tabs',      name: 'TabsSample',      component: TabsSampleComponent},
    {path: '/accordian', name: 'AccordianSample', component: AccordianSampleComponent},
    {path: '/dropdown',  name: 'DropdownSample',  component: DropdownSampleComponent}
])

export class AppComponent implements AfterViewInit
{
    ngAfterViewInit()
    {
        fixXlinkHrefs();
    }
}

