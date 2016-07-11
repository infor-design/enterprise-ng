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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TreeNode } from './tree.model';

/**
 * Dynamic Tree Service contract.
 * 
 * Useful where lazily loading of the tree is required, can also make
 * controlling the tree easier.
 */
@Injectable()
export class TreeService {
    /**
     * Returns the root tree node, without any 
     * children.
     * 
     * This default service return an single root node.
     * 
     * @todo allow this to be parameterised, such that the
     * caller can control initial depth, recursion, etc ...
     */
    getRootTreeNodes(): Observable<TreeNode[]> { return null; }

    /**
     * Given an existing TreeNode, this method returns a list
     * of child TreeNodes, as a observable.  Thus allowing for the
     * tree to lazy load from any in-memory or external source.
     * 
     */
    getTreeNodes(node: TreeNode): Observable<TreeNode[]> { return null; }
}
