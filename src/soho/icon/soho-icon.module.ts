import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconComponent, SohoIconUseComponent } from './soho-icon.component';
import { SohoIconsComponent } from './soho-icons.component';
import { SohoIconsExtendedComponent } from  './soho-icons-extended.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoIconComponent,
    SohoIconUseComponent,
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
