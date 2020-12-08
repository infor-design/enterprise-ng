interface SohoProgressEvent extends JQuery.TriggeredEvent {
}

/*
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoProgressStatic {
  /** Destroys any resources used by the control. */
  settings?: SohoProgressOptions;
  destroy(): void;
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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  progress(options?: SohoProgressOptions): JQuery;
}
