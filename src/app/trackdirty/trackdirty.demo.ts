import {
  Component,
  OnInit, ViewChild
} from '@angular/core';
import { SohoTrackDirtyDirective, SohoLookupComponent } from '@infor/sohoxi-angular';

/**
 * This example:
 * - shows basic track dirty functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-trackdirty-demo',
  templateUrl: './trackdirty.demo.html'
})
export class TrackDirtyDemoComponent implements OnInit {

  @ViewChild(SohoLookupComponent) sohoLookup: SohoLookupComponent;
  @ViewChild(SohoTrackDirtyDirective) sohoTrackDirty: SohoTrackDirtyDirective;

  public model = {
    lookup: '',
    textbox: '',
    numeric: ''
  };

  public showModel = false;

  constructor() { }

  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onDirty(event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onDirty');
  }

  onPristine(event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onPristine');
  }

  onLookupClick = (event: Event) => {
    const data = [JSON.parse(`{"data":{
    "fields": {
      "RelationshipToOrganization": {
        "value": "CONSULTANT"
      }
    }}}`)];

    this.sohoLookup.setValue(data);
    this.sohoTrackDirty.triggerChangeEvent();
  }

  onLookupField = (data: DataFields) => {
    return data.fields['RelationshipToOrganization'].value;
  }
}

interface DataView {
  fields: DataFields;
}

// tslint:disable-next-line
type DataFields = { [key: string]: DataField };

interface DataField {
  value: string | number | boolean;
}
