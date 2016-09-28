import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconComponent } from './icon.component';
import { SohoIconsComponent } from './icons.component';
import { SohoIconsExtendedComponent } from  './icons-extended.component';

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
