import { Component } from '@angular/core';
import { SohoAboutService, SohoModalDialogService } from 'ids-enterprise-ng';

@Component({
    selector: 'app-nested-about',
    templateUrl: './nested-about.demo.html',
    standalone: false
})
export class AboutNestedDemoComponent {

  constructor(private aboutService: SohoAboutService, private modalService: SohoModalDialogService) { }

  openAbout() {
    const content = `
      <div style="text-align: center;">
        <button class='hyperlink' type='button' id='nestedAboutDialogButton'>OPEN NESTED</button>
      </div>`;
    this.aboutService
      .about()
      .appName('AppName')
      .productName('ProductName')
      .version('1.0')
      .content(content)
      .open();

    (document.getElementById('nestedAboutDialogButton') as any).onclick = () => {
      this.modalService.message('').options({
        id: 'nested',
        content: 'This is a nested dialog',
        showCloseBtn: true,
        title: 'Nested Dialog',
        triggerButton: '#nestedAboutDialogButton'
      }).open();
    };
  }
}
