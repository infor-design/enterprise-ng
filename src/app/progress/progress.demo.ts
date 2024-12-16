import {Component } from '@angular/core';

@Component({
    selector: 'app-progress-demo',
    templateUrl: 'progress.demo.html',
    standalone: false
})

export class ProgressDemoComponent {
  /*
   * val is used to set the value in the HTML/DOM
   */
  public val = 30;
  constructor() { }

  update() {
    this.val = 100;
  }

}
