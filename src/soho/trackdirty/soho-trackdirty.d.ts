interface TrackDirtyStatic {
  // destroy();
}

interface SohoTrackDirtyEvent extends JQueryEventObject { // tslint:ignore
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
