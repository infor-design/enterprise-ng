
import {
  of,
  Observable
} from 'rxjs';

import { Injectable } from '@angular/core';

import { SohoTreeService } from 'ids-enterprise-ng';

import { TreeDemoData } from './tree-data.demo';

@Injectable()
export class TreeDemoService extends SohoTreeService {

  private demoData = new TreeDemoData();

  constructor() {
    super();
  }

  getRootTreeNodes(): Observable<SohoTreeNode[]> {
    return of(this.demoData.getRootTreeNodes());
  }

  getTreeNodes(node: SohoTreeNode): Observable<SohoTreeNode[]> {
    return of(this.demoData.getTreeNodes(node));
  }
}
