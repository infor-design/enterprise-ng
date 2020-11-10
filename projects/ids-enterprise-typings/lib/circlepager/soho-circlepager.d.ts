/**
 * Soho Circle Pager.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Circle Pager control.
 */

/**
 * Circle Pager Options
 */
interface SohoCirclepagerOptions {
  /** The number of slides to show in one view / pane. */
  slidesToShow?: number;

  /** First showing slide/group, an 0-based integer */
  startingSlide?: number;

  /** Setting loop: true will loop back after next/previous reached to end */
  loop?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * Circle Pager Api.
 */
interface SohoCirclepager {
  /** The settings option */
  settings: SohoCirclepagerOptions;

  /** Updates the Circle Pager with any new settings and data. */
  updated(settings?: SohoCirclepagerOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  circlepager(settings?: SohoCirclepagerOptions): JQuery;
}
