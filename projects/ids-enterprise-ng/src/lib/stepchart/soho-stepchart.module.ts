import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SohoStepChartComponent } from "./soho-stepchart.component";

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      SohoStepChartComponent
    ],
    exports: [
      SohoStepChartComponent
    ],
})
export class SohoStepChartModule {}