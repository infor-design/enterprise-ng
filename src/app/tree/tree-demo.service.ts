
import {of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';


import { SohoTreeService } from '@infor/sohoxi-angular';

import { TreeDemoData } from './tree-data.demo';

@Injectable()
export class TreeDemoService extends SohoTreeService {

  private demoData = new TreeDemoData();

  constructor() {
    super();
  }

  getRootTreeNodes(): Observable<SohoTreeNode[]> {
    return observableOf(this.demoData.getRootTreeNodes());
  }

  getTreeNodes(node: SohoTreeNode): Observable<SohoTreeNode[]> {
    return observableOf(this.demoData.getTreeNodes(node));
  }
}
