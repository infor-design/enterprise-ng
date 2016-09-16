import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoModalDialogComponent } from './modal-dialog.component';
import { SohoModalDialogService } from './modal-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoModalDialogComponent
  ],
  exports: [
    SohoModalDialogComponent
  ],
  providers: [
    SohoModalDialogService
  ]
})
export class SohoModalDialogModule {}
