import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoContextMenuDirective,
  SohoContextMenuHeadingComponent,
  SohoContextMenuShortCutTextComponent,
  SohoContextMenuItemComponent,
  SohoContextMenuItemLabelComponent,
  SohoContextMenuSeparatorComponent
} from './soho-context-menu.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoContextMenuDirective,
    SohoContextMenuHeadingComponent,
    SohoContextMenuShortCutTextComponent,
    SohoContextMenuItemComponent,
    SohoContextMenuItemLabelComponent,
    SohoContextMenuSeparatorComponent
  ],
  exports: [
    SohoContextMenuDirective,
    SohoContextMenuHeadingComponent,
    SohoContextMenuShortCutTextComponent,
    SohoContextMenuItemComponent,
    SohoContextMenuItemLabelComponent,
    SohoContextMenuSeparatorComponent
  ]
})
export class SohoContextMenuModule {}
