import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'translate'
})
export class SohoTranslatePipe implements PipeTransform {
  /**
   * Translates the specified string into the current locale.
   *
   * @param {string} value the resour"ce string
   * @returns {string} the translated resource string or undefined.
   * @memberof TranslatePipe
   */
  transform(value: string): string {
    return Soho.Locale.translate(value);
  }
}
