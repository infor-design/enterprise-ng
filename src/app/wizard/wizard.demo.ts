import {
  Component,
  ViewChild,
} from '@angular/core';

import {SohoWizardComponent} from 'ids-enterprise-ng';

@Component({
  selector: 'demo-wizard-demo',
  templateUrl: 'wizard.demo.html',
})
export class WizardDemoComponent {
  @ViewChild(SohoWizardComponent, {static: true}) wizard!: SohoWizardComponent;

  public buttons = [
    {
      id: 'prevous',
      text: Soho.Locale.translate('Previous'),
      click: () => this.wizard.previous(),
      disabled: () => !this.wizard.hasPrevious(),
      // hidden: () => false,
      position: 'middle'
    },
    {
      id: 'next',
      text: Soho.Locale.translate('Next'),
      click: () => this.wizard.next(),
      isDefault: true,
      disabled: () => this.nextButtonDisabled(),
      position: 'middle'
    },
    {
      id: 'finish',
      text: 'Finish', // Soho.Locale.translate('Finish'),
      click: () => this.wizard.finish(),
      disabled: () => !this.wizard.hasFinished(),
      hidden: () => false,
      position: 'middle'
    },
    {
      id: 'hidden',
      text: 'Hidden', // Soho.Locale.translate('Finish'),
      disabled: () => !this.wizard.hasFinished(),
      hidden: () => true,
      position: 'right'
    }
  ];

  constructor() {
  }

  nextButtonDisabled() {
    return this.wizard.currentTickId === 'result';
  }

  onBeforeActivated(e: Event) {
    console.log(`onBeforeActivated: The tick with the label ${e}`);
    console.log(e);
  }

  onActivated(e: Event) {
    console.log(`onActivated: The tick with the label ${e}`);
    console.log(e);
  }

  onAfterActivated(e: Event) {
    console.log(`onAfterActivated: The tick with the label ${e}`);
    console.log(e);
  }
}
