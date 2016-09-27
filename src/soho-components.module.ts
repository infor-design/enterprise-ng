import { NgModule } from '@angular/core';
import { SohoApplicationMenuModule } from './components/application-menu/application-menu.module';
import { SohoBusyIndicatorModule } from './components/busyindicator/busyindicator.module';
import { SohoButtonModule } from './components/button/button.module';
import { SohoDatagridModule } from './components/datagrid/datagrid.module';
import { SohoDatepickerModule } from './components/datepicker/datepicker.module';
import { SohoDropdownModule } from './components/dropdown/dropdown.module';
import { SohoEditorModule } from './components/editor/soho-editor.module';
import { SohoExpandableAreaModule } from './components/expandablearea/expandablearea.module';
import { SohoHeaderModule } from './components/header/header.module';
import { SohoIconModule } from './components/icon/icon.module';
import { SohoListviewModule } from './components/listview/listview.module';
import { SohoLookupModule } from './components/lookup/lookup.module';
import { SohoTabsModule } from './components/tabs/tabs.module';
import { SohoTextareaModule } from './components/textarea/soho-textarea.module';
import { SohoToolbarModule } from './components/toolbar/toolbar.module';
import { SohoMaskModule } from './directives/mask/soho-mask.module';
import { SohoMastheadModule } from './components/masthead/masthead.module';
import { SohoMenuButtonModule } from './components/menu-button/menu-button.module';
import { SohoSearchfieldModule } from './components/searchfield/searchfield.module';
import { SohoSplitterModule } from './components/splitter/splitter.module';
import { SohoTreeModule } from './components/tree/tree.module';
import { SohoInputValidateModule } from './directives/soho-input-validate.module';
import { SohoPersonalizeModule } from './directives/soho-personalize.module';
import { SohoTimepickerModule } from './components/timepicker/soho-timepicker.module';
import { SohoToastModule } from './services/toast.module';

@NgModule({
  imports: [
    SohoApplicationMenuModule,
    SohoBusyIndicatorModule,
    SohoButtonModule,
    SohoDatagridModule,
    SohoDatepickerModule,
    SohoDropdownModule,
    SohoEditorModule,
    SohoExpandableAreaModule,
    SohoHeaderModule,
    SohoIconModule,
    SohoInputValidateModule,
    SohoListviewModule,
    SohoLookupModule,
    SohoMaskModule,
    SohoMastheadModule,
    SohoMenuButtonModule,
    SohoPersonalizeModule,
    SohoSearchfieldModule,
    SohoSplitterModule,
    SohoTabsModule,
    SohoTextareaModule,
    SohoTimepickerModule,
    SohoToastModule,
    SohoToolbarModule,
    SohoTreeModule
  ],
  declarations: [
  ],
  exports: [
    SohoApplicationMenuModule,
    SohoBusyIndicatorModule,
    SohoButtonModule,
    SohoDatagridModule,
    SohoDatepickerModule,
    SohoDropdownModule,
    SohoEditorModule,
    SohoExpandableAreaModule,
    SohoHeaderModule,
    SohoIconModule,
    SohoInputValidateModule,
    SohoListviewModule,
    SohoLookupModule,
    SohoMaskModule,
    SohoMastheadModule,
    SohoMenuButtonModule,
    SohoPersonalizeModule,
    SohoSearchfieldModule,
    SohoSplitterModule,
    SohoTabsModule,
    SohoTextareaModule,
    SohoTimepickerModule,
    SohoToastModule,
    SohoToolbarModule,
    SohoTreeModule
  ]
})
export class SohoComponentsModule {}
