import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class SohoRenderLoopService {
  private renderLoopCount = 0;

  constructor(private ngZone: NgZone) { }

  /**
   * Start the entire render loop
   */
  start() {
    this.ngZone.runOutsideAngular(() => {
      Soho.renderLoop.register(() => {
        this.renderLoopCount++;
      }, undefined, 'angular-timer-count');
      Soho.renderLoop.start();
    });
  }

  /**
   * Stops the entire render loop
   */
  stop() {
    Soho.renderLoop.stop();
  }

  getCurrentCount(): number {
    return this.renderLoopCount;
  }
}
