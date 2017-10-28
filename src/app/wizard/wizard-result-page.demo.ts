import {
  Component,
  ViewChild
} from '@angular/core';

import { SohoProgressComponent, SohoWizardPageComponent } from '@infor/sohoxi-angular';

import { WizardDemoComponent } from './wizard.demo';

@Component({
  selector: 'demo-result-page',
  templateUrl: `./wizard-result-page.demo.html`,
  styles: [
    `:host {
      display:        flex;
      flex:           1;
      flex-direction: column;
  }`]
})
export class WizardDemoResultPageComponent {

  @ViewChild(SohoProgressComponent) progress: SohoProgressComponent;

  constructor(private page: SohoWizardPageComponent) {
    this.page.activated.subscribe((e) => { setTimeout(() => { this.update(); }, 1000); });
  }

  update() {
    this.progress.progressValue += 1;
    if (this.progress.progressValue < 100) {
      setTimeout(() => { this.update(); }, 1000);
    }
  }
}
