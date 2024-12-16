import { Component } from '@angular/core';
import { SohoAboutService, SohoAboutRef } from 'ids-enterprise-ng';

@Component({
    selector: 'app-about.demo',
    templateUrl: 'about.demo.html',
    standalone: false
})
export class AboutDemoComponent {
  /** The about dialog reference. */
  about?: SohoAboutRef;

  /**
   * Constructor.
   *
   * @param aboutService - the about dialog service.
   */
  constructor(private aboutService: SohoAboutService) {
  }

  openAbout() {
    const VERSION_ATTR_NAME = 'data-ids-enterprise-ng-version';
    const version = $('html').attr(VERSION_ATTR_NAME);
    this.about = this.aboutService
      .about()
      .attributes([
        { name: 'id', value: 'about-modal' },
        { name: 'data-automation-id', value: 'about-modal-automation-id' }
      ])
      .appName('Infor Design')
      .productName('Enterprise Angular Components')
      .version(`ver. ${version}`)
      .content('<p>Fashionable components for fashionable applications.</p>')
      .beforeOpen((ref?: SohoAboutRef) => {
        console.log('beforeopen', ref);
        return true;
      })
      .closed((ref?: SohoAboutRef) => {
        console.log('closed', ref);
        return true;
      })
      .afterClose((ref?: SohoAboutRef) => {
        console.log('afterclose', ref);
        return true;
      })
      .open();
  }

}
