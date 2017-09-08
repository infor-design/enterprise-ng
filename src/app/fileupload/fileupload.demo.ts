import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoFileUploadComponent } from '../../soho/fileupload';

@Component({
  selector: 'soho-fileupload-demo',
  templateUrl: './fileupload.demo.html',
})
export class FileUploadDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadComponent) fileupload: SohoFileUploadComponent;

  public text = 'Upload a File';
  public limitLabel = 'Limited to xls, xlsx and csv';
  public name1 = 'file-name';
  public name2 = 'file-name-disabled';
  public name3 = 'file-name-readonly';
  public name4 = 'file-name-limits';
  public fileLimits = '.cvs,.xls,.xlsx';

  public showModel = false;
  public fileUploadDisabled = false;
  public fileUploadReadOnly = false;

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
