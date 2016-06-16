///<reference path="./typings/tsd.d.ts" />

import {Component} from "@angular/core";
import {SohoIcons,SohoIconsExtended} from "./components/index"; // can't get barrel files to work w/o adding index to path

@Component({
    selector   : 'body',
    host       : {'class':'no-scroll'},
    directives : [SohoIcons, SohoIconsExtended],
    template   : `
        <soho-icons></soho-icons>
        <soho-icons-ext></soho-icons-ext>
    `
})

export class AppComponent {
}

