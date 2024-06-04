import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CalendarDemoService {

  constructor(private http: HttpClient) {}

  public getCalendarEventTypes(): Observable<any> {
    return this.http.get('./app/demodata/calendar-eventtypes.demo.json');
  }

  public getCalendarEvents(): Observable<any> {
    return this.http.get('./app/demodata/calendar-events.demo.json');
  }
}
