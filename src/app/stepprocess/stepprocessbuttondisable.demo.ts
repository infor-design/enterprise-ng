import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SohoStepProcessComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-stepprocessbuttondisable-demo',
  templateUrl: './stepprocessbuttondisable.demo.html'
})
export class StepProcessBtnDisableDemoComponent implements AfterViewInit {

  @ViewChild('sohoStepProcessComponent') sohoStepProcessComponent: SohoStepProcessComponent;

  ngAfterViewInit() {
    this.sohoStepProcessComponent.previousButtonEnable = false;
    this.sohoStepProcessComponent.nextButtonEnable = false;
    setTimeout(() => {
      this.sohoStepProcessComponent.previousButtonEnable = true;
      this.sohoStepProcessComponent.nextButtonEnable = true;
    }, 5000);
  }
}
