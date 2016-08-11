import {
  SohoToolbarComponent,
  SohoToolbarButtonSetComponent,
  SohoToolbarTitleComponent,
  SohoToolbarNavButtonComponent,
  SohoSectionTitleComponent,
  SohoPageTitleComponent,
  SohoToolbarMoreButtonComponent
} from './toolbar.component';

/**
 * Holds all directives usable for toolbar
 */
export const TOOLBAR_DIRECTIVES = [
  SohoToolbarComponent,
  SohoToolbarButtonSetComponent,
  SohoToolbarTitleComponent,
  SohoToolbarNavButtonComponent,
  SohoSectionTitleComponent,
  SohoPageTitleComponent,
  SohoToolbarMoreButtonComponent
];

/**
 * Interface for the jQuery event emitted
 */
export interface ToolbarEvent {
  currentTarget: HTMLElement;
  item: any;
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
