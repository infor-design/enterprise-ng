import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HierarchyDemoService {

  constructor(private http: Http) {}

  public getHierarchyData(): Observable<any> {
    return this.http.get('./app/demodata/hierarchy.demo.json')
    .map((res: any) => res.json())
    .catch(error => this.handleError(error));
  }

  private handleError(error: Response) {
    return Observable.throw(error || 'Server error');
  }
}
