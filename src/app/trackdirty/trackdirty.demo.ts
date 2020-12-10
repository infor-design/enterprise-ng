import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';

import { SohoLookupComponent, SohoTrackDirtyDirective } from 'ids-enterprise-ng';

/**
 * This example:
 * - shows basic track dirty functionality on input elements with an angular template
 */
@Component({
  selector: 'app-trackdirty-demo',
  templateUrl: 'trackdirty.demo.html'
})
export class TrackDirtyDemoComponent implements OnInit {

  @ViewChild(SohoLookupComponent, { static: true }) sohoLookup!: SohoLookupComponent;
  @ViewChildren(SohoTrackDirtyDirective) trackDirtyComponents?: QueryList<SohoTrackDirtyDirective>;

  public model = {
    lookup: '',
    textbox: '',
    numeric: ''
  };

  public showModel = false;

  constructor() { }

  ngOnInit() { }

  saveForm() {
    this.trackDirtyComponents?.forEach((trackDirty: SohoTrackDirtyDirective) => {
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

  onAfterResetDirty(_event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onAfterResetDirty');
  }

  onDirty(_event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onDirty');
  }

  onPristine(_event: SohoTrackDirtyEvent) {
    console.log('TrackDirtyDemoComponent.onPristine');
  }

  onLookupClick = (_event: Event) => {
    const data = [JSON.parse(`{"data":{
    "fields": {
      "RelationshipToOrganization": {
        "value": "CONSULTANT"
      }
    }}}`)];

    this.sohoLookup.setValue(data);
  }

  onLookupField = (data: DataFields) => {
    // @ts-ignore
    return data.fields['RelationshipToOrganization'].value;
  }
}

// teslint-disable-next-line
interface DataFields { [key: string]: DataField }

interface DataField {
  value: string | number | boolean;
}
