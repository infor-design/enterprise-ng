interface SohoSpinboxEvent extends JQuery.Event {
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
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  spinbox: SohoSpinboxStatic;
}

interface JQuery {
  spinbox(options?: SohoSpinboxOptions): JQuery;
}
