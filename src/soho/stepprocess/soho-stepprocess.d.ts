/**
 * Soho Step Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery steps control.
 */

interface SohoStepProcessOptions {
  /**
   * The id selector used on the step list. Make sure this and the
   * id on the actual soho-step-list element match.
   */
  stepList?: string;

  /**
   * Whether to enforce a linear progression through the stepprocess or not.
   */
  linearProgression?: boolean,

  /** The callback function called before the step selection changes */
  beforeSelectStep?: BeforeSelectStepFunction;
}

type BeforeSelectStepFunction = (node: any) => void;

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoStepProcessStatic {
  /** Step Process Control Options. */
  settings: SohoStepProcessOptions;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoStepProcessSelectedEvent {
  e: any;
  stepLink: any;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  stepprocess: SohoStepProcessStatic;
}

interface JQuery {
  stepprocess(options?: SohoStepProcessOptions): JQuery;
}
