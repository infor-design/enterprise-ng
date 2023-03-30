import { Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { SohoTrackDirtyDirective } from "ids-enterprise-ng";

@Component({
  selector: "app-textarea-dirty-demo",
  templateUrl: "textarea-dirty.demo.html",
})
export class TextAreaDirtyDemoComponent implements OnInit {
  @ViewChildren(SohoTrackDirtyDirective)
  trackDirtyComponents?: QueryList<SohoTrackDirtyDirective>;

  @ViewChild('readDirty', { static: true }) textReadDirty?: SohoTrackDirtyDirective;

  public model = {
    textbox: "",
    textarea2: "",
    textarea: "",
  };

  public isReadOnly = true;

  constructor() { }

  ngOnInit() { }

  resetForm() {
    this.trackDirtyComponents?.forEach(
      (trackDirty: SohoTrackDirtyDirective) => {
        console.log(trackDirty);
        trackDirty.resetDirty();
      }
    );

    this.model = {
      textbox: "",
      textarea2: "",
      textarea: "",
    };
  }

  toggleEdit() {
    this.isReadOnly = !this.isReadOnly;
  }

  onInput(event: Event) {
    this.trackDirtyComponents?.forEach(
      (trackDirty: SohoTrackDirtyDirective) => {
        trackDirty.changeDirty();
      }
    );
  }

  onAfterResetDirty(_event: SohoTrackDirtyEvent) {
    console.log("TrackDirtyDemoComponent.onAfterResetDirty");
  }

  onDirty(_event: SohoTrackDirtyEvent) {
    console.log("TrackDirtyDemoComponent.onDirty");
  }

  onPristine(_event: SohoTrackDirtyEvent) {
    console.log("TrackDirtyDemoComponent.onPristine");
  }
}
