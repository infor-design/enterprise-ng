import {
  Component,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoWizardPageComponent } from './soho-wizard-page.component';


  /**
   * Angular wrapper for the soho wizard pagesß.
   */
@Component({
  selector: 'div[soho-wizard-pages]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [
  `:host {
    display:        flex;
    flex:           1 100%;
    margin:         20px;
  }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardPagesComponent {
  @ContentChildren(SohoWizardPageComponent) public pages: QueryList<SohoWizardPageComponent>;
}
