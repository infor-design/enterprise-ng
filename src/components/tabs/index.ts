import {
  SohoTabsComponent,
  SohoTabsListComponent,
  SohoTabComponent,
  SohoTabTitleComponent,
  SohoTabCountComponent,
  SohoTabSeparatorComponent,
  SohoTabPanelComponent,
} from './tabs.component';

export { SohoTabsComponent } from './tabs.component';

/**
 * Holds all directives usable for the tabs component.
 */
export const TABS_DIRECTIVES = [
  SohoTabsComponent,
  SohoTabsListComponent,
  SohoTabComponent,
  SohoTabTitleComponent,
  SohoTabCountComponent,
  SohoTabSeparatorComponent,
  SohoTabPanelComponent,
];

/**
 * Interface for the jQuery event emitted
 */
export interface TabsEvent {
  currentTarget: HTMLElement;
  data: any;
  delegateTarget: HTMLElement;
  handleObj: Object;
  isTrigger: number;
  namespace: string;
  result: any;
  rnamespace: any;
  target: HTMLElement;
  timeStamp: number;
  type: string;
}
