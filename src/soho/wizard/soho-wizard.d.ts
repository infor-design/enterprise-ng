/**
 * Soho Wizard Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery wizard control.
 */

 interface SohoWizardTick {

  /** Sets the ng-click event for AngularJS? */
  ngClick?: string;

  /** State of the tick either:  */
  state?: 'complete' | 'current';

  href?: string;

  label?: string;
 }

/**
 * Wizard options.
 */
interface SohoWizardOptions {

  ticks?: SohoWizardTick[];
}

/**
 * This interface represents the pub Api exposed by the
 * Soho tree control.
 */
interface SohoWizardStatic {
  /** Control options. */
  settings: SohoWizardOptions;

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
