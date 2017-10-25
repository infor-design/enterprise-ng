import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  ContentChildren,
  QueryList
} from '@angular/core';

import { SohoWizardTickComponent } from './soho-wizard-tick.component';

/**
 * Angular wrapper for the soho wizard header.
 *
 * Looks for a `div` annotated with `soho-wizard-header`, this
 * simply add a wrapper around the wizard ticks.
 */
@Component({
  selector: 'div[soho-wizard-header]', // tslint:disable-line
  template: `<div class="bar">
    <div class="completed-range"></div>
    <ng-content></ng-content>
  </div>`,
  styles: [`:host { padding: 20px 40px 60px 40px }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardHeaderComponent {
  /**
   * List of ticks in the control.
   *
   * @type {QueryList<SohoWizardTickComponent>}
   * @memberof SohoWizardHeaderComponent
   */
  @ContentChildren(SohoWizardTickComponent) steps: QueryList<SohoWizardTickComponent>;

  @HostBinding('class.wizard-header') isWizardHeader = true;
}
