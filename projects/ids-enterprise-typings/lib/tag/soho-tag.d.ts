/**
 * Infor Design Enterprise (fna sohoxi) 'Tags'.
 *
 * This file contains the Typescript mappings for the public
 * interface of the jQuery Tags control.
 */

/**
 * Tag Options
 */
interface SohoTagOptions {
  audibleContent?: string;
  clickable?: boolean;
  clickHandler?: any;
  content?: string;
  disabled?: boolean;
  dismissible?: boolean;
  dismissHandler?: any;
  href?: string;
  id?: string;
  parent?: HTMLElement;
  style?: string;
  value?: string;
}

/**
 * Tag Api.
 */
interface SohoTag {
  /** The settings option */
  settings: SohoTagOptions;

  element: HTMLElement;

  /** Updates the Tag with any new settings and data */
  updated(settings?: SohoTagOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoTagBeforeRemoveEvent extends JQuery.TriggeredEvent {
  tag?: SohoTag;
}

interface SohoTagAfterRemoveEvent extends JQuery.TriggeredEvent {
  tag?: SohoTag;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  tag(options?: SohoTagOptions): JQuery;
}
