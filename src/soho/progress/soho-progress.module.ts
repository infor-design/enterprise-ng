import { NgModule } from '@angular/core';
import { SohoProgressComponent } from './soho-progress.component';
import { SohoProgressBarComponent } from './soho-progress.component';

@NgModule({
  imports: [],
  declarations: [
    SohoProgressComponent,
    SohoProgressBarComponent
  ],
  exports: [
    SohoProgressComponent,
    SohoProgressBarComponent
  ]
})
export class SohoProgressModule {}
