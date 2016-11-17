interface SohoSpinboxEvent extends BaseJQueryEventObject {
}

/*
 * This interface represents the pub Api exposed by the
 * Soho control.
 */
interface SohoSpinboxStatic {
  settings?: SohoSpinboxOptions;
  /** Destroys any resources used by the control. */
  destroy();
  disable();
  enable();
  isDisabled();
  updateVal(value: number): void;
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
