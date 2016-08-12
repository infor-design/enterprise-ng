import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import {
  SohoTreeService,
  SohoTreeNode
} from '../../components/tree';

@Injectable()
export class TreeDemoService extends SohoTreeService {

  private static id: number = 2;

  /**
   * Root node - for the sample service.
   */
  private static ROOT_NODE: SohoTreeNode = {
    'id': 'Root ' + TreeDemoService.id++,
    'text': 'Node 1',
    'open': false,
    'selected': false,
    children: []
  };

  constructor() {
    super();
  }

  getRootTreeNodes(): Observable<SohoTreeNode[]> {
    let rootNodes: SohoTreeNode[] = [TreeDemoService.ROOT_NODE];
    return Observable.of(rootNodes);
  }

  getTreeNodes(node: SohoTreeNode): Observable<SohoTreeNode[]> {
    let children: SohoTreeNode[] = [{
      'id': node.id + '/1',
      'text': 'Leaf ' + TreeDemoService.id++,
      'open': false,
      'selected': false,
      'children': []
    },
      {
        'id': node.id + '/2',
        'text': 'Node ' + TreeDemoService.id++,
        'open': false,
        'selected': false,
        'children': []
      },
      {
        'id': node.id + '/3',
        'text': 'Node ' + TreeDemoService.id++,
        'open': false,
        'selected': false,
        'children': []
      }];

    return Observable.of(children);
  }
}
