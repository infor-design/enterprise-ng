/**
 * Soho Tree Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery tree control.
 */

/**
 * The possible options available to control the position of the popup.
 */
type SohoTreeOptionsSelectable = 'single' | 'multiple';

/**
 * Toast options.
 */
interface SohoTreeOptions {
  /** Tree selection setting. */
  selectable?: SohoTreeOptionsSelectable;

  /** Only applicable when selectable is 'multiple' */
  hideCheckboxes?: boolean;

  // The initial data set to display, should contain
  // at least one node.
  dataset?: SohoTreeNode[];

  // Function used to provide the source of the tree data.
  source?: any;
}

/**
 * This is an interface mapping for the TreeNode defined
 * within the Soho jQuery Control.
 */
interface SohoTreeNode {
  /** Unique identifier for this node in the tree. */
  id?: string;

  // The text for the node.
  text?: string;
  // The icon for the node.
  icon?: string;
  // Is the node disabled
  disabled?: boolean;
  // Is this the parent? The element?
  node?: SohoTreeNode;
  // Children.
  children?: SohoTreeNode[];
  // Is this node to be displayed open.
  open?: boolean;
  // Is this node selected?
  selected?: boolean;
  href?: string;
  // Data associated with the tree node.
  data?: any;

  /**  */
  focus?: boolean;
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
  setSelectedNode(node: SohoTreeNode, focus: boolean): void;

  /**
   * Add the node to the given location.
   */
  addNode(node: SohoTreeNode, location: 'bottom' | 'top' | JQuery): void;

  /**
   * Toggle the node expanded or collapsed.
  */
  toggleNode(node: SohoTreeNode);

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoTreeEvent {
  data: SohoTreeNode;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  tree: SohoTreeStatic;
}

interface JQuery {
  tree(options?: SohoTreeOptions): JQuery;
}
