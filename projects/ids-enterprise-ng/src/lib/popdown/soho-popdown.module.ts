import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoPopDownContentsComponent } from './soho-popdown-contents.component';
import { SohoPopDownDirective } from './soho-popdown.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoPopDownContentsComponent,
    SohoPopDownDirective
  ],
  exports: [
    SohoPopDownContentsComponent,
    SohoPopDownDirective
  ]
})
export class SohoPopDownModule {}
