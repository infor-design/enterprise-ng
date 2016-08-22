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
export const SOHO_TOOLBAR_DIRECTIVES = [
  SohoToolbarComponent,
  SohoToolbarButtonSetComponent,
  SohoToolbarTitleComponent,
  SohoToolbarNavButtonComponent,
  SohoSectionTitleComponent,
  SohoPageTitleComponent,
  SohoToolbarMoreButtonComponent
];

/**
 * @deprecated changing this to SOHO_TOOLBAR_DIRECTIVES
 */
export const TOOLBAR_DIRECTIVES = SOHO_TOOLBAR_DIRECTIVES;

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
