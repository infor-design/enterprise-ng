import {
  Component,
  OnInit, ElementRef, AfterViewInit
} from '@angular/core';

@Component({
  selector: 'soho-step-control-demo',
  templateUrl: 'step-control.demo.html'
})
export class StepControlDemoComponent implements OnInit, AfterViewInit {
  constructor(private element: ElementRef) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }

  stepChange(event: Event) {
    console.log('stepControlDemoComponent.stepChange');
  }
}
