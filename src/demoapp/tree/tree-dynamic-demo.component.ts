import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';
/* tslint:disable */
import { Observable } from 'rxjs/Observable';
/* tslint:enable */

import {
  SohoButtonComponent,
  SohoTreeComponent,
  TreeNode,
  TreeEvent
}
from '../';

@Component({
  moduleId: module.id,
  selector: 'tree-dynamic-demo',
  templateUrl: 'tree-dynamic-demo.component.html',
  directives: [SohoTreeComponent, SohoButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeDynamicDemoComponent implements AfterViewInit {

  private DATA: TreeNode[] = [{
    'id': 'node1',
    'text': 'Data One',
    'open': false,
    'selected': false,
    'href': '/somelink/'
  }, {
      'id': 'node2',
      'text': 'Node Two',
      'open': true,
      'selected': true,
      'focus': true,
      'children': [{
        'id': 'node3',
        'text': 'Node 2.1'
      }, {
          'id': 'node4',
          'text': 'Node 2.2',
          'children': [{
            'id': 'node5',
            'text': 'Node 2.2.1',
            'icon': 'icon-tree-chart',
            'children': [{
              'id': 'node6',
              'text': 'Node 2.2.1.1',
              'icon': 'icon-tree-chart'
            }]
          }]
        }]
    }];

  @ViewChild(SohoTreeComponent) tree: SohoTreeComponent;

  private subject = new Subject<TreeNode[]>();

  private source = this.subject.asObservable();

  // Is this component enabled.
  enabled = true;

  selected: TreeNode;

  get dataset() {
    return this.source;
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
    if (this.enabled) {
      this.tree.disable();
      this.enabled = false;
    } else {
      this.tree.enable();
      this.enabled = true;
    }
  }

  selectRoot() {
    this.tree.setSelectedNode('/1');
  }

  addNode() {
    let tn: TreeNode = { text: 'New Item 1.2', disabled: true };
    this.tree.addNode(tn, this.selected);
  }

  reset() {
    this.subject.next(this.DATA);
  }

  onSelected(treeEvent: TreeEvent) {
    this.selected = treeEvent.data;
    console.log(`Tree Event: ${this.selected}`);
  }

  ngAfterViewInit() {
    this.reset();
  }

}
