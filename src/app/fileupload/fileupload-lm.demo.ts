import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoFileUploadComponent } from '../../soho/fileupload';
import { SohoTrackDirtyDirective } from '../../soho/trackdirty';

@Component({
  selector: 'soho-fileupload-lm-demo',
  templateUrl: './fileupload-lm.demo.html',
  styles:      [
    `
      .hidden {
        display: none;
        visibility: hidden;
      }
    `
  ]
})
export class FileUploadLMDemoComponent implements OnInit {

  @ViewChild(SohoFileUploadComponent) fileupload: SohoFileUploadComponent;
  @ViewChild(SohoTrackDirtyDirective) trackdirty: SohoTrackDirtyDirective;

  public name3 = 'file-name-track-dirty-existing';
  public fileName = 'add-employee.png';
  public showDisplayLink = true;

  public get isSaveEnabled(): boolean {
    return this.showDisplayLink;
  }

  constructor() { }

  ngOnInit() { }

  onSave() {
    if (this.trackdirty) {
      // reset the dirty indicator
      this.trackdirty.resetDirty();
    }

    // show the hyperlink, hide the fileupload, and disable the Save button
    this.showDisplayLink = true;
  }

  removeAttachment() {
    if (this.fileupload) {
      // clear the files array
      this.fileupload.clearUploadFile();
    }

    if (this.trackdirty) {
      // initialize the trackdirty control so it gets current information
      this.trackdirty.updated();

      // indicate to display the field as dirty
      this.trackdirty.changeDirty();
    }

    // hide the hyperlink, show the fileupload, and enable the Save button
    this.showDisplayLink = false;
  }

  onUpdated(event: SohoFileUploadEvent) {
    console.log('FileUploadDemoComponent.onUpdated');
  }

  onAfterResetDirty(event: SohoTrackDirtyEvent) {
    console.log('onAfterResetDirty');
  }

  onDirty(event: SohoTrackDirtyEvent) {
    console.log('onDirty');
    const elem: HTMLInputElement = event.currentTarget as HTMLInputElement;

    if (elem.files && elem.files.length > 0) {
      this.fileName = elem.files[0].name;

    } else {
      this.fileName = '';
    }
  }

  onPristine(event: SohoTrackDirtyEvent) {
    console.log('onPristine');
  }
}
