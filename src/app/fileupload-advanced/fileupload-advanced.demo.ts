import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoFileUploadAdvancedComponent, SohoToastService } from 'ids-enterprise-ng';
import { HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-fileupload-advanced-demo',
  templateUrl: 'fileupload-advanced.demo.html',
})
export class FileUploadAdvancedDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadAdvancedComponent, { static: true }) fileUploadAdvanced: SohoFileUploadAdvancedComponent;

  public showModel = false;
  public fileUploadDisabled = false;

  constructor(private http: HttpClient, private toastService: SohoToastService) { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.fileUploadAdvanced.disabled = false;
    this.fileUploadDisabled = this.fileUploadAdvanced.disabled;
  }

  setDisable() {
    this.fileUploadAdvanced.disabled = true;
    this.fileUploadDisabled = this.fileUploadAdvanced.disabled;
  }

  onFileAborted(file: File) {
    this.toastService.show({
      title: 'File Aborted',
      message: file && file.name ? file.name : ''
    });
  }

  onFileRemoved(file: File) {
    this.toastService.show({
      title: 'File Removed',
      message: file && file.name ? file.name : ''
    });
  }

  onFilesdragenter(event: JQuery.TriggeredEvent) {
    console.log('FileUploadAdvancedDemoComponent.onFileDropped');
  }

  // To allow the function to passed into the options we need a scoped
  // local member variable representing the function, the neatest way is to
  // assign it to a lambda.
  onSend = (formData: FormData, status: SohoFileUploadAdvancedStatus) => {

    // To pass back multipart data to a WebApi requires the use of
    // a new FormData object, in which the additional non file data
    // can be encoded.
    //
    // For ASP.NET Core the backend uses a simple class consisting of the
    // IFormFile to represent the Data field.
    //
    // This is an example form (based on an attachment service in SunSystems).
    const fd = new FormData();
    fd.append('BusinessUnitCode', 'PK1');
    fd.append('DataRecordType', `152`);
    fd.append('RecordKey', '81001');
    fd.append('RecordKey2', null);
    fd.append('MimeType', status.file.type);
    fd.append('Data', status.file);

    // The original Angular Http service does not provide feedback
    // on upload, however the HttpClient (introduced in Angular 4)
    // does, using the reportProgress flag.
    const req = new HttpRequest('POST', 'http://localhost:5000/api/attachments', fd, { reportProgress: true });

    // Subscribing to the request allows the status bar associated with the
    // fileuploadadvnced widget to be updated.
    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        status.setProgress(percentDone);
      } else if (event instanceof HttpResponse) {
        status.setCompleted();
      }
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        alert(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
      status.setCompleted();
    }
  );
  }
}
