import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tree-content-demo',
  templateUrl: 'tree-content.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeContentDemoComponent {

  @ViewChild(SohoTreeComponent, { static: true }) tree: SohoTreeComponent;

  // Is this component enabled.
  enabled = true;

  selected: SohoTreeNode;

  constructor(private el: ElementRef) {
  }

  expandAll() {
    this.tree.expandAll();
  }

  collapseAll() {
    this.tree.collapseAll();
  }

  toggleEnabled(event: any) {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.tree.enable();
    } else {
      this.tree.disable();
    }
  }

  selectRoot() {
    this.tree.selectNode('home');
  }

  enable() {
    this.tree.enable();
  }

  disable() {
    this.tree.disable();
  }

  addNode() {
    const tn: SohoTreeNode = {text: 'New Item 1.2', disabled: true};
    this.tree.addNode(tn, this.selected);
  }

  onSelected(treeEvent: SohoTreeEvent) {
    this.selected = treeEvent.data;
    console.log('Tree Event: ${this.selected}');
  }
}
