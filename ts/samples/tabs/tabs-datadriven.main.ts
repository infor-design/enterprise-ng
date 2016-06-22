///<reference path="../../typings/tsd.d.ts" />

import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {TabsDataDrivenSampleComponent} from "./tabs-datadriven-sample.component";

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, TabsDataDrivenSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Data Driven Tabs Sample</h2>
                <tabs-datadriven-sample-component></tabs-datadriven-sample-component>
            </div>
        </div>
    `
})
class TabsDataDrivenAppComponent implements AfterViewInit
{
    ngAfterViewInit()
    {
        fixXlinkHrefs();
    }
}

bootstrap(<any>TabsDataDrivenAppComponent);