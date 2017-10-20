import {
  Component,
  ChangeDetectionStrategy,
  HostBinding
} from '@angular/core';

/**
 * Angular wrapper for the soho wizard header.
 */
@Component({
  selector: 'div[soho-wizard-header]', // tslint:disable-line
  template: `<div class="bar">
    <div class="completed-range"></div>
    <ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardHeaderComponent {
  @HostBinding('class.wizard-header') isWizardHeader = true;
}
