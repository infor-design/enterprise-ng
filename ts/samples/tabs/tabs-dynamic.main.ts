///<reference path="../../typings/tsd.d.ts" />

import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {TabsDynamicSampleComponent} from "./tabs-dynamic-sample.component";

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, TabsDynamicSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Dynamic Tabs Sample</h2>
                <tabs-dynamic-sample-component></tabs-dynamic-sample-component>
            </div>
        </div>
    `
})

class TabsDynamicAppComponent implements AfterViewInit
{
    ngAfterViewInit()
    {
        fixXlinkHrefs();
    }
}

bootstrap(<any>TabsDynamicAppComponent);