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
  linearProgression?: boolean;

  /**
   * The callback function called before the step selection changes.
   * Return a jQuery promise that that resolves to a boolean
   * - resolve(true) to continue to the next step
   * - resolve(false) to veto the step change
   * NOTE: this is used internally, not for use by the implementing code.
   */
  beforeSelectStep?: BeforeSelectStepFunction<boolean>;
}

type BeforeSelectStepFunction<T> = (args: { stepLink: JQuery, isStepping: StepDirection }) => JQueryPromise<T>;

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoStepProcessStatic {
  /**
   * Step Process Control Options
   */
  settings: SohoStepProcessOptions;

  /**
   * get the currently selected step
   */
  getSelectedStep(): JQuery;

  /**
   * Destructor,
   */
  destroy(): void;
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
   * Override the stepId to continue to.
   */
  overrideTargetStepId?: string;
}

interface SohoStepSaveCloseEvent {
  currentStepId?: string;
}

type StepDirection = 'prev' | 'next' | 'none';

interface BeforeSelectStepEvent {
  /**
   * The step that is current selected
   */
  currentStepId?: string;

  /**
   * The step that will be selected
   */
  targetStepId: string;

  /**
   * The direction the user is stepping when going to another step
   * prev = previous step
   * next = next step
   * none = click on non linear step
   */
  isStepping?: StepDirection;

  /**
   * The response callback that indicates whether the step change should occur or not.
   * The targetStepId can be overridden here as well.
   * @param result
   */
  response(result: BeforeSelectStepResult): void;
}
