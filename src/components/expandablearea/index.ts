import {
  ExpandableAreaComponent,
  ExpandableHeaderComponent,
  ExpandablePaneComponent,
} from './expandablearea.component';

/**
 * Holds all directives usable for expandablearea
 */
export const EXPANDABLEAREA_DIRECTIVES = [
  ExpandableAreaComponent,
  ExpandableHeaderComponent,
  ExpandablePaneComponent,
];

/**
 * Interface for the jQuery event emitted
 */
export interface ExpandableAreaEvent {
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
