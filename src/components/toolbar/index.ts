import {
  ToolbarComponent,
  ToolbarTitleComponent,
  ToolbarButtonSetComponent,
} from './toolbar.component';

/**
 * Holds all directives usable for toolbar
 */
export const TOOLBAR_DIRECTIVES = [
  ToolbarComponent,
  ToolbarTitleComponent,
  ToolbarButtonSetComponent,
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
