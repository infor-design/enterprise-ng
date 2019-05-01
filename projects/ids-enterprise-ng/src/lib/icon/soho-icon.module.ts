import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconComponent, SohoIconUseComponent } from './soho-icon.component';
import { SohoIconsComponent } from './soho-icons.component';
import { SohoIconsEmptyComponent } from './soho-icons-empty.component';
import { SohoIconsUpliftComponent } from './soho-icons-uplift.component';
import { SohoIconsExtendedComponent } from './soho-icons-extended.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoIconComponent,
    SohoIconUseComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
// tslint:disable-next-line: deprecation
    SohoIconsExtendedComponent,
    SohoIconsUpliftComponent
  ],
  exports: [
    SohoIconComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
    SohoIconsExtendedComponent,
    SohoIconsUpliftComponent
  ]
})
export class SohoIconModule {}
