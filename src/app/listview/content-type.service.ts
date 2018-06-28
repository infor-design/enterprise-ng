import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContentType } from './content-type.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ContentTypeService {
  private _contentTypesUrl =  './app/demodata/content-types.demo.json';

  constructor(private _http: HttpClient) { }

  getContentTypes(): Observable<ContentType[]> {
    return this._http.get<ContentType[]>(this._contentTypesUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
