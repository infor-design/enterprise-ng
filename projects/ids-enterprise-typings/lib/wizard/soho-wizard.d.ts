/**
 * Soho Wizard Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery wizard control.
 */

/**
 * Soho ButtonBar button definition
 */
interface SohoWizardButtonBarButton {
  /** the button's unique element id */
  id: string, // e.g. 'next',

  /** the button's text */
  text: string, // Soho.Locale.translate('Next'),

  /** the button's icon */
  icon?: string, // the name of the icon to use

  /** the click callback for the button */
  click: () => void,

  /** an optional disable callback, return true if the button is disabled */
  disabled?: () => boolean,

  /** an optional hidden callback, return true if the button is hidden */
  hidden?: () => boolean,

  /** an optional isDefault flag, true if the button is displayed as the default */
  isDefault?: boolean, // defaults to false

  /** the relative position of the button */
  position?: string
}

/**
 * Soho Widget model for a tick
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
   *
   *
   */
  href?: string;

  /**
   * Label string to display under the tick.
   *
   *
   *
   */
  label?: string;
}

/**
 * Wizard options.
 */
interface SohoWizardOptions {
  /**
   * Optional model driven list of ticks to display.
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

  /** Activates a tick - based on the index or jquery element */
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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  wizard(options?: SohoWizardOptions): JQuery;
}
