import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationMenuLazyService } from './application-menu-lazy-service.demo';

import { SohoApplicationMenuComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-application-menu-lazy-demo',
  templateUrl: './application-menu-lazy.demo.html',
})
export class ApplicationMenuLazyDemoComponent implements AfterViewInit, OnInit {

  @ViewChild(SohoApplicationMenuComponent) applicationMenu: SohoApplicationMenuComponent;

  public triggers: Array<string> = [];
  public menu: Array<any> = [];

  constructor(private _lazyMenuService: ApplicationMenuLazyService) {}

  ngOnInit() {
    this.menu = [
      {mockUrl: 'child-1', name: 'Child One'},
      {mockUrl: 'child-2', name: 'Child Two'}
    ];

    this._lazyMenuService.updateMenu(this.menu);
  }

  ngAfterViewInit() {
    this.triggers = ['.application-lazy-menu-trigger'];
  }

  public onSubMenuLoaded(menuObject: any) {
    this.menu = menuObject.menuSpec;
    const target = menuObject.event.target;
    this.applicationMenu.updateLazy(this.applicationMenu, target);
  }
}
