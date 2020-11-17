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
   * @param value the resource string, must not be null.
   * @param locale the locale to use, defaults to current locale.
   * @param options additional options passed to the locale translate function
   * @returns the translated resource string or undefined.
   *
   */
  transform(value: string, locale?: string | undefined, options?: Object | undefined): string | undefined {
    if (locale) {
      Soho.Locale.set(locale);
    }
    return Soho.Locale.translate(value, options);
  }
}
