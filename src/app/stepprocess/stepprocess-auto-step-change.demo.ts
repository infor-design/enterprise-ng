import {
  Component,
  OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList
} from '@angular/core';
import { SohoStepListItemComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-stepprocess-auto-step-change-demo',
  templateUrl: 'stepprocess-auto-step-change.demo.html'
})
export class StepProcessAutoStepChangeComponent implements OnInit {

  public selectedPanelId?: string;

  public steps?: Array<{
    id: string,
    title: string,
    icon: string,
    content?: string,
    substeps?: Array<{ id: string, title: string, icon: string, content: string }>
  }>;

  ngOnInit() {
    this.steps = [
      {
        id: 'step1', title: 'Step 1', icon: 'error',
        substeps: [
          { id: 'step1Sub1', title: 'Step 1 Sub 1', icon: 'empty-circle', content: 'Step 1 Sub 1 content' }, // eslint-disable-line
          { id: 'step1Sub2', title: 'Step 1 Sub 2', icon: 'empty-circle', content: 'Step 1 Sub 2 content' }, // eslint-disable-line
        ]
      }, // eslint-disable-line
      { id: 'step2', title: 'Step 2', icon: 'success', content: 'Step 2 content' }, // eslint-disable-line
      {
        id: 'step3', title: 'Step 3', icon: 'empty-circle',
        substeps: [
          { id: 'step3Sub1', title: 'Step 3 Sub 1', icon: 'empty-circle', content: 'Step 3 Sub 1 content' }, // eslint-disable-line
          { id: 'step3Sub2', title: 'Step 3 Sub 2', icon: 'error', content: 'Step 3 Sub 2 content' }, // eslint-disable-line
        ]
      },
      { id: 'step4', title: 'Step 4', icon: 'success', content: 'Step 4 content' }
    ]
  }


  selectPanel(id: string) {
    this.selectedPanelId = id;
  }

  stepChange(_event: Event) {
    console.log('StepProcessAutoStepChangeComponent.stepChange');
  }
}
