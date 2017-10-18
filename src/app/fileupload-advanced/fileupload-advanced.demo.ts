import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoFileUploadAdvancedComponent } from '../../soho/fileupload-advanced';

@Component({
  selector: 'soho-fileupload-advanced-demo',
  templateUrl: './fileupload-advanced.demo.html',
})
export class FileUploadAdvancedDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadAdvancedComponent) fileUploadAdvanced: SohoFileUploadAdvancedComponent;

  public text = 'Upload a File';
  public limitLabel = 'Limited to xls, xlsx and csv';
  public name1 = 'file-name';
  public name2 = 'file-name-disabled';
  public name3 = 'file-name-readonly';
  public name4 = 'file-name-limits';
  public allowedTypes = '.cvs,.xls,.xlsx';

  public showModel = false;
  public fileUploadDisabled = false;

  constructor() { }
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

  onFilesDragEnter(e: JQueryEventObject, file: File[]) {
    console.log('FileUploadAdvancedDemoComponent.onFileDropped');
  }
}
