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
