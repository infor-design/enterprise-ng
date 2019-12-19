import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeekViewDemoService {

  constructor(private http: HttpClient) { }

  public getWeekViewEventTypes(): Observable<any> {
    return this.http.get('./app/demodata/calendar-eventtypes.demo.json');
  }

  public getWeekViewEvents(): Observable<any> {
    return this.http.get('./app/demodata/calendar-events.demo.json');
  }
}
