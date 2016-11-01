import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoPopupMenuComponent,
  SohoPopupMenuHeadingComponent,
  SohoPopupMenuItemComponent,
  SohoPopupMenuItemLabelComponent,
  SohoPopupMenuSeparatorComponent
} from './soho-popupmenu.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoPopupMenuComponent,
    SohoPopupMenuHeadingComponent,
    SohoPopupMenuItemComponent,
    SohoPopupMenuItemLabelComponent,
    SohoPopupMenuSeparatorComponent
  ],
  exports: [
    SohoPopupMenuComponent,
    SohoPopupMenuHeadingComponent,
    SohoPopupMenuItemComponent,
    SohoPopupMenuItemLabelComponent,
    SohoPopupMenuSeparatorComponent
  ]
})
export class SohoPopupMenuModule {}
