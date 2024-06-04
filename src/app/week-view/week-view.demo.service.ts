import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class WeekViewDemoService {

  constructor(private http: HttpClient) {}

  public getWeekviewEventTypes(): Observable<any> {
    return this.http.get('./app/demodata/calendar-eventtypes.demo.json');
  }

  public getWeekviewEvents(): Observable<any> {
    return this.http.get('./app/demodata/calendar-events.demo.json');
  }
}
