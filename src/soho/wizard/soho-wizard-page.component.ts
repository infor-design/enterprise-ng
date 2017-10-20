import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy } from '@angular/core';

  /**
 * Angular wrapper for the soho wizard header.
 */
@Component({
  selector: 'div[soho-wizard-page]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardPageComponent {
  @HostBinding('class.wizard-page') isWizardPage = true;

  @Input()
  tickId: number;

  @HostBinding('class.hidden') isHidden = false;
}
