import { Component, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoLookupComponent, SohoModalDialogService } from 'ids-enterprise-ng';
import { LookupDialogDemoComponent } from './lookup-dialog.demo';

@Component({
    selector: 'app-lookup-landmark',
    templateUrl: './lookup-landmark.demo.html',
    standalone: false
})
export class LookupLandmarkDemoComponent {

  @ViewChild(SohoLookupComponent, { static: true }) sohoLookup?: SohoLookupComponent;
  lookupValue = '';

  constructor(private modalDialog: SohoModalDialogService) { }

  onLookupClick = () => {
    const dialog = this.modalDialog.modal(LookupDialogDemoComponent);
    let dialogComponent: LookupDialogDemoComponent;

    dialog.buttons([
      {
        text: 'Cancel',
        click: () => dialog.close()
      },
      {
        text: 'Ok',
        isDefault: true,
        click: () => dialog.close(true)
      }
    ])
    .open()
    .apply((comp: LookupDialogDemoComponent) => {
      dialogComponent = comp;
    })
    .afterClose((result) => {
      if (result && this.sohoLookup) {
        this.sohoLookup.setValue(dialogComponent.selected);
      }
    });
  }
}
