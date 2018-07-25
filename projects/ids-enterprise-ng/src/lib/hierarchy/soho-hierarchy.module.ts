import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoHierarchyComponent, SohoHierarchyLeafTemplateComponent } from './soho-hierarchy.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SohoHierarchyComponent,
    SohoHierarchyLeafTemplateComponent
  ],
  exports: [
    SohoHierarchyComponent,
    SohoHierarchyLeafTemplateComponent
  ]
})
export class SohoHierarchyModule {}
