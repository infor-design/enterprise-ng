import { Component } from '@angular/core';

import {
  SohoAboutService,
  SohoAboutRef
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-about.demo',
  templateUrl: './about.demo.html'
})
export class AboutDemoComponent {
  /** The about dialog reference. */
  about: SohoAboutRef;

  /**
   * Constructor.
   *
   * @param aboutService - the about dialog service.
   */
  constructor(private aboutService: SohoAboutService) {
  }

  openAbout() {

    this.about = this.aboutService
      .about()
      .appName('SoHo Xi')
      .productName('Angular Components')
      .version('ver. 4.3.1')
      .content('<p>Fashionable components for fashionable applications.</p>')
      .open();
  }

}
