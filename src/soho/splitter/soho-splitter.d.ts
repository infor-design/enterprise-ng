/**
 * Soho Splitter.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery toast control.
 */

/**
 * Axis options.
 */
type SohoSplitterOptionsAxis = 'x' | 'y';

/**
 * Resize options.
 */
type SohoSplitterOptionsResize = 'immediate' | 'end';

/**
 * Splitter options.
 */
interface SohoSplitterOptions {
  /** The orientation of the splitter. */
    axis?: SohoSplitterOptionsAxis;

    /** How the panes react to the splitter being moved. */
    resize?: SohoSplitterOptionsResize;

    /** An element that is constraining the splitter. */
    containment?: JQuery;
}

/**
 * The interface represents the public Api exposed by the
 * Soho control.
 */
interface SohoSplitterStatic {
  /** The settings current set within the control. */
  settings: SohoSplitterOptions;

  /** Updates the control based on the settings. */
  updated(): void;

  /** Destroys any resources used by the control. */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  splitter: SohoSplitterStatic;
}

interface JQuery {
  splitter(options?: SohoSplitterOptions): JQuery;
}
