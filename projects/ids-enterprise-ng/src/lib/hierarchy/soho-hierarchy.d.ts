interface SohoHierarchyLegend {
  value: string;
  label: string;
}

type SohoHierarchyLayoutType = 'horizontal' | 'paging' | 'mobileOnly' | 'stacked';
/*
  * @param legend  Pass in custom markdown for the legend structure.
  * @param legendKey  Key to use for the legend matching
  * @param dataset  Hierarchical Data to display
  * @param newData  New data to be inserted into the hierarchy dataset ?
  * @param templateId  Additional product name information to display
  * @param mobileView  If true will only show mobile view, by default using device info to determine.
  * @param beforeExpand  A callback that fires before node expansion of a node.
  * @param paging Display hierarchy for paging if true
 */

interface SohoHierarchyOptions {
  dataset?: Array<any>;
  newData?: Array<any>;
  templateId?: string;
  legend?: Array<SohoHierarchyLegend>;
  legendKey?: string;
  beforeExpand?: Function;
  layout?: SohoHierarchyLayoutType;
}

/**
 * structure used for stacked layout type.
 */
interface SohoStackedHierarchyData<T> {

  /** used for stacked layout */
  ancestorPath?: T[] | null;

  /** used for stacked layout */
  centeredNode?: T;

  /** used for stacked layout */
  children?: T[];
}

/**
 *  id: leaf id
 *  isLeaf: has no children
 *  isExpanded: leaf is expanded
 *  isLoaded: leaf's children have already been loaded
 *  children: child data
 */
interface SohoHierarchyData extends SohoHierarchyDataState {
  id?: string;
  children?: Array<any>;
  isLeaf?: boolean;

  /** used for stacked layout */
  ancestorPath?: SohoHierarchyData[] | null;

  /** used for stacked layout */
  centeredNode?: SohoHierarchyData[];
}

interface SohoHierarchyDataState {
  isExpanded?: boolean;
  isLoaded?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * listview.
 */
interface SohoHierarchyStatic {
  /** Access to the control's options block. */
  settings: SohoHierarchyOptions;

  /** Adds new data into the hierarchy control */
  add(nodeId: string, dataSet: Array<any>, newData: Array<any>): void;

  /** Reload/ re-init hierarchy control */
  reload(options: SohoHierarchyOptions): void;

  /** Updates actions for action menu on a leaf */
  updateActions(eventInfo: SohoHierarchyEvent, updatedActions: Array<SohoHierarchyAction>): void;

  /** Used to manually select a leaf */
  selectLeaf(leafId: string): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoHierarchyEvent {
  id: string;
  data: any;
  actionReference: any;
  eventType: 'add' | 'expand' | 'collapse' | 'selected' | 'rightClick' | 'back' | 'forward' | 'actions' | 'action';
  targetInfo: SohoHierarchyTarget;
  isForwardEvent?: boolean;
  isBackEvent?: boolean;
  isAddEvent?: boolean;
  isExpandEvent?: boolean;
  isCollapseEvent?: boolean;
  isSelectedEvent?: boolean;
  isActionsEvent?: boolean;
  isActionEvent?: boolean;
  allowLazyLoad?: boolean;
}

interface SohoHierarchyAction {
  value: string;
  url?: string;
  actionReference?: any;
  data?: any;
  disabled?: boolean;
}

interface SohoHierarchyDoubleClickEvent {
  event: Event;
  data: any;
}

interface SohoHierarchyTarget {
  pageX: number;
  pageY: number;
  target: HTMLElement;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  hierarchy: SohoHierarchyStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  hierarchy(options?: SohoHierarchyOptions): JQuery;
}
