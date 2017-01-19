import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationMenuLazyService {
  private _menuSpec: Array<any> = [];

  constructor() {}

  public getMenuItems(): Promise<any> {
    return new Promise(function(resolve) {
      const a = 'sub_' + Math.random();
      const b = 'sub_' + Math.random();

      resolve([
        {mockUrl: a, name: a},
        {mockUrl: b, name: b}
      ]);
    });
  }

  public updateMenu(menuSpec: Array<any>, key?: string, menu?: Array<any>): void {
    if (this._menuSpec.length === 0) {
      this._menuSpec = menuSpec;
    } else {
      const newMenu: Array<any> = menuSpec;
      this._updateMenuSpec(this._menuSpec, newMenu, key);
    }
  }

  public getMenuSpec(): Array<any> {
    return this._menuSpec;
  }

  private _updateMenuSpec(menu: Array<any>, newMenu: Array<any>, key: string): void {
    // tslint:disable-next-line:prefer-const
    for (let i = 0, l = menu.length; i < l; i++) {
      const object = menu[i];
      for (const k in object) {
        if (object.hasOwnProperty(k)) {
          if (object[k] === key) {
            object.submenu = newMenu;
          } else if (object.submenu) {
            this._updateMenuSpec(object.submenu, newMenu, key);
          }
        }
      }
    }
  }
}
