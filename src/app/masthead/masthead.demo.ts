import { Component, HostBinding, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';

import { SohoRenderLoopService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-masthead-demo',
  templateUrl: 'masthead.demo.html',
})
export class SohoMastheadDemoComponent implements OnInit, AfterViewChecked {

  @HostBinding('class.masthead') get isMasthead() { return true; }
  @HostBinding('style.display') get isDisplayBlock() { return 'block'; }

  constructor(private readonly renderLoop: SohoRenderLoopService) { }

  public readonly DEFAULT_IMAGE_URL
    // tslint:disable-next-line: max-line-length
    = 'data:image/png;base64,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';

  public renderLoopCount = 0;

  public running = true;

  ngOnInit() {
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
  }

}
