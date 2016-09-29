/**
 * This is an interface mapping for the TreeNode defined
 * within the SoHo jQuery Control.
 */
export interface SohoTreeNode {
  // Unique identifier for this node in the tree.
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
  focus?: boolean;
}

/**
 * Contract for the configurable TreeOptions.
 */
export interface SohoTreeOptions {
  // The initial data set to display, should contain
  // at least one node.
  dataset: SohoTreeNode[];
  // Function used to provide the source of the tree data.
  source: any;
}

export interface SohoTreeEvent {
  // The jQuery selector for the tree node.
  node: any;
  // The data for the tree node.
  data: SohoTreeNode;
}
