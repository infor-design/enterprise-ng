interface TrackDirtyStatic {
  // destroy();
}

interface SohoTrackDirtyEvent extends JQuery.Event { // tslint:ignore
  currentTarget: HTMLElement
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  trackdirty: TrackDirtyStatic;
}

interface JQuery {
  trackdirty(): JQuery;
}
