import { Component } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-target-folder-page',
    templateUrl: 'wizard-target-folder-page.demo.html',
    styles: [
        `:host {
      display:        flex;
      flex:           1;
      flex-direction: column;
  }`
    ],
    standalone: false
})
export class WizardDemoTargetFolderPageComponent {
}
