// tslint:disable-next-line:no-unused-variable
import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

/**
 * Angular Wrapper for the Soho Module Nav Container element.
 * This Component attaches to an element annotated with the `soho-module-nav-container` attribute,
 */
@Component({
  selector: 'soho-module-nav-container, [soho-module-nav-container]',
  styleUrls: ['./soho-module-nav-container.component.css'],
  templateUrl: 'soho-module-nav-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoModuleNavContainerComponent {

}
