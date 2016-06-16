///<reference path="../../ts/typings/tsd.d.ts" />

import {Component, AfterViewInit} from "@angular/core";

@Component({
    selector   : 'soho-header-component',
    host       : {style: "display:block"},
    template   : `
      <div class="toolbar">
        <div class="title">
          <button class="btn-icon application-menu-trigger" type="button">
            <span class="audible">Show navigation</span>
            <span class="icon app-header">
              <span class="one"></span>
              <span class="two"></span>
              <span class="three"></span>
            </span>
          </button>
    
          <h1>
            <span>Soho Angular Components</span>
          </h1>
        </div>
    
        <div class="buttonset">
          <input id="header-searchfield" class="searchfield" name="header-searchfield" />
        </div>
    
        <div class="more">
          <button class="btn-actions page-changer" type="button">
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use xlink:href="#icon-more"></use>
            </svg>
            <span class="audible" data-translate="text">More</span>
          </button>
          <ul class="popupmenu is-selectable">
            <li class="heading" role="presentation">Theme</li>
            <li class="is-selectable is-checked"><a href="#" data-theme="grey-theme">Light</a></li>
            <li class="is-selectable"><a href="#" data-theme="dark-theme">Dark</a></li>
            <li class="is-selectable"><a href="#" data-theme="high-contrast-theme">High Contrast</a></li>
            <li class="separator"></li>
            <li class="heading" role="presentation">Personalization</li>
            <li class="is-selectable is-checked"><a data-rgbcolor="" href="#">Default</a></li>
            <li class="is-selectable"><a data-rgbcolor="#368AC0" href="#">Azure</a></li>
            <li class="is-selectable"><a data-rgbcolor="#EFA836" href="#">Amber</a></li>
            <li class="is-selectable"><a data-rgbcolor="#9279A6" href="#">Amethyst</a></li>
            <li class="is-selectable"><a data-rgbcolor="#579E95" href="#">Turqoise</a></li>
            <li class="is-selectable"><a data-rgbcolor="#76B051" href="#">Emerald</a></li>
            <li class="is-selectable"><a data-rgbcolor="#5C5C5C" href="#">Graphite</a></li>
          </ul>
    
        </div>
      </div>
    `
})

export class SohoHeaderComponent implements AfterViewInit
{
    // ngAfterViewInit lifecycle event - called after Angular creates the component's view(s).
    // meaning the content is in the DOM and it's ok to run jQuery against it.
    ngAfterViewInit()
    {
        $('.toolbar').toolbar();
        $('#application-menu').applicationmenu(
        {
            rerouteOnLinkClick: false,
            triggers: [$('.application-menu-trigger')]
        });
    }
}
