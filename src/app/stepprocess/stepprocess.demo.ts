import {
  Component,
  OnInit, ElementRef, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'soho-stepprocess-demo',
  templateUrl: 'stepprocess.demo.html'
})
export class StepProcessDemoComponent implements OnInit, AfterViewInit {
  constructor(private element: ElementRef) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  stepChange(event: Event) {
    console.log('stepProcessDemoComponent.stepChange');
  }
}
