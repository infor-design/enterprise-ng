///<reference path="../../typings/tsd.d.ts" />

import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {AccordionSampleComponent} from './accordian-sample.component';

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, AccordionSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Accordian Sample</h2>
                <accordian-sample-component></accordian-sample-component>
            </div>
        </div>
    `
})

export class AppComponent implements AfterViewInit
{
    ngAfterViewInit()
    {
        fixXlinkHrefs();
    }
}

