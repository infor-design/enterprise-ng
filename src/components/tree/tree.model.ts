
/**
 * Defines the data source of the tree.
 */
export const TREE_TYPES = {
    // Determines the type to use based on the presence of a service.
    AUTO: 'auto',

    // Use the components content.
    CONTENT_ONLY: 'content-only',
}

// Valid list of tree types.
export const TREE_TYPE_LIST: string[] = [TREE_TYPES.AUTO, TREE_TYPES.CONTENT_ONLY];

/**
 * This is an interface mapping for the TreeNode defined
 * within the SoHo jQuery Control. 
 */
export interface TreeNode {   
    // Unique identifier for this node in the tree.
    id?: string;
    // The text for the node.
    text?: string;
    // The icon for the node.
    icon?: string;
    // Is the node disabled
    disabled?: boolean;
    // Is this the parent? The element? 
    node?: TreeNode;
    // Children.
    children?: TreeNode[];
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
