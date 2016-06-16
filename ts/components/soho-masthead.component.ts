///<reference path="../typings/tsd.d.ts" />

import {Component} from "@angular/core";

@Component({
    selector : 'soho-masthead-component',
    host     : {style: "display:block"},
    template : `
        <div class="toolbar no-actions-button" role="toolbar" aria-label="Go To Home UI Test Suite">
            <div class="title">
                <button id="logo-homepage" tabindex="0">
                    <svg class="icon icon-logo" focusable="false" aria-hidden="true" role="presentation">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-logo"></use>
                    </svg>
                    <span class="audible">{{goToHomeLabel}}</span>
                </button>
                <h1 class="masthead-appname">{{suiteTitle}}</h1>
            </div>

            <!-- buttonset do not remove -->
            <div class="buttonset">
                <button type="button" class="btn no-caps" title="Show User">
                    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                        <use xlink:href="#icon-user"></use>
                    </svg>
                    <span class="audible">User</span>
                </button>
        
                <button type="button" class="btn">
                    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                    <use xlink:href="#icon-mingle-share"></use>
                    </svg>
                    <span class="audible">Share</span>
                </button>
        
                <button type="button" class="btn">
                    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                        <use xlink:href="#icon-bookmark-filled"></use>
                    </svg>
                    <span class="audible">Bookmark</span>
                </button>
                
                <button type="button" class="btn">
                    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
                        <use xlink:href="#icon-expand-app-tray"></use>
                    </svg>
                    <span class="audible">Expand App Tray</span>
                </button>

            </div>
        </div>
    `
})
export class SohoMastheadComponent
{
    private suiteTitle:string = "Suite Title";
    private goToHomeLabel:string = Locale.translate("GoToHome");
}
