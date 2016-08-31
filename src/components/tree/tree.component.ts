import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ArgumentHelper } from '../../utils/argument.helper';

import { SohoTreeService } from './tree.service';

import {
  SohoTreeNode,
  SohoTreeOptions,
  SohoTreeEvent
} from './tree.model';

/**
 *  Valid list of tree types.
 */
export type SohoTreeType = 'auto' | 'content-only';

/**
 * Angular Wrapper for the Soho Tree Component.
 *
 * This component searches for an unordered list (ul) with the attribute
 * 'soho-tree' in the parent's DOM tree, initialising those found with
 * the SoHo tree control.
 *
 * The data is provided either by the content (li elements), a dataset
 * input or an implementation of the TreeService interface, by specifying
 * an implementation on the hosting component, e.g.
 *
 * providers: [ provide: TreeService, useClass: TreeDemoService} ]
 *
 * @todo Content based version does not work due to lack of TreeNode.
 * @todo Complete interface definition
 */
@Component({
  selector: 'ul[soho-tree]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTreeComponent implements AfterViewInit, OnInit, OnDestroy {

  // -------------------------------------------
  // Soho Tree Types
  // -------------------------------------------

  // "auto" where nodes are obtained from an injected service (if defined) or via the Inputs if not.
  public static AUTO: SohoTreeType = 'auto';

  // 'content-only' where elements are used.
  public static CONTENT_ONLY: SohoTreeType = 'content-only';

  // -------------------------------------------
  // Component Inputs
  // -------------------------------------------

  // The array of root tree nodes to display.
  @Input() set dataset(dataset: SohoTreeNode[]) {
    // @todo this is not fully working as the tree control does not
    // replace the contents but looks to merge it.
    this._dataset = dataset;
    if (this.tree) {
      this.tree.loadData(dataset);
    }
  };

  /**
   * Defines the source type of the tree.
   */
  @Input('soho-tree') set sohoTree(treeType: SohoTreeType) {
    this.treeType = treeType ? treeType : SohoTreeComponent.AUTO;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  // This event is fired when a node is expanded, the SohoTreeNode
  // expanded is passed as an argument to the handler.
  @Output() expand = new EventEmitter<SohoTreeNode>();

  // This event is fired when a node is collapsed, the SohoTreeNode
  // collapsed is passed as an argument to the handler.
  @Output() collapse = new EventEmitter<SohoTreeNode>();

  // This event is fired when a node is selected, the SohoTreeNode
  // selected is passed as an argument to the handler.
  @Output() selected = new EventEmitter<SohoTreeNode>();

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  // Set the enable / disabled class (not working)
  @HostBinding('class.is-disabled') isDisabled = false;

  // Set the appropriate SoHo class for a tree.
  @HostBinding('class.tree') treeClass = true;

  // Set the role.
  @HostBinding('attr.role') treeRole = 'tree';

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: any;

  // Reference to the SoHo tree control api.
  private tree: any;

  // Loaded dataset (root tree nodes)
  private _dataset: SohoTreeNode[];

  // The tree's type.
  private treeType: SohoTreeType;

  /**
   * Constructor.
   *
   * @param elementRef - the element matching this directive.
   * @param treeService - service for obtaining data (optional)
   */
  constructor(
    private elementRef: ElementRef,
    @Optional() private treeService: SohoTreeService) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Resets the data display to the default provided by the service,
   * that is by calling getRootNodes.
   *
   * The alternative is to set the dataset  property, which
   * has the same affect but allows the client to specify
   * the nodes.
   *
   * This method is only applicable when the service is defined,
   * but will not fail if one is not set.
   */
  public reset() {
    if (this.treeType !== SohoTreeComponent.CONTENT_ONLY && this.treeService) {
      this.treeService.getRootTreeNodes()
         .subscribe((dataset: SohoTreeNode[]) => this.dataset = dataset);
    }
  }

  public enable(): void {
    // @todo not working on Soho tree control
    this.isDisabled = false;
  }

  public disable(): void {
    // @todo not working on Soho tree control
    this.isDisabled = true;
  }

  public setFocus(node: SohoTreeNode) {
    ArgumentHelper.checkNotNull('node', node);

    this.tree.setFocus(node);
  }

  public disableNode(node: SohoTreeNode) {
    ArgumentHelper.checkNotNull('node', node);

    node.disabled = true;
    this.tree.updateNode(node);
  }

  public enableNode(node: SohoTreeNode): void {
    ArgumentHelper.checkNotNull('node', node);

    node.disabled = false;
    this.tree.updateNode(node);
  }

  /**
   * Updates the note with the information in the given SohoTreeNode.
   *
   * @parm node the tree node; must not be null.
   */
  public updateNode(node: SohoTreeNode): void {
    ArgumentHelper.checkNotNull('node', node);

    this.tree.updateNode(node);
  }

  /**
   * Expands all the loaded tree nodes.
   *
   * Note: this does not load additional nodes.
   */
  public expandAll() {
    if (this.tree) {
      this.tree.expandAll();
    }
  }

  /**
   * Collapse all the tree nodes.
   */
  public collapseAll() {
    if (this.tree) {
      this.tree.collapseAll();
    }
  }

  public removeNode(node: SohoTreeNode) {
    if (this.tree) {
      this.tree.removeNode(node);
    }
  }

  /**
   * Set the selected note based in the id of the node.
   */
  public setSelectedNode(id: string, focus = true) {
    ArgumentHelper.checkNotEmpty('id', id);

    let treeNode: SohoTreeNode = this.tree.findById(id);
    if (treeNode && treeNode.node) {
      this.tree.setSelectedNode(treeNode.node, focus);
    }
  }

  public getSelectedNode(): SohoTreeNode {
    throw Error('Not implemented');
  }

  /**
   * Adds a node to the tree.
   */
  public addNode(treeNode: SohoTreeNode, location: any = 'bottom') {
    ArgumentHelper.checkNotNull('treeNode', treeNode);

    this.tree.addNode(treeNode, location);
  }

  /**
   * Find the tree node for the given identifier (id).
   */
  public findById(id: string): SohoTreeNode {
    ArgumentHelper.checkNotEmpty('id', id);

    return this.tree.findById(id);
  }

  /**
   * Toggles open/closed state of the given tree node.
   */
  public toggleNode(node: SohoTreeNode) {
    ArgumentHelper.checkNotNull('node', node);
    ArgumentHelper.checkNotNull('node.node', node.node);

    this.tree.toggleNode(node.node);
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handle a request to load the children of the specified node.
   *
   * event - the tree event used to determine which node to load
   * response - function used to return the children
   */
  private onDataRequest(event: SohoTreeEvent, response: (data: any) => void) {
    let node = event.data;

    this.treeService.getTreeNodes(node)
      .subscribe((children: SohoTreeNode[]) => {
        response(children);
      });
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Wrap the "unordered list" element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // The source is used to lazily load the tree.
    let options: SohoTreeOptions = {
      dataset: this._dataset,
      source: (this.treeService && this.treeType !== SohoTreeComponent.CONTENT_ONLY)
        ? (args: SohoTreeEvent, response: any) => this.onDataRequest(args, response) : null
    };

    // Initialise the Soho control.
    this.jQueryElement.tree(options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case it is 'tree'.
    this.tree = this.jQueryElement.data('tree');

    // Preload from the service if specified (unless data already provided).
    if (this.treeType !== SohoTreeComponent.CONTENT_ONLY && !this._dataset && this.treeService) {
      // ... bootstrap ...
      this.treeService.getRootTreeNodes()
         .subscribe((dataset: SohoTreeNode[]) => this.dataset = dataset);
    }

    // Initialize any event handlers.
    this.jQueryElement
      .on('selected', (e: any, args: SohoTreeEvent) => this.selected.next(args.data))
      .on('expand', (e: any, args: SohoTreeEvent) => this.expand.next(args.data))
      .on('collapse', (e: any, args: SohoTreeEvent) => this.collapse.next(args.data));
  }

  ngOnDestroy() {
    if (this.tree) {
      this.tree.destroy();
      this.tree = null;
    }
  }
}
