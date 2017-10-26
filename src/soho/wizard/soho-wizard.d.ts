/**
 * Soho Wizard Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery wizard control.
 */

 /**
  * Soho Widget model for a tick.
  *
  * @interface SohoWizardTick
  */
 interface SohoWizardTick {

  /**
   * Sets the ng-click event for AngularJS.
   *
   * @todo requires a better explanation and should it be exposed in the Angular Component?
   */
  ngClick?: string;

  /** State of the tick either:  */
  state?: 'complete' | 'current';

  /**
   * href key.
   *
   * @type {string}
   * @memberof SohoWizardTick
   */
  href?: string;

  /**
   * Label string to display under the tick.
   *
   * @type {string}
   * @memberof SohoWizardTick
   */
  label?: string;
 }

/**
 * Wizard options.
 */
interface SohoWizardOptions {
  /**
   * Optional model driven list of ticks to display.
   *
   * @type {SohoWizardTick[]}
   * @memberof SohoWizardOptions
   */
  ticks?: SohoWizardTick[];
}

/**
 * This interface represents the pub Api exposed by the
 * Soho tree control.
 */
interface SohoWizardStatic {
  /** Control options. */
  settings: SohoWizardOptions;

  /**
   * Activates a tick - based on the index or jquery element.
   *
   * @param {*} e
   * @param {(number | JQuery)} tick
   * @memberof SohoWizardStatic
   */
  activate(e: any, tick: number | JQuery): void;

  updated(): void;

  /**
   * Destructor,
   */
  destroy(): void;
}

interface SohoWizardEvent {
  tick: JQuery;
}

/**
 * JQuery Integration
 */

interface JQueryStatic {
  wizard: SohoWizardStatic;
}

interface JQuery {
  wizard(options?: SohoWizardOptions): JQuery;
}
