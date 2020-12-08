import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoBreadcrumbComponent, SohoBreadcrumbListComponent } from './soho-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoBreadcrumbComponent,
    SohoBreadcrumbListComponent
  ],
  exports: [
    SohoBreadcrumbComponent,
    SohoBreadcrumbListComponent
  ]
})

export class SohoBreadcrumbModule { }
