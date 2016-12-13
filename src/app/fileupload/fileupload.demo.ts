import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoFileUploadComponent } from '../../soho/fileupload';

@Component({
  selector: 'soho-fileupload-demo',
  templateUrl:'./fileupload.demo.html',
})
export class FileUploadDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadComponent) fileupload: SohoFileUploadComponent;

  private text = 'Upload a File'; // tslint:disable-line
  private name1 = 'file-name'; // tslint:disable-line
  private name2 = 'file-name-disabled'; // tslint:disable-line
  private name3 = 'file-name-readonly'; // tslint:disable-line

  private showModel = false;
  private fileUploadDisabled = false;
  private fileUploadReadOnly = false;

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.fileupload.disabled = false;
    this.fileUploadDisabled = this.fileupload.disabled;
    this.fileUploadReadOnly = this.fileupload.readonly;
  }

  setDisable() {
    this.fileupload.disabled = true;
    this.fileUploadDisabled = this.fileupload.disabled;
  }

  setReadonly() {
    this.fileupload.readonly = true;
    this.fileUploadReadOnly = this.fileupload.readonly;
  }

  onUpdated(event: SohoFileUploadEvent) {
    console.log('FileUploadDemoComponent.onUpdated');
  }
}
