///<reference path="../../ts/typings/tsd.d.ts" />

import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
    selector    : 'soho-navigation-component',
    host        : { 'id':'application-menu', 'class':'application-menu', 'style':"display:none;" },
    directives  : [ROUTER_DIRECTIVES],
    template    : `
      <div class="accordion panel inverse" data-options="{'allowOnePane': true, rerouteOnLinkClick: false}" >
        <div class="accordion-header">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-user"></use>
          </svg>
          <a href="#"><span>My Account</span></a>
        </div>
        <div class="accordion-pane">
          <div class="accordion-content panel logout">
            <svg class="icon avatar" viewBox="0 0 48 48" focusable="false" aria-hidden="true" role="presentation">
              <use xlink:href="#icon-user-avatar"></use>
            </svg>
            <span class="content">
              <span class="name">Ming.le User</span>
              <span><a href="#" class="hyperlink">Sign Out</a></span>
            </span>
          </div>
          <div class="accordion-header">
            <a href="#"><span>Notifications</span></a>
          </div>
          <div class="accordion-header">
            <a href="#"><span>Administrator</span></a>
          </div>
          <div class="accordion-header">
            <a href="#"><span>User Settings</span></a>
          </div>
          <div class="accordion-header">
            <a href="#"><span>Help</span></a>
          </div>
        </div>
    
        <div class="accordion-header">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-bookmark-filled"></use>
          </svg>
          <a href="#"><span>Bookmarks</span></a>
        </div>
    
        <div class="accordion-header">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-clock"></use>
          </svg>
          <a href="#"><span>History</span></a>
        </div>
    
        <div class="accordion-header">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-home"></use>
          </svg>
          <a href="#"><span>Homepages</span></a>
        </div>
    
        <div class="accordion-header">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use xlink:href="#icon-roles"></use>
          </svg>
          <a href="#"><span>Soho Angular Components</span></a>
        </div>
        <div class="accordion-pane">
          <div class="accordion-header"><a [routerLink]="['SohoAccordianComponent']"><span>Accordian Component</span></a></div>
          <div class="accordion-header"><a [routerLink]="['SohoToolbarComponent']"><span>Toolbar Component</span></a></div>
          <div class="accordion-header"><a [routerLink]="['SohoDropdownComponent']"><span>Dropdown Component</span></a></div>
          <div class="accordion-header"><a [routerLink]="['SohoTabsComponent']"><span>Tabs Component</span></a></div>
        </div>
    
      </div>
    
      <div class="branding">
        <svg class="icon" viewBox="0 0 34 34" focusable="false" aria-hidden="true" role="presentation">
          <use xlink:href="#icon-logo"></use>
        </svg>
      </div>
    `
})

export class SohoNavigationComponent{}
