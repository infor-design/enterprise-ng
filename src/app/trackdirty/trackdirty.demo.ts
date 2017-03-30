import {
  Component,
  OnInit
} from '@angular/core';

/**
 * This example:
 * - shows basic track dirty functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-trackdirty-demo',
  templateUrl: './trackdirty.demo.html'
})
export class TrackDirtyDemoComponent implements OnInit {

  public model = {
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
}
