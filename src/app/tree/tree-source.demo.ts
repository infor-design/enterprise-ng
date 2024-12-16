import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';
import { TreeDemoData } from './tree-data.demo';

@Component({
    selector: 'app-tree-source-demo',
    templateUrl: 'tree-source.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TreeSourceDemoComponent implements AfterViewInit {
  @ViewChild(SohoTreeComponent, { static: true }) tree!: SohoTreeComponent;

  public enabled = true;

  public demoData = new TreeDemoData();

  constructor() {
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
    this.tree?.expandAll();
  }

  collapseAll() {
    this.tree?.collapseAll();
  }

  toggleEnabled(_event: any) {
    if (this.enabled) {
      this.tree?.disable();
      this.enabled = false;
    } else {
      this.tree?.enable();
      this.enabled = true;
    }
  }

  selectRoot() {
    this.tree?.selectNode('Root 2');
  }

  unselectRoot() {
    this.tree?.unSelectedNode('Root 2');
  }

  reset() {
    this.tree?.reset();
  }

  onSelected(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event Selected: ${treeEvent.data}`);
  }

  onCollapsed(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event Collapsed: ${treeEvent.data}`);
  }

  onExpanded(treeEvent: SohoTreeEvent) {
    console.log(`Tree Event Expanded: ${treeEvent.data}`);
  }
}
