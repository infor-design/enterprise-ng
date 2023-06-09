// tslint:disable-next-line:no-unused-variable
import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Module Nav Settings element.
 * This Component attaches to an element annotated with the `soho-module-nav-settings` attribute,
 */
@Component({
  selector: 'soho-module-nav-settings, [soho-module-nav-settings]',
  styleUrls: ['./soho-module-nav-settings.component.css'],
  templateUrl: 'soho-module-nav-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavSettingsComponent {

  /** Reference to the jQuery element. */
  private jQueryElement?: JQuery;

  /** Reference to the annotated SoHoXi control */
  private modulenavsettings?: SohoModuleNavSettingsStatic | null;

  /** Stored settings */
  private _options: SohoModuleNavSettingsOptions = {
    displayMode: false,
  };

}
