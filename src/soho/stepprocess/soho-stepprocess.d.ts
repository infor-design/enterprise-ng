/**
 * Soho Step Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery steps control.
 */

interface SohoStepProcessOptions {

  /** The selector for elements that are step panels. default is '.js-step-process-panel' */
  stepPanels: string;

  /** The selector for elements that are step links. default is '.js-step-link' */
  stepLinks: string;

  /** The selector of the previous step action element. default is '.js-step-link-prev' */
  btnStepPrev: string;

  /** The selector of the next step action element. default is '.js-step-link-next' */
  btnStepNext: string;

  /** The selector of the element to toggle the steps list. default is '.js-toggle-steps' */
  btnToggleStepLinks: string;

  /** The callback function called before the step selection changes */
  beforeStepChange: BeforeStepChangeFunction;

  /** The callback function called after the step selection changes */
  afterStepChange: AfterStepChangeFunction;
}

type BeforeStepChangeFunction = () => void;

type AfterStepChangeFunction = () => void;

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoStepProcessStatic {
  /** Step Process Control Options. */
  settings: SohoStepProcessOptions;

  /** Change the selected stepLink */
  changeSelectedStep(stepLink: HTMLLinkElement): void;
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
