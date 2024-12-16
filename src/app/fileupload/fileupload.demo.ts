import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoFileUploadComponent, SohoTrackDirtyDirective } from 'ids-enterprise-ng';

@Component({
    selector: 'app-fileupload-demo',
    templateUrl: 'fileupload.demo.html',
    standalone: false
})
export class FileUploadDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadComponent, { static: true }) fileupload?: SohoFileUploadComponent;
  @ViewChild(SohoTrackDirtyDirective, { static: true }) trackdirty?: SohoTrackDirtyDirective;

  public limitLabel = 'Limited to xls, xlsx and csv';
  public name1 = 'file-name';
  public name2 = 'file-name-track-dirty';
  public name3 = 'file-name-track-dirty-existing';
  public name4 = 'file-name-limits';
  public name5 = 'file-name-disabled';
  public name6 = 'file-name-readonly';
  public fileLimits = '.cvs,.xls,.xlsx';

  public fileUploadDisabled = false;
  public fileUploadReadOnly = false;
  public fileUploadOptions = {
    attributes: {
      name: 'data-automation-id',
      value: 'fileupload-field-automation-id'
    }
  };

  constructor() { }
  ngOnInit() { }

  setEnable() {
    (this.fileupload as any).disabled = false;
    this.fileUploadDisabled = (this.fileupload as any).disabled;
    this.fileUploadReadOnly = (this.fileupload as any).readonly;
  }

  setDisable() {
    (this.fileupload as any).disabled = true;
    this.fileUploadDisabled = (this.fileupload as any).disabled;
  }

  setReadonly() {
    (this.fileupload as any).readonly = true;
    this.fileUploadReadOnly = (this.fileupload as any).readonly;
  }

  onUpdated(_event: SohoFileUploadEvent) {
    console.log('FileUploadDemoComponent.onUpdated');
  }

  onAfterResetDirty(_event: SohoTrackDirtyEvent) {
    console.log('onAfterResetDirty');
  }

  onDirty(_event: SohoTrackDirtyEvent) {
    console.log('onDirty');
  }

  onPristine(_event: SohoTrackDirtyEvent) {
    console.log('onPristine');
  }

  onChange(event: any) {
    console.log('onChange', event);
  }
}
