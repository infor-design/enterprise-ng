import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy } from '@angular/core';

  /**
   * Angular wrapper for the soho wizard page.
   *
   * @todo WIP
   */
@Component({
  selector: 'div[soho-wizard-page]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardPageComponent {
  @HostBinding('class.wizard-page') isWizardPage = true;

  /** This id of the tick. */
  @Input()
  tickId: number;
}
