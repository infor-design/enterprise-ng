import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconComponent } from './soho-icon.component';
import { SohoIconsComponent } from './soho-icons.component';
import { SohoIconsExtendedComponent } from  './soho-icons-extended.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoIconComponent,
    SohoIconsComponent,
    SohoIconsExtendedComponent
  ],
  exports: [
    SohoIconComponent,
    SohoIconsComponent,
    SohoIconsExtendedComponent
  ]
})
export class SohoIconModule {}
