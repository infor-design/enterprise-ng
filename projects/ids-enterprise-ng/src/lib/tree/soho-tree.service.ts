import { Observable } from 'rxjs';

/**
 * Soho Dynamic Tree Service contract.
 *
 * Useful where lazily loading of the tree is required, can also make
 * controlling the tree easier.
 */
export abstract class SohoTreeService {
  /**
   * Returns the root tree node, without any
   * children.
   *
   * This default service return an single root node.
   *
   * @todo allow this to be parameterised, such that the caller can control initial depth, recursion, etc ...
   */
  abstract getRootTreeNodes(): Observable<SohoTreeNode[]>;

  /**
   * Given an existing TreeNode, this method returns a list
   * of child TreeNodes, as a observable.  Thus allowing for the
   * tree to lazy load from any in-memory or external source.
   *
   */
  abstract getTreeNodes(node: SohoTreeNode): Observable<SohoTreeNode[]>;
}
