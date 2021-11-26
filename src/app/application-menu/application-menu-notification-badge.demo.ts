import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
// @ts-ignore
import { SohoApplicationMenuComponent } from 'ids-enterprise-ng';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'application-menu-notification-badge-demo',
  templateUrl: 'application-menu-notification-badge.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMenuNotificationBadgeDemoComponent implements AfterViewInit, OnInit {

  @ViewChild(SohoApplicationMenuComponent) applicationMenu?: SohoApplicationMenuComponent;

  public triggers: Array<string> = [];
  public menu: Array<any> = [];
  public menuItems: Array<string> = [];
  public myRole?: string;
  public hasChangePasswordLink = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.myRole = 'Example Role';
  }

  ngAfterViewInit() {
    this.triggers = ['#application-lazy-menu-trigger'];
  }

  public openMenu() {
    this.applicationMenu?.openMenu(undefined, true, undefined);
  }

  public selectRole($event?: any) {
    const button: any = $event.currentTarget;
    this.myRole = button.getAttribute('title');

    setTimeout(() => {
      this.menuItems = ['Menu 1', 'Menu 2', 'Menu 3', 'Menu 4', 'Menu 5', 'Menu 6', 'Menu 7', 'Menu 8', 'Menu 9', 'Menu 10', 'Menu 11',
        'Menu 12', 'Menu 13', 'Menu 14', 'Menu 15', 'Menu 16', 'Menu 17', 'Menu 18', 'Menu 19', 'Menu 20'];

      this.changeDetectorRef.detectChanges();
    }, 1000);

    this.applicationMenu?.closeSwitcherPanel();
  }
}
  