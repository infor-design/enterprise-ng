import {
  Component,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  SohoProgressComponent,
  SohoWizardPageComponent,
  SohoBusyIndicatorDirective
} from 'ids-enterprise-ng';

@Component({
  selector: 'app-result-page',
  templateUrl: 'wizard-result-page.demo.html',
  styles: [
    `:host {
      display:        flex;
      flex:           1;
      flex-direction: column;
  }`]
})
export class WizardDemoResultPageComponent implements AfterViewInit {

  @ViewChild(SohoProgressComponent) progress?: SohoProgressComponent;

  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyindicator?: SohoBusyIndicatorDirective;

  public current = 0;

  public total = 4;

  public imported = 0;

  public validated = 0;

  public rejected = 0;

  public folders = 0;

  constructor(private page: SohoWizardPageComponent) {
  }

  ngAfterViewInit() {
    (this.busyindicator as any).text = `Importing ${this.current} of ${this.total} ...`;
    this.page.activated.subscribe(() => {
      this.current = 0;
      this.validated = 0;
      this.busyindicator?.open();
      (this.busyindicator as any).text = `Imported ${this.current} of ${this.total} ...`;
      if (this.progress) {
        this.progress.progressValue = ((this.current / this.total) * 100);
      }
     setTimeout(() => { this.update(); }, 5000); });
  }

  update() {
    this.current++;
    this.validated++;
    if (this.progress) {
       this.progress.progressValue = ((this.current / this.total) * 100);
    }

    (this.busyindicator as any).text = `Imported ${this.current} of ${this.total} ...`;

    if (this.current < this.total) {
      setTimeout(() => { this.update(); }, 3000);
    } else {
      this.busyindicator?.close(false);
    }
  }
}
