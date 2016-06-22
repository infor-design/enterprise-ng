///<reference path="../../typings/tsd.d.ts" />

// angular imports
import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {TabsBasicSampleComponent} from "./tabs-basic-sample.component";

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, TabsBasicSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Tabs Sample</h2>
                <tabs-sample-component></tabs-sample-component>
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

bootstrap(<any>AppComponent);