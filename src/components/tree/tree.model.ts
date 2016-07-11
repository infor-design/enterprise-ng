export interface TreeNode {
    // Unique identifier for this node in the tree.
    id?: string;
    // The text for the node.
    text?: string;
    // The icon for the node.
    icon?: string;
    // Is the node disabled
    disabled?: boolean;
    // Is this the parent?
    node?: TreeNode;
    // Children.
    children?: TreeNode[];
    open?: boolean;
    selected?: boolean;
    href?: string;
    data?: any;
    focus?: boolean;
}

/**
 * Contract for the configurable TreeOptions.
 */
export interface TreeOptions {
    // The initial data set to display, should contain
    // at least one node.
    dataset: TreeNode[];
    // Function used to provide the source of the tree data.
    source: any;
}

export interface TreeEvent {
    // The jQuery selector for the tree node.
    node: any;
    // The data for the tree node.
    data: TreeNode;
}
