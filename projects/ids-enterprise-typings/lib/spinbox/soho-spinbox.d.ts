interface SohoSpinboxEvent extends JQuery.TriggeredEvent {
}

/*
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoSpinboxStatic {
  settings?: SohoSpinboxOptions;
  /** Destroys any resources used by the control. */
  destroy(): void;
  disable(): void;
  enable(): void;
  isDisabled(): boolean;
  updateVal(value: number | string): void;
}

interface SohoSpinboxOptions {
  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  spinbox: SohoSpinboxStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  spinbox(options?: SohoSpinboxOptions): JQuery;
}
