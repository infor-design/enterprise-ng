import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy, ElementRef
} from '@angular/core';

import { ApplicationMenuLazyService } from './application-menu-lazy-service.demo';

import { SohoApplicationMenuComponent } from 'ids-enterprise-ng';
import { ApplicationMenuLazyMenuDemoComponent } from './application-menu-lazy-menu.demo';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'application-menu-lazy-demo',
  templateUrl: './application-menu-lazy.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMenuLazyDemoComponent implements AfterViewInit, OnInit {

  @ViewChild(SohoApplicationMenuComponent) applicationMenu: SohoApplicationMenuComponent;
  @ViewChild(ApplicationMenuLazyMenuDemoComponent) private _lazyMenuComponent: ApplicationMenuLazyMenuDemoComponent;
  @ViewChild('webAppMenuHeader') private _webAppMenuHeader: ElementRef;

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
    this.triggers = ['#application-lazy-menu-trigger'];
  }

  public onSubMenuLoaded(menuObject: any) {
    this.menu = menuObject.menuSpec;
    const target = menuObject.event.target;
    this.applicationMenu.updateLazy(this.applicationMenu, target);
  }

  public onWebAppMenuLoaded() {
    if (this._webAppMenuHeader) {
      this.applicationMenu.toggleAndSelectHeader(this.applicationMenu, this._webAppMenuHeader.nativeElement);
    } else {
      this.applicationMenu.updated();
    }
  }
}
