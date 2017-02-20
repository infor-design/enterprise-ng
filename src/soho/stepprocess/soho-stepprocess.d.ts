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

  /**
   * The callback function called before the step selection changes.
   * Return a jQuery promise that that resolves to a boolean
   * - resolve(true) to continue to the next step
   * - resolve(false) to veto the step change
   * NOTE: this is used internally, not for use by the implementing code.
   */
  beforeSelectStep?: BeforeSelectStepFunction<boolean>;
}

type BeforeSelectStepFunction<T> = (args: { stepLink: JQuery, isStepping: number }) => JQueryPromise<T>;

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoStepProcessStatic {
  /** Step Process Control Options. */
  settings: SohoStepProcessOptions;

  getSelectedStep(): JQuery;

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

interface BeforeSelectStepResult {
  /**
   * Whether or not to continue to the next stepId.
   */
  continue: boolean;

  /**
   * override the stepId to continue to.
   */
  nextStepId?: string;
}

interface BeforeSelectStepEvent {
  /**
   *
   */
  currentStepId?: string;

  /**
   *
   */
  nextStepId: string;

  /**
   *
   * @param result
   */
  response(result: BeforeSelectStepResult): void;
}
