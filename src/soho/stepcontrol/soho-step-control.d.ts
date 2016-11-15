/**
 * Soho Step Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery steps control.
 */

interface SohoStepsEvent extends JQueryEventObject {
}

/**
 * This interface represents api exposed by the
 * Soho control.
 */
interface SohoStepsStatic {

  disable(): void;

  enable(): void;
}

interface JQuery {
  stepprocess(options?: SohoStepsOptions): JQuery;
}

interface SohoStepsOptions {

  /**
   * If defined as a function, will be fired before a step changes
   */
  beforeStepChange: Function;

   /**
   * If defined as a function, will be fired after a step changes
   */
   afterStepChange: Function;
}
