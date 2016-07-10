import { provideRouter, RouterConfig } from "@angular/router";
import { ExpandableAreaDemo } from "./expandablearea/expandablearea.demo";
import { IconDemo } from "./icon/icon.demo";
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service-demo.component';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content-demo.component';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic-demo.component';

export const routes: RouterConfig = [
  { path: '',                component: ExpandableAreaDemo }, // default
  { path: 'expandablearea',  component: ExpandableAreaDemo },
  { path: 'icon',            component: IconDemo },
  { path: 'datagrid-dynamic',    component: DataGridDynamicDemoComponent },
  { path: 'datagrid-service',    component: DataGridServiceDemoComponent },
  { path: 'datagrid-content',    component: DataGridContentDemoComponent },
  
  // { path: 'toolbar',         component: ToolbarSampleComponent},
  // { path: 'tabs-basic',      component: TabsBasicSampleComponent},
  // { path: 'tabs-datadriven', component: TabsDataDrivenSampleComponent},
  // { path: 'tabs-dynamic',    component: TabsDynamicSampleComponent},
  // { path: 'accordian',       component: AccordionSampleComponent},
  // { path: 'dropdown',        component: DropdownSampleComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
