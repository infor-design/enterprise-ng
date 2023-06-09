// tslint:disable-next-line:no-unused-variable
import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Module Nav Switcher element.
 * This Component attaches to an element annotated with the `soho-module-nav-switcher` attribute,
 */
@Component({
  selector: 'soho-module-nav-switcher, [soho-module-nav-switcher]',
  styleUrls: ['./soho-module-nav-switcher.component.css'],
  templateUrl: 'soho-module-nav-switcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavSwitcherComponent {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenavswitcher?: SohoModuleNavSwitcherStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavSwitcherOptions = {
    displayMode: false,
  };

}
