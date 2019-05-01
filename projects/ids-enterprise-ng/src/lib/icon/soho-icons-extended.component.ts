import {
  Component,
  HostBinding
} from '@angular/core';

/**
 * @deprecated All icons are now in one file per theme (svg.html or theme-uplift-svg.html),
 * and hence this component is deprecated and will be removed in the next major release.
 */
@Component({
  selector: 'soho-icons-ext',
  template: '<p>Please remove `soho-icons-ext` as all icons are now in one file per theme (svg.html or theme-uplift-svg.html)</p> -->'
})
export class SohoIconsExtendedComponent {
  @HostBinding('style.display') none = 'none';

  constructor() {
    console.warn('SohoIconsExtendedComponent (`soho-icon-ext`) has been deprecated and references should be removed.');
  }
}
