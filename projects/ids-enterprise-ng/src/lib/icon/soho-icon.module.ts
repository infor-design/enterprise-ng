import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoIconComponent, SohoIconUseComponent } from './soho-icon.component';
import { SohoIconsComponent } from './soho-icons.component';
import { SohoIconsEmptyComponent } from './soho-icons-empty.component';
import { SohoIconsUpliftComponent } from './soho-icons-uplift.component';
import { SohoIconsExtendedComponent } from './soho-icons-extended.component';
import { SohoIconsEmptyUpliftComponent } from './soho-icons-empty-uplift.component';
import { SohoIconsNewComponent } from './soho-icons-new.component';
import { SohoIconsEmptyNewComponent } from './soho-icons-empty-new.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoIconComponent,
    SohoIconUseComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
    SohoIconsExtendedComponent, // eslint-disable-line import/no-deprecated
    SohoIconsUpliftComponent,
    SohoIconsEmptyUpliftComponent,
    SohoIconsNewComponent,
    SohoIconsEmptyNewComponent
  ],
  exports: [
    SohoIconComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
    SohoIconsExtendedComponent, // eslint-disable-line import/no-deprecated
    SohoIconsUpliftComponent,
    SohoIconsEmptyUpliftComponent,
    SohoIconsNewComponent,
    SohoIconsEmptyNewComponent
  ]
})
export class SohoIconModule { }
