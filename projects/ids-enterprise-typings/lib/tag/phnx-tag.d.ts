/**
 * Infor Design Enterprise'Tags'.
 */

/**
 * Tag Options
 */
interface PhnxTagOptions {
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
interface PhnxTag {
  /** The settings option */
  settings: PhnxTagOptions;

  element: HTMLElement;

  /** Updates the Tag with any new settings and data */
  updated(settings?: PhnxTagOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface PhnxTagBeforeRemoveEvent extends JQuery.TriggeredEvent {
  tag?: PhnxTag;
}

interface PhnxTagAfterRemoveEvent extends JQuery.TriggeredEvent {
  tag?: PhnxTag;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  tag(options?: PhnxTagOptions): JQuery;
}
