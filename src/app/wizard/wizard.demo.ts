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
  currentTick = 1;


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

  select() {
    this.wizard.activate($(`[tickId=${this.currentTick}]`));
  }

  previous() {
    console.log(`previous ${this.currentTick}`);
    if (this.currentTick > 1) { this.currentTick--; }
    this.select();
  }

  next() {
    console.log(`next ${this.currentTick}`);
    if (this.currentTick < 4) { this.currentTick++; }
    this.select();
  }

  finish() {
    console.log(`finish ${this.currentTick}`);
    this.currentTick = 4;
    this.select();
  }

  onActivated(e: any) {
    this.currentTick = <number>e[0].getAttribute('tickid');
  }
}
