interface TrackDirtyStatic {
}

interface SohoTrackDirtyEvent extends JQueryEventObject {
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
