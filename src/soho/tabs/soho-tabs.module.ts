import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SohoTabsComponent,
  SohoTabListContainerComponent,
  SohoTabListComponent,
  SohoTabComponent,
  SohoTabTitleComponent,
  SohoTabCountComponent,
  SohoTabSeparatorComponent,
  SohoTabPanelContainerComponent,
  SohoTabPanelComponent,
} from './soho-tabs.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    SohoTabsComponent,
    SohoTabListContainerComponent,
    SohoTabListComponent,
    SohoTabComponent,
    SohoTabTitleComponent,
    SohoTabCountComponent,
    SohoTabSeparatorComponent,
    SohoTabPanelContainerComponent,
    SohoTabPanelComponent,
  ],
  exports: [
    SohoTabsComponent,
    SohoTabListContainerComponent,
    SohoTabListComponent,
    SohoTabComponent,
    SohoTabTitleComponent,
    SohoTabCountComponent,
    SohoTabSeparatorComponent,
    SohoTabPanelContainerComponent,
    SohoTabPanelComponent,
  ]
})
export class SohoTabsModule {}
