import {
  Component,
  QueryList,
  AfterViewInit,
  ViewChild,
  Inject,
  ContentChild
} from '@angular/core';

import {
  SohoWizardComponent,
  SohoProgressComponent,
  SohoToastService
} from 'ids-enterprise-ng';

import { WizardDemoResultPageComponent } from './wizard-result-page.demo';

@Component({
  selector: 'soho-wizard-demo',
  templateUrl: './wizard.demo.html',
})
export class WizardDemoComponent {
  @ViewChild(SohoWizardComponent) wizard: SohoWizardComponent;

  public buttons = [
    {
      id: 'prevous',
      text: Soho.Locale.translate('Previous'),
      click: () => { this.wizard.previous(); },
      disabled: () => !this.wizard.hasPrevious(),
      position: 'middle'
    },
    {
      id: 'next',
      text: Soho.Locale.translate('Next'),
      click: () => { this.wizard.next(); },
      isDefault: true,
      disabled: () => this.nextButtonDisabled(),
      position: 'middle'
    },
    {
      id: 'finish',
      text: 'Finish', // Soho.Locale.translate('Finish'),
      click: () => { this.wizard.finish(); },
      disabled: () => !this.wizard.hasFinished(),
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

  constructor(private toastService: SohoToastService) {
  }

  nextButtonDisabled() {
    return this.wizard.currentTickId === 'confirmation';
  }

  onActivated(e: SohoWizardEvent) {
    console.log('The tick with the label e.tick.text()');
  }
}
