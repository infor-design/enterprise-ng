import { Observable } from 'rxjs/Rx';

import { TreeNode } from './tree.model';

/**
 * SoHo Dynamic Tree Service contract.
 *
 * Useful where lazily loading of the tree is required, can also make
 * controlling the tree easier.
 */
export abstract class TreeService {
    /**
     * Returns the root tree node, without any
     * children.
     *
     * This default service return an single root node.
     *
     * @todo allow this to be parameterised, such that the
     * caller can control initial depth, recursion, etc ...
     */
    abstract getRootTreeNodes(): Observable<TreeNode[]>;

    /**
     * Given an existing TreeNode, this method returns a list
     * of child TreeNodes, as a observable.  Thus allowing for the
     * tree to lazy load from any in-memory or external source.
     *
     */
    abstract getTreeNodes(node: TreeNode): Observable<TreeNode[]>;
}
