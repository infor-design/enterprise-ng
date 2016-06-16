///<reference path="../../typings/tsd.d.ts" />

import {Component, AfterViewInit} from "@angular/core";
import {SohoIcons, SohoIconsExtended} from "../../components/index";
import {fixXlinkHrefs} from "../../fix-xlink-refs";
import {DropdownSampleComponent} from "../dropdown/dropdown-sample.component";

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended, DropdownSampleComponent],
    template   :
        `
        <a href="#maincontent" class="skip-link">Skip To Main Content</a>
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
        <div class="page-container">
            <div id="maincontent" class="page-container scrollable" role="main">
                <h2>Soho Angular Dropdown Sample</h2>
                <dropdown-sample-component></dropdown-sample-component>
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

