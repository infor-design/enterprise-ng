import { Component } from '@angular/core';

@Component({
  selector: 'soho-stepprocess-demo',
  templateUrl: './stepprocess.demo.html'
})
export class StepProcessDemoComponent {
  onSaveClose(event: SohoStepSaveCloseEvent) {
    console.log('onSaveClose fired');
    console.log('currentStepId: ' + event.currentStepId);
  }
}
