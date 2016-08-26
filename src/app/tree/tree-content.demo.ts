import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoTreeComponent,
  SohoTreeNode,
  SohoTreeEvent
} from '../../components/tree';

@Component({
  selector: 'tree-content-demo',
  templateUrl: 'tree-content.demo.html',
  directives: [ SohoTreeComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeContentDemoComponent {

  @ViewChild(SohoTreeComponent) tree: SohoTreeComponent;

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
    this.tree.setSelectedNode('/1');
  }

  addNode() {
    let tn: SohoTreeNode = {text: 'New Item 1.2', disabled: true};
    this.tree.addNode(tn, this.selected);
  }

  onSelected(treeEvent: SohoTreeEvent) {
    this.selected = treeEvent.data;
    console.log('Tree Event: ${this.selected}');
  }
}
