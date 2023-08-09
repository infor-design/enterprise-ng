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
import { SohoIconsAppComponent } from './soho-icons-app.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    SohoIconComponent,
    SohoIconUseComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
    SohoIconsExtendedComponent,
    SohoIconsUpliftComponent,
    SohoIconsEmptyUpliftComponent,
    SohoIconsNewComponent,
    SohoIconsEmptyNewComponent,
    SohoIconsAppComponent
  ],
  exports: [
    SohoIconComponent,
    SohoIconsComponent,
    SohoIconsEmptyComponent,
    SohoIconsExtendedComponent,
    SohoIconsUpliftComponent,
    SohoIconsEmptyUpliftComponent,
    SohoIconsNewComponent,
    SohoIconsEmptyNewComponent,
    SohoIconsAppComponent
  ]
})
export class SohoIconModule { }
