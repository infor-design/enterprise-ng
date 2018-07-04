import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'sohoFormatNumber',

  // This allow changing of the locale to affect all displayed items,
  // we may want two versions of this, one pure one not.
  pure: false
})
export class SohoFormatNumberPipe implements PipeTransform {
  /**
   * Formats the given date using the soho locale formats.
   *
   * @param {string} value the date (or string), must not be null.
   * @param {string} attribs optional, additional formatting settings.
   * @returns {string} the translated resource string or undefined.
   * @memberof SohoTranslatePipe
   */
  transform(value: string | number, attribs?: any): string {
    return Soho.Locale.formatNumber(value, attribs);
  }
}
