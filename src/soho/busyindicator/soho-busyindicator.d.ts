/**
 * Soho Busy Indicator.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery busyindicator control.
 */

/**
 * Busy Indicator Options
 */
interface SohoBusyIndicatorOptions {
  /** Blocks UI events to the attached components whilst the indictor is active. */
   blockUI?: boolean;

   /** Text to display, will show 'Loading...' if left undefined. */
   text?: string;

   /** Number of milliseconds to wait befre the indicator is dislayed, if 0 it is displayed immediately. */
   displayDelay?: number;

   /** Number of milliseconds before the indicator is removed, if 0 does indefinitely. */
   // Is this correct?  Should the indicator not close.
   timeToComplete?: number;

  /**
   * If true, allows the "blockUI" setting to display an overlay that prevents interaction,
   * but appears transparent instead of gray.
   */
  transparentOverlay?: boolean;

  /**
   * To display only the overlay w/o the badge and text. Useful to stop input to a component
   * that doesn't already have another mechanism (like a disabled state).
   */
  overlayOnly?: boolean;
}

/**
 * This interface represents the public API exposed by the
 * busy indicator.
 */
interface SohoBusyIndicatorStatic {
  /** Access to the control's options block. */
  settings: SohoBusyIndicatorOptions;

  /** Displays the indicator. */
  activate(): void;

  /**
   * Closes the busy indicator.
   *
   * @param fromEvent - if true ?
   */
  close(fromEvent: boolean): void;

  /** Updates the busy indicator with any new seettings. */
  updated(): void;

  /** whether or not the busy indicator is displaying or not */
  isActive(): boolean;

  /** Destroys the control on completion. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  busyindicator: SohoBusyIndicatorStatic;
}

interface JQuery {
  busyindicator(options?: SohoBusyIndicatorOptions): JQuery;
}
