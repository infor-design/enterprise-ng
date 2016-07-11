// Copyright (c) 2016 Infor. All rights reserved. www.infor.com
// 
// NOTICE 
// 
// THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS
// CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES
// OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR
// WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND
// ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH
// THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.
// ALL OTHER RIGHTS RESERVED.
//
// (c) COPYRIGHT 2016 INFOR.  ALL RIGHTS RESERVED.
// THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE
// TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR
// AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS
// RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE
// THE PROPERTY OF THEIR RESPECTIVE OWNERS. 

//
// Author: Theo Harper (theo.harper@infor.com)
//

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
