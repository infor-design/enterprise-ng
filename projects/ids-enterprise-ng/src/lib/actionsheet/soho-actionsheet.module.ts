import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoActionsheetComponent } from './soho-actionsheet.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoActionsheetComponent
  ],
  exports: [
    SohoActionsheetComponent
  ],
})
export class SohoActionsheetModule { }
