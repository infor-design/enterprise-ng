import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoTreeComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tree-content-demo',
  templateUrl: 'tree-content.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeContentDemoComponent implements OnInit {

  @ViewChild(SohoTreeComponent, { static: true }) tree: SohoTreeComponent;
  enabled = true;
  selected: SohoTreeNode;

  ngOnInit(): void {
    // Can also set options here as well as in the inputs
    // this.tree.options.menuId = 'tree-popupmenu';
  }

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

  onMenuSelected(treeEvent: SohoTreeEvent) {
    const cmd = (treeEvent as any).item[0].getAttribute('data-cmd');
    console.log(`You selected command: ${cmd}`);
  }
}
