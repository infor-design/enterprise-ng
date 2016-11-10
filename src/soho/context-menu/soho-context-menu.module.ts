import { NgModule } from '@angular/core';
import { SohoContextMenuDirective } from './soho-context-menu.directive';

@NgModule({
  declarations: [
    SohoContextMenuDirective
  ],
  exports: [
    SohoContextMenuDirective
  ]
})
export class SohoContextMenuModule {}
