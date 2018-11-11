import { Component, HostBinding, OnInit, AfterViewChecked } from '@angular/core';

import { SohoRenderLoopService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-masthead-demo',
  templateUrl: './masthead.demo.html',
})
export class SohoMastheadDemoComponent implements OnInit, AfterViewChecked {

  public renderLoopCount = 0;

  public running = true;

  @HostBinding('class.masthead') get isMasthead() { return true; }
  @HostBinding('style.display') get isDisplayBlock() { return 'block'; }

  constructor(
    private readonly renderLoop: SohoRenderLoopService) { }

  ngOnInit() {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewChecked() {
    // Display the current render loop in real time
    setTimeout(() => {
      // This forces a view refresh.
      this.renderLoopCount = this.renderLoop.getCurrentCount();
    });
  }

  toggleRenderLoop() {
    if (this.running) {
      this.renderLoop.stop();
    } else {
      this.renderLoop.start();
    }
    this.running = !this.running;

    console.log(`${this.running}`);
  }
}
