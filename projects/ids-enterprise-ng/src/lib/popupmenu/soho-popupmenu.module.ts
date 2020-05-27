import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoPopupMenuComponent,
  SohoPopupMenuHeadingComponent,
  SohoPopupMenuShortCutTextComponent,
  SohoPopupMenuItemComponent,
  SohoPopupMenuItemLabelComponent,
  SohoPopupMenuSeparatorComponent
} from './soho-popupmenu.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoPopupMenuComponent,
    SohoPopupMenuHeadingComponent,
    SohoPopupMenuShortCutTextComponent,
    SohoPopupMenuItemComponent,
    SohoPopupMenuItemLabelComponent,
    SohoPopupMenuSeparatorComponent
  ],
  exports: [
    SohoPopupMenuComponent,
    SohoPopupMenuHeadingComponent,
    SohoPopupMenuShortCutTextComponent,
    SohoPopupMenuItemComponent,
    SohoPopupMenuItemLabelComponent,
    SohoPopupMenuSeparatorComponent
  ]
})
export class SohoPopupMenuModule {}
