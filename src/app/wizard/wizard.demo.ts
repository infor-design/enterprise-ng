import {
  Component,
  ViewChild,
} from '@angular/core';

import { SohoWizardComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'demo-wizard-demo',
  templateUrl: 'wizard.demo.html',
})
export class WizardDemoComponent {
  @ViewChild(SohoWizardComponent, { static: true }) wizard!: SohoWizardComponent;

  public buttons = [
    {
      id: 'prevous',
      text: Soho.Locale.translate('Previous'),
      click: () => this.wizard.previous(),
      disabled: () => !this.wizard.hasPrevious(),
      hidden: () => false,
      position: 'middle'
    },
    {
      id: 'next',
      text: Soho.Locale.translate('Next'),
      click: () => this.wizard.next(),
      isDefault: true,
      disabled: () => this.nextButtonDisabled(),
      hidden: () => false,
      position: 'middle'
    },
    {
      id: 'finish',
      text: 'Finish', // Soho.Locale.translate('Finish'),
      click: () => this.wizard.finish(),
      disabled: () => !this.wizard.hasFinished(),
      hidden: () => false,
      position: 'middle'
    }
  ];

  // public ticks: SohoWizardTick[] = [
  //   { label: 'Select Files', href: 'select-files', state: 'current'},
  //   { label: 'Target Folder', href: 'target-folder'},
  //   { label: 'Backup Rules', href: 'backup-rule'},
  //   { label: 'Validation', href: 'validation-rule'},
  //   { label: 'Confirmation', href: 'confirmation'},
  //   { label: 'Result', href: 'result'}
  // ];

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
