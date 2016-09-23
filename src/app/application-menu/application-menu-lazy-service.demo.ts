import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationMenuLazyService {
  private _menuSpec: Array<any> = [];

  constructor() {}

  public getMenuItems(): Promise<any> {
    return new Promise(function(resolve) {
      resolve([
        {mockUrl: 'sub_' + Math.random(), name: 'SubChild One'},
        {mockUrl: 'sub_' + Math.random(), name: 'SubChild Two'}
      ]);
    });
  }

  public updateMenu(menuSpec: Array<any>, key?: string, menu?: Array<any>): void {
    if (this._menuSpec.length === 0) {
      this._menuSpec = menuSpec;
    } else {
      let newMenu: Array<any> = menuSpec;
      this._updateMenuSpec(this._menuSpec, newMenu, key);
    }
  }

  public getMenuSpec(): Array<any> {
    return this._menuSpec;
  }

  private _updateMenuSpec(menu: Array<any>, newMenu: Array<any>, key: string): void {
    for (let i = 0, l = menu.length; i < l; i++) {
      let object = menu[i];
      for (let k in object) {
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
