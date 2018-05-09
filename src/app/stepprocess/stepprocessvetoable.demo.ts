import {
  ChangeDetectorRef,
  Component,
} from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'soho-stepprocessvetoable-demo',
  templateUrl: './stepprocessvetoable.demo.html'
})
export class StepProcessVetoableDemoComponent {

  public infoSubSteps: Array<InfoSubStep> = undefined;
  public showBusyIndicator = false;
  public showStep4 = false;

  public vetoStep2 = false;
  public addStep4 = false;
  public vetoHistorySubStep2 = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  onBeforeSelectStep(event: BeforeSelectStepEvent) {
    this.showBusyIndicator = true;

    const result: BeforeSelectStepResult = {} as any;

    if (event.currentStepId === 'profile' && this.vetoStep2) {

      alert('cant go to that step');
      result.continue = false;

    } else if (event.currentStepId === 'preferences' && this.addStep4) {

      this.showStep4 = true;
      this.changeDetectorRef.detectChanges();
      result.continue = true;
      result.overrideTargetStepId = 'addedstep';

    } else if (event.currentStepId === 'myhistory-1' && this.vetoHistorySubStep2) {

      result.continue = false;
      alert('cant go to that substep');

    } else if (event.targetStepId === 'information' && !this.infoSubSteps) {

      this.infoSubSteps = this.buildInfoSubSteps();
      this.changeDetectorRef.detectChanges();
      result.continue = true;
      result.overrideTargetStepId = 'information-1';

    } else {
      result.continue = true;
    }

    event.response(result);

    this.showBusyIndicator = false;
  }

  private buildInfoSubSteps(): Array<InfoSubStep> {
    return [ {
        id: 'information-1',
        icon: 'empty-circle',
        title: 'Personal - step 7-1',
        content: 'This is Information SubStep1'
      }, {
        id: 'information-2',
        icon: 'empty-circle',
        title: 'Family - step 7-2',
        content: 'This is Information SubStep2'
      }
    ];
  }
}

interface InfoSubStep {
  id: string;
  icon: string;
  title: string;
  content: string;
}
