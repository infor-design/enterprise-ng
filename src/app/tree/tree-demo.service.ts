import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { SohoTreeService } from '../../soho/tree';

import { TreeDemoData } from './tree-data.demo';

@Injectable()
export class TreeDemoService extends SohoTreeService {

  private demoData = new TreeDemoData();

  constructor() {
    super();
  }

  getRootTreeNodes(): Observable<SohoTreeNode[]> {
    return Observable.of(this.demoData.getRootTreeNodes());
  }

  getTreeNodes(node: SohoTreeNode): Observable<SohoTreeNode[]> {
    return Observable.of(this.demoData.getTreeNodes(node));
  }
}
