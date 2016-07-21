
import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

/* tslint:disable */
import { Observable } from 'rxjs/Observable';
/* tslint:enable */
import { Subject } from 'rxjs/Subject';

import {
  SoHoButtonComponent,
  SoHoTreeComponent,
  TreeService,
  TreeNode,
  TreeEvent

}
from '../';

import {
  TreeDemoService
} from './tree-demo.service';

@Component({
  moduleId: module.id,
  selector: 'tree-service-demo',
  templateUrl: 'tree-service-demo.component.html',
  providers: [{ provide: TreeService, useClass: TreeDemoService }],
  directives: [SoHoTreeComponent, SoHoButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeServiceDemoComponent {

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

  @ViewChild(SoHoTreeComponent) tree: SoHoTreeComponent;

  private subject = new Subject<TreeNode[]>();

  private source = this.subject.asObservable();

  // Is this component enabled.
  enabled = true;

  selected: TreeNode;
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

  get dataset() {
    return this.source;
  }

  selectRoot() {
    this.tree.setSelectedNode('node1');
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
}
