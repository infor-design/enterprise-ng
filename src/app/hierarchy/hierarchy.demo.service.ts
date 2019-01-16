import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HierarchyDemoService {

  constructor(private http: HttpClient) {}

  public getHierarchyData(): Observable<any> {
    return this.http.get('./app/demodata/hierarchy.demo.json');
  }
}
