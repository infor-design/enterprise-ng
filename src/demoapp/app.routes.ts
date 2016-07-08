import {provideRouter, RouterConfig} from "@angular/router";
import {ExpandableAreaDemo} from "./expandablearea/expandablearea.demo";
import {IconDemo} from "./icon/icon.demo";
import {ToolbarDemo} from "./toolbar/toolbar.demo";

export const routes: RouterConfig = [
  { path: '',                component: ExpandableAreaDemo }, // default
  { path: 'expandablearea',  component: ExpandableAreaDemo },
  { path: 'toolbar',         component: ToolbarDemo },
  { path: 'icon',            component: IconDemo }
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