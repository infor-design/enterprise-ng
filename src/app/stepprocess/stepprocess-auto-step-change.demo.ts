import {
  Component,
  OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList
} from '@angular/core';
import { SohoStepListItemComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-stepprocess-auto-step-change-demo',
  templateUrl: 'stepprocess-auto-step-change.demo.html'
})
export class StepProcessAutoStepChangeComponent implements OnInit, AfterViewInit {

  @ViewChildren(SohoStepListItemComponent) stepListItems?: QueryList<SohoStepListItemComponent>;

  public steps?: Array<{
    id: string,
    title: string,
    icon: string,
    content?: string,
    substeps?: Array<{ id: string, title: string, icon: string, content: string }>
  }>;
  constructor() { }

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
          { id: 'step3Sub3', title: 'Step 3 Sub 3', icon: 'success', content: 'Step 3 Sub 3 content' }, // eslint-disable-line
        ]
      }, // eslint-disable-line
      { id: 'step4', title: 'Step 4', icon: 'empty-circle', content: 'Step 4 content' }, // eslint-disable-line
      {
        id: 'step5', title: 'Step 5', icon: 'half-empty-circle',
        substeps: [
          { id: 'step5Sub1', title: 'Step 5 Sub 1', icon: 'success', content: 'Step 5 Sub 1 content' }, // eslint-disable-line
          { id: 'step5Sub2', title: 'Step 5 Sub 2', icon: 'empty-circle', content: 'Step 5 Sub 2 content' }, // eslint-disable-line
          { id: 'step5Sub3', title: 'Step 5 Sub 3', icon: 'error', content: 'Step 5 Sub 3 content' }, // eslint-disable-line
          { id: 'step5Sub4', title: 'Step 5 Sub 4', icon: 'empty-circle', content: 'Step 5 Sub 4 content' }, // eslint-disable-line
          { id: 'step5Sub5', title: 'Step 5 Sub 5', icon: 'empty-circle', content: 'Step 5 Sub 5 content' }, // eslint-disable-line
          { id: 'step5Sub6', title: 'Step 5 Sub 6', icon: 'error', content: 'Step 5 Sub 6 content' }, // eslint-disable-line
        ]
      }, // eslint-disable-line
      { id: 'step6', title: 'Step 6', icon: 'empty-circle', content: 'Step 6 content' }, // eslint-disable-line
      { id: 'step7', title: 'Step 7', icon: 'error', content: 'Step 7 content' }, // eslint-disable-line
      { id: 'step8', title: 'Step 8', icon: 'success', content: 'Step 8 content' }, // eslint-disable-line
      { id: 'step9', title: 'Step 9', icon: 'success', content: 'Step 9 content' }, // eslint-disable-line
    ];
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.stepListItems) {
        const stepListItemsLength = this.stepListItems.toArray().length;
        const stepNo = Math.floor(Math.random() * stepListItemsLength);
        this.stepListItems.toArray()[stepNo].isSelected = true;
        console.log(stepNo);
        console.log('step changed');
      }
    }, 5000);
    setTimeout(() => {
      if (this.stepListItems) {
        const stepListItemsLength = this.stepListItems.toArray().length;
        const stepNo = Math.floor(Math.random() * stepListItemsLength);
        this.stepListItems.toArray()[stepNo].isSelected = true;
        console.log(stepNo);
        console.log('step changed');
      }
    }, 7000);
    setTimeout(() => {
      if (this.stepListItems) {
        const stepListItemsLength = this.stepListItems.toArray().length;
        const stepNo = Math.floor(Math.random() * stepListItemsLength);
        this.stepListItems.toArray()[stepNo].isSelected = true;
        console.log(stepNo);
        console.log('step changed');
      }
    }, 9000);
    setTimeout(() => {
      if (this.stepListItems) {
        const stepListItemsLength = this.stepListItems.toArray().length;
        const stepNo = Math.floor(Math.random() * stepListItemsLength);
        this.stepListItems.toArray()[stepNo].isSelected = true;
        console.log(stepNo);
        console.log('step changed');
      }
    }, 11000);

  }

  stepChange(_event: Event) {
    console.log('stepProcessDataDrivenDemoComponent.stepChange');
  }
}
