/**
 * Soho Tree Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery tree control.
 */

/**
 * The possible options available to control the position of the popup.
 */
type SohoTreeSelectable = 'single' | 'multiple';

/**
 * The available options for expand target.
 * `node` can toggle by clicking on icon or node text.
 * `icon` allows to toggle when clicking only the icon portion of the tree node.
 */
type SohoExpandTarget = 'node' | 'icon';

/**
 * Tree options.
 */
interface SohoTreeOptions {
  /** Tree selection setting. */
  selectable?: SohoTreeSelectable;

  /** Only applicable when selectable is 'multiple' */
  hideCheckboxes?: boolean;

  /** Context Menu to add to nodes */
  menuId?: string;

  /** The icon used when a tree folder node is open. */
  folderIconOpen?: string;

  /** The icon used when a tree folder node is open. */
  folderIconClosed?: string;

  /** If `true`, allows nodes to become sortable (reorderable) */
  sortable?: boolean | string;

  /** If defined as a function, fires that function as a callback before the selection on a node occurs. */
  onBeforeSelect?: Function;

  /** If defined as a function, fires that function as a node is expanded. */
  onExpand?: Function;

  /** If defined as a function, fires that function as a node is collapsed. */
  onCollapse?: Function;

  /** The initial data set to display, should contain at least one node. */
  dataset?: SohoTreeNode[];

  /** Function used to provide the source of the tree data. */
  source?: SohoTreeSourceFunction;

  /** If set to `icon` will allows to toggle when clicking only the icon portion of node. */
  expandTarget?: SohoExpandTarget;

  /** If `true`, allows separate icon button for expand/collapse. */
  useExpandTarget?: boolean;

  /** The icon used for expand target button when a tree folder node is open. */
  expandIconOpen?: string;

  /** The icon used for expand target button when a tree folder node is closed. */
  expandIconClosed?: string;

  /** If `true`, will rotate expand target plus-minus icon. */
  expandPlusminusRotate?: boolean;

  /** If `true`, allows show children count beside the node name text. */
  showChildrenCount?: boolean;

  /** If `true`, allows to auto count the children. */
  childrenAutoCount?: boolean;
}

type SohoTreeSourceFunction = (
  event: SohoTreeEvent,
  response: SohoTreeResponseFunction
) => void;

type SohoTreeResponseFunction = (
  data: SohoTreeNode[]
) => void;

/**
 * This is an interface mapping for the TreeNode defined
 * within the Soho jQuery Control.
 */
interface SohoTreeNode {
  /** Unique identifier for this node in the tree. */
  id?: string;

  /** The text for the node. */
  text?: string;

  // The icon for the node.
  icon?: string;

  // Is the node disabled
  disabled?: boolean;

  // Is this the parent? The element?
  node?: SohoTreeNode;

  // Children.
  children?: SohoTreeNode[];

  // Children.
  badge?: SohoTreeBadge;

  // Is this node to be displayed open.
  open?: boolean;

  // Is this node selected?
  selected?: boolean;

  href?: string;

  // Data associated with the tree node.
  data?: any;

  /**  */
  focus?: boolean;

  // hide check box for particular node
  hideCheckbox?: boolean;

  // specify type of control to render for node
  type?: string;  // supported type- dropdown, anchor

  // parent node or parent node Id
  parent?: any;
}

interface SohoTreeBadge {
  /* The type of badge (info ect) */
  type?: string;

  /** The text for the badge. */
  text?: string;
}

/**
 * This is an interface mapping for the EnablementStates array.
 */
interface SohoTreeEnablementStates {
  /** Unique identifier for this node in the tree. */
  nodeId?: string;

  /** The state (enabled or disabled) */
  state?: string;
}

/**
 * This interface represents the pub Api exposed by the
 * Soho tree control.
 */
interface SohoTreeStatic {
  /** Control options. */
  settings: SohoTreeOptions;

  /**
   * Loads the dataset into the tree, replacing any existing
   * tree nodes.
   *
   * @param dataset - the root nodes to display.
   */
  loadData(dataset: SohoTreeNode[]): void;

  /**
   * Set the focus on the specified tree node.
   *
   * @param node - the tree node to set the focus on.
   */
  setFocus(node: SohoTreeNode): void;

  /**
   * Updates the tree with the data in the given tree node.
   *
   * @param node - the tree node to update.
   */
  updateNode(node: SohoTreeNode): void;

  /**
   * Exapnd all nodes.
   */
  expandAll(): void;

  /**
   * Collapse all nodes.
   */
  collapseAll(): void;

  /**
   * Remove the given node.
   */
  removeNode(node: SohoTreeNode): void;

  /**
   * Find a node by it's id.
   */
  findById(id: string): SohoTreeNode;

  /**
   * Set the selected node.
   */
  selectNode(node: SohoTreeNode, focus: boolean): void;

  /**
   * Unselect node.
   */
  unSelectedNode(node: SohoTreeNode, focus: boolean): void;

  /**
   * Returns an array of selected nodes.
   */
  getSelectedNodes(): SohoTreeNode[];

  /**
   * Add the node to the given location.
   */
  addNode(node: SohoTreeNode, location: 'bottom' | 'top' | JQuery, isBeforeOrAfter: string): void;

  /**
   * Toggle the node expanded or collapsed.
  */
  toggleNode(node: SohoTreeNode): void;

  /**
   * Destructor,
   */
  destroy(): void;

  /** Disables the tree from reacting to events. */
  disable(): void;

  /** Enables the tree. */
  enable(): void;

  /**
   * Preserves all nodes' enablement states in the Tree component
   */
  preserveEnablementState(): SohoTreeNode[];

  /**
   * Restores all nodes' original enablement states in the Tree component
   */
  restoreEnablementState(): void;
}

interface SohoTreeEvent {
  /** HTML Element */
  node: HTMLElement;

  /** Tree node. */
  data: SohoTreeNode;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  tree: SohoTreeStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  tree(options?: SohoTreeOptions): JQuery;

  on(events: 'sortstart', handler: JQuery.EventHandlerBase<any, SohoTreeEvent>): this;
  on(events: 'sortend', handler: JQuery.EventHandlerBase<any, SohoTreeEvent>): this;
}
