import { Component, ViewChild, AfterViewInit } from '@angular/core';
// @ts-ignore
import { SohoStepProcessComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-stepprocessbuttondisable-demo',
  templateUrl: 'stepprocessbuttondisable.demo.html'
})
export class StepProcessBtnDisableDemoComponent implements AfterViewInit {

  @ViewChild('sohoStepProcessComponent', { static: true }) sohoStepProcessComponent?: SohoStepProcessComponent;

  ngAfterViewInit() {
    (this.sohoStepProcessComponent as any).previousButtonEnable = false;
    (this.sohoStepProcessComponent as any).nextButtonEnable = false;
    setTimeout(() => {
      (this.sohoStepProcessComponent as any).previousButtonEnable = true;
      (this.sohoStepProcessComponent as any).nextButtonEnable = true;
    }, 5000);
  }
}
