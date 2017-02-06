import {
  Component,
  OnInit, ElementRef, AfterViewInit, ViewChild
} from '@angular/core';
import { SohoStepProcessComponent, SohoBusyIndicatorDirective } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-stepprocessvetoable-demo',
  templateUrl: './stepprocessvetoable.demo.html'
})
export class StepProcessVetoableDemoComponent implements OnInit, AfterViewInit {

  @ViewChild(SohoStepProcessComponent) sohoStepComponent: SohoStepProcessComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  private canViewNode = {
    'node1': true,
    'node1x1': true,
    'node1x2': true,
    'node2': true,
    'node2x1': true,
    'node3': false,
    'node3x1': false,
    'node4': true,
    'node5': true,
    'node6': false,
    'node7': true
  };

  public stepProcessOptions: SohoStepProcessOptions;

  constructor(private element: ElementRef) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.stepProcessOptions = {beforeSelectStep: (node) => {


      this.busyIndicator.activated = true;
      const deferred = $.Deferred();
      const hasPermission = this.canViewNode[node.attr('stepid')];

      // Simulate AJAX
      setTimeout(function (self) {
        if (!hasPermission) {
          alert('Cant go to that step!');
          console.log('Cant go to that step!');
        }

        deferred.resolve(hasPermission);
        self.busyIndicator.activated = false;
      }, 200, this);

      // Return promise
      return deferred.promise();
    }};

    setTimeout(function (self) {
      self.sohoStepComponent.setSelectedStep("node1");
    }, 1, this);
  }

  beforeStepChange(event: Event) {
    console.log('stepProcessVetoableDemoComponent.stepChange');
  }
}
