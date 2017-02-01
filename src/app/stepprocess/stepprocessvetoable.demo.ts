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
  }

  public stepProcessOptions: SohoStepProcessOptions;

  constructor(private element: ElementRef) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.stepProcessOptions = {beforeSelectStep: (node) => {
      this.busyIndicator.activated = true;
      let deferred = $.Deferred();
      let hasPermission = this.canViewNode[node.attr('stepid')];

      // Simulate AJAX
      setTimeout(function (busyIndicator) {
        if (!hasPermission) {
          alert("Cant go to that step!");
          console.log("Cant go to that step!");
        }
        deferred.resolve(hasPermission);
        busyIndicator.activated = false;
      }, 2000, this.busyIndicator);

      // Return promise
      return deferred.promise();
    }};
  }

  beforeStepChange(event: Event) {
    console.log('stepProcessVetoableDemoComponent.stepChange');
  }
}
