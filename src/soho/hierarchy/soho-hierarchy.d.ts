interface SohoHierarchyLegend {
  value: string;
  label: string;
}

/*
  * @param {String} legend  Pass in custom markdown for the legend structure.
  * @param {String} legendKey  Key to use for the legend matching
  * @param {String} dataset  Hierarchical Data to display
  * @param {Boolean} newData  New data to be inserted into the hierarchy dataset ?
  * @param {String} templateId  Additional product name information to display
  * @param {Boolean} mobileView  If true will only show mobile view, by default using device info to determine.
  * @param {String} beforeExpand  A callback that fires before node expansion of a node.
  * @param {Boolean} paging Display hierarchy for paging if true
 */

interface SohoHierarchyOptions {
  dataset?: Array<any>;
  newData?: Array<any>;
  templateId?: string;
  mobileView?: boolean;
  legend?: Array<SohoHierarchyLegend>;
  legendKey?: string;
  beforeExpand?: Function;
  paging?: boolean;
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

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoHierarchyEvent {
  id: string;
  data: any;
  eventType: 'add' | 'expand' | 'collapse' | 'selected' | 'rightClick' | 'back' | 'forward';
  targetInfo: SohoHierarchyTarget;
  isForwardEvent?: boolean;
  isBackEvent?: boolean;
  isAddEvent?: boolean;
  isExpandEvent?: boolean;
  isCollapseEvent?: boolean;
  isSelectedEvent?: boolean;
  allowLazyLoad?: boolean;
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

interface JQuery {
  hierarchy(options?: SohoHierarchyOptions): JQuery;
}
