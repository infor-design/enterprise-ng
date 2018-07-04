import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'sohoTranslate',

  // This allow changing of the locale to affect all displayed items,
  // we may want two versions of this, one pure one not.
  pure: false
})
export class SohoTranslatePipe implements PipeTransform {
  /**
   * Translates the specified string into the current locale.
   *
   * @param {string} value the resource string, must not be null.
   * @param {string} locale the locale to use, defaults to current locale.
   * @returns {string} the translated resource string or undefined.
   * @memberof SohoTranslatePipe
   */
  transform(value: string, locale?: string): string {
    if (locale) {
      Soho.Locale.set(locale);
    }
    return Soho.Locale.translate(value);
  }
}
