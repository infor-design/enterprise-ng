import { provideRouter, RouterConfig } from '@angular/router';
import { BusyIndicatorDemoComponent } from './busyindicator/busyindicator-demo.component';
import { ButtonDemoComponent } from './button/button.demo';
import { ExpandableAreaDemoComponent } from './expandablearea/expandablearea.demo';
import { IconDemoComponent } from './icon/icon.demo';
import { TreeServiceDemoComponent } from './tree/tree-service-demo.component';
import { TreeContentDemoComponent } from './tree/tree-content-demo.component';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic-demo.component';
import { DataGridServiceDemoComponent } from './datagrid/datagrid-service-demo.component';
import { DataGridContentDemoComponent } from './datagrid/datagrid-content-demo.component';
import { DataGridDynamicDemoComponent } from './datagrid/datagrid-dynamic-demo.component';
import { ToolbarDemoComponent } from './toolbar/toolbar.demo';
import { TabsBasicDemoComponent } from './tabs/tabs-basic.demo';
import { TabsDataDrivenDemoComponent } from './tabs/tabs-datadriven.demo';
import { TabsDynamicDemoComponent } from './tabs/tabs-dynamic.demo';

export const routes: RouterConfig = [
  { path: '',                 component: ExpandableAreaDemoComponent }, // default
  { path: 'button',           component: ButtonDemoComponent },
  { path: 'busyindicator',    component: BusyIndicatorDemoComponent },
  { path: 'expandablearea',   component: ExpandableAreaDemoComponent },
  { path: 'toolbar',          component: ToolbarDemoComponent },
  { path: 'icon',             component: IconDemoComponent },
  { path: 'tree-dynamic',     component: TreeDynamicDemoComponent },
  { path: 'tree-service',     component: TreeServiceDemoComponent },
  { path: 'tree-content',     component: TreeContentDemoComponent },
  { path: 'datagrid-dynamic', component: DataGridDynamicDemoComponent },
  { path: 'datagrid-service', component: DataGridServiceDemoComponent },
  { path: 'datagrid-content', component: DataGridContentDemoComponent },
  { path: 'tabs-basic',       component: TabsBasicDemoComponent },
  { path: 'tabs-datadriven',  component: TabsDataDrivenDemoComponent },
  { path: 'tabs-dynamic',     component: TabsDynamicDemoComponent },
  // { path: 'accordian',       component: AccordionSampleComponent},
  // { path: 'dropdown',        component: DropdownSampleComponent}
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
