///<reference path="../../typings/tsd.d.ts" />

import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {ToolbarSampleComponent} from "../toolbar/toolbar-sample.component";

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, ToolbarSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Toolbar Sample</h2>
                <toolbar-sample-component></toolbar-sample-component>
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

