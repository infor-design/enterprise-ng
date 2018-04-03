/**
 * Created by ppatton on 1/10/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class DataGridCustomFormatterService {

  public randomIntegerFormatter(row, cell, value, column, item, api) {
    const newValue = this.getRandomNumber();
    return Soho.Formatters.Integer(row, cell, newValue, column, item, api);
  }

  /**
   * Make a public method so it's available for the custom formatter
   * through the userObject reference to this DemoComponent
   */
  private getRandomNumber(): number {
    const min = 1;
    const max = 50;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
