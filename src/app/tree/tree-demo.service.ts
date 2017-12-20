import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SohoTreeService } from '@infor/sohoxi-angular';

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
