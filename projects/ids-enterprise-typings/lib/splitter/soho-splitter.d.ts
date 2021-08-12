/**
 * Soho Splitter.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Splitter component.
 */

/**
 * Axis options.
 */
type SohoSplitterOptionsAxis = 'x' | 'y';

/**
 * Side options.
 */
type SohoSplitterOptionsSide = 'left' | 'right';

/**
 * Resize options.
 */
type SohoSplitterOptionsResize = 'immediate' | 'end';

/**
 * MaxWidth options.
 */
interface SohoSplitterOptionsMaxWidth {
  left?: 'auto' | number
  right?: 'auto' | number
}

/**
 * Splitter options.
 */
interface SohoSplitterOptions {
  /** The orientation of the splitter. */
  axis?: SohoSplitterOptionsAxis;

  /** The side to dock on for vertical splitter. */
  side?: SohoSplitterOptionsSide;

  /** How the panes react to the splitter being moved. */
  resize?: SohoSplitterOptionsResize;

  /** An element that is constraining the splitter. */
  containment?: JQuery;

  /** Save the location in local storage. */
  save?: boolean;

  /** Display a collapse button on the splitter. */
  collapseButton?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;

  /** Ability to stop dragging at a max left or right size. (default {left: 'auto', right: 'auto'}) **/
  maxWidth?: SohoSplitterOptionsMaxWidth;
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

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  splitter(options?: SohoSplitterOptions): JQuery;
}
