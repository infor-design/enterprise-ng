import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'sohoFormatDate',

  // This allow changing of the locale to affect all displayed items,
  // we may want two versions of this, one pure one not.
  pure: false
})
export class SohoFormatDatePipe implements PipeTransform {
  /**
   * Formats the given date using the soho locale formats.
   *
   * @param value the date (or string), must not be null.
   * @param attribs optional, additional formatting settings.
   * @returns the translated resource string or undefined.
   *
   */
  transform(value: string | Date, attribs?: any): string {
    return Soho.Locale.formatDate(value, attribs);
  }
}
