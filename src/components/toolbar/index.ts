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
 * @deprecated use SOHO_TOOLBAR_DIRECTIVES instead.
 */
export const TOOLBAR_DIRECTIVES = SOHO_TOOLBAR_DIRECTIVES;

/**
 * Export all toolbar components in case only a few are needed.
 */
export * from './toolbar.component';

/**
 * Interface for the jQuery event emitted
 */
export interface SohoToolbarEvent {
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
