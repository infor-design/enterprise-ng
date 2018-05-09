
import {
  throwError,
  Observable
} from 'rxjs';

import {
  catchError,
  map
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HierarchyDemoService {

  constructor(private http: Http) {}

  public getHierarchyData(): Observable<any> {
    return this.http.get('./app/demodata/hierarchy.demo.json').pipe(
    map((res: any) => res.json()),
    catchError(error => this.handleError(error)));
  }

  private handleError(error: Response) {
    return throwError(error || 'Server error');
  }
}
