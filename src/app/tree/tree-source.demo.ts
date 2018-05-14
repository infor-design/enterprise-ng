import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  ViewChild
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';
import { TreeDemoData } from './tree-data.demo';

@Component({
  selector: 'soho-tree-source-demo',
  templateUrl: './tree-source.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeSourceDemoComponent implements AfterViewInit {
  @ViewChild(SohoTreeComponent) tree: SohoTreeComponent;

  public enabled = true;

  public demoData = new TreeDemoData();

  constructor(private el: ElementRef) {
    // Configure options here?
  }

  ngAfterViewInit() {
    this.tree.dataset = this.demoData.getRootTreeNodes();
  }

  /**
   * Source function.
   */
  source(event: SohoTreeEvent, response: SohoTreeResponseFunction) {
    // @todo node = element and data = node.
    response(this.demoData.getTreeNodes(event.data));
  }

  expandAll() {
    this.tree.expandAll();
  }

  collapseAll() {
    this.tree.collapseAll();
  }

  toggleEnabled(event: any) {
    if (this.enabled) {
      this.tree.disable();
      this.enabled = false;
    } else {
      this.tree.enable();
      this.enabled = true;
    }
  }

  selectRoot() {
    this.tree.selectNode('Root 2');
  }

  reset() {
    this.tree.reset();
  }

  onSelected(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event: ${treeEvent.data}`);
  }

  onCollapse(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event: ${treeEvent.data}`);
  }

  onExpand(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event: ${treeEvent.data}`);
  }
}
