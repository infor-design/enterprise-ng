import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  SohoInputComponent,
  SohoLookupComponent,
  SohoTrackDirtyDirective
} from 'ids-enterprise-ng';

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
  @ViewChildren(SohoTrackDirtyDirective) trackDirtyComponents: QueryList<SohoTrackDirtyDirective>;

  public model = {
    lookup: '',
    textbox: '',
    numeric: ''
  };

  public showModel = false;

  constructor() { }

  ngOnInit() { }

  saveForm() {
    this.trackDirtyComponents.forEach( (trackDirty: SohoTrackDirtyDirective) => {
      trackDirty.resetDirty();
    });
  }

  changeValues() {
    this.model.lookup = (Math.random() + 1).toString(36).substring(2, 5);
    this.model.textbox = (Math.random() + 1).toString(36).substring(2, 7);
    this.model.numeric = Math.floor(Math.random() * 400).toString();
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onAfterResetDirty(event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onAfterResetDirty');
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
