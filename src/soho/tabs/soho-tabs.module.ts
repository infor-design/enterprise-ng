import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoTabsComponent,
  SohoTabsListComponent,
  SohoTabComponent,
  SohoTabTitleComponent,
  SohoTabCountComponent,
  SohoTabSeparatorComponent,
  SohoTabPanelComponent,
} from './soho-tabs.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTabsComponent,
    SohoTabsListComponent,
    SohoTabComponent,
    SohoTabTitleComponent,
    SohoTabCountComponent,
    SohoTabSeparatorComponent,
    SohoTabPanelComponent,
  ],
  exports: [
    SohoTabsComponent,
    SohoTabsListComponent,
    SohoTabComponent,
    SohoTabTitleComponent,
    SohoTabCountComponent,
    SohoTabSeparatorComponent,
    SohoTabPanelComponent,
  ]
})
export class SohoTabsModule {}
