interface SohoProgressEvent extends BaseJQueryEventObject {
}

/*
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoProgressStatic {
  /** Destroys any resources used by the control. */
  destroy();
  update(value: number): void;
}

interface SohoProgressOptions {
  settings?: SohoProgressOptions;
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
