import {
  Component,
  OnInit, ElementRef, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'soho-stepprocess-data-driven-demo',
  templateUrl: './stepprocess-data-driven.demo.html'
})
export class StepProcessDataDrivenDemoComponent implements OnInit, AfterViewInit {

  public steps: Array<{
                  id: string,
                  title: string,
                  icon: string,
                  content?: string,
                  substeps?: Array<{id: string, title: string, icon: string, content: string}>
                }>;
  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.steps = [
      { id: 'step1', title: 'Step 1', icon: 'error',
        substeps: [
          { id: 'step1Sub1', title: 'Step 1 Sub 1', icon:'empty-circle', content: 'Step 1 Sub 1 content' }, // tslint:disable-line
          { id: 'step1Sub2', title: 'Step 1 Sub 2', icon:'empty-circle', content: 'Step 1 Sub 2 content' }, // tslint:disable-line
        ]
      }, // tslint:disable-line
      { id: 'step2', title: 'Step 2', icon: 'confirm', content: 'Step 2 content' }, // tslint:disable-line
      { id: 'step3', title: 'Step 3', icon: 'empty-circle',
        substeps: [
          { id: 'step3Sub1', title: 'Step 3 Sub 1', icon:'empty-circle', content: 'Step 3 Sub 1 content' }, // tslint:disable-line
          { id: 'step3Sub2', title: 'Step 3 Sub 2', icon:'error', content: 'Step 3 Sub 2 content' }, // tslint:disable-line
          { id: 'step3Sub3', title: 'Step 3 Sub 3', icon:'confirm', content: 'Step 3 Sub 3 content' }, // tslint:disable-line
        ]
      }, // tslint:disable-line
      { id: 'step4', title: 'Step 4', icon: 'empty-circle', content: 'Step 4 content' }, // tslint:disable-line
      { id: 'step5', title: 'Step 5', icon: 'half-empty-circle',
        substeps: [
          { id: 'step5Sub1', title: 'Step 5 Sub 1', icon:'confirm', content: 'Step 5 Sub 1 content' }, // tslint:disable-line
          { id: 'step5Sub2', title: 'Step 5 Sub 2', icon:'empty-circle', content: 'Step 5 Sub 2 content' }, // tslint:disable-line
          { id: 'step5Sub3', title: 'Step 5 Sub 3', icon:'error', content: 'Step 5 Sub 3 content' }, // tslint:disable-line
          { id: 'step5Sub4', title: 'Step 5 Sub 4', icon:'empty-circle', content: 'Step 5 Sub 4 content' }, // tslint:disable-line
          { id: 'step5Sub5', title: 'Step 5 Sub 5', icon:'empty-circle', content: 'Step 5 Sub 5 content' }, // tslint:disable-line
          { id: 'step5Sub6', title: 'Step 5 Sub 6', icon:'error', content: 'Step 5 Sub 6 content' }, // tslint:disable-line
        ] }, // tslint:disable-line
      { id: 'step6', title: 'Step 6', icon:'empty-circle', content: 'Step 6 content' }, // tslint:disable-line
      { id: 'step7', title: 'Step 7', icon:'error', content: 'Step 7 content' }, // tslint:disable-line
      { id: 'step8', title: 'Step 8', icon:'confirm', content: 'Step 8 content' }, // tslint:disable-line
      { id: 'step9', title: 'Step 9', icon:'confirm', content: 'Step 9 content' }, // tslint:disable-line
    ];
  }

  ngAfterViewInit() { }

  stepChange(event: Event) {
    console.log('stepProcessDataDrivenDemoComponent.stepChange');
  }
}
