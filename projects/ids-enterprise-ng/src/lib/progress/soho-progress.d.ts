interface SohoProgressEvent extends JQuery.Event {
}

/*
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoProgressStatic {
  /** Destroys any resources used by the control. */
  settings?: SohoProgressOptions;
  destroy();
  update(value: number): void;
}

interface SohoProgressOptions {
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  progress: SohoProgressStatic;
}

interface JQuery {
  progress(options?: SohoProgressOptions): JQuery;
}
