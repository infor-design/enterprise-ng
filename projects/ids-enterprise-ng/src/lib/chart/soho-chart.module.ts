import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoChartComponent } from './soho-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoChartComponent
  ],
  exports: [
    SohoChartComponent
  ]
})
export class SohoChartModule {}
