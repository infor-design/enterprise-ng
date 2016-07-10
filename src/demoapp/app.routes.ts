import { provideRouter, RouterConfig } from "@angular/router";
import { ExpandableAreaDemo } from "./expandablearea/expandablearea.demo";
import { IconDemo } from "./icon/icon.demo";
import { TreeServiceDemoComponent } from './tree/tree-service-demo.component';
import { TreeContentDemoComponent } from './tree/tree-content-demo.component';
import { TreeDynamicDemoComponent } from './tree/tree-dynamic-demo.component';

export const routes: RouterConfig = [
  { path: '',                component: ExpandableAreaDemo }, // default
  { path: 'expandablearea',  component: ExpandableAreaDemo },
  { path: 'icon',            component: IconDemo },
  { path: 'tree-dynamic',    component: TreeDynamicDemoComponent },
  { path: 'tree-service',    component: TreeServiceDemoComponent },
  { path: 'tree-content',    component: TreeContentDemoComponent },
  
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
