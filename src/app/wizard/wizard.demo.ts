import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ViewChild,
  Inject
} from '@angular/core';

import {
  SohoWizardComponent,
  SohoToastService
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-wizard-demo',
  templateUrl: './wizard.demo.html',
})
export class WizardDemoComponent implements OnInit, AfterViewInit {

  @ViewChild(SohoWizardComponent) wizard: SohoWizardComponent;

  constructor(private toastService: SohoToastService) { }
  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.wizard.activated.subscribe((e, tick) => {
      this.toastService.show({
        'title': 'Activated!',
        'message': 'The tick with the label <span style="font-weight: bold;">' + tick + '</span> was activated!'
      });
    });
  }

  previous() {
    this.wizard.previous();
  }

  next() {
    this.wizard.next();
  }

  finish() {
    this.wizard.finish()
  }

  onActivated(e: any) {
  }
}
