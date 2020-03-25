/**
 * Soho Home Page.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho home page control.
 */
type EasingType = 'blockslide' | 'linear' | 'swing';

interface SohoHomePageResizeEvent {
  rows: number;
  cols: number;
  containerHeight: number;
  matrix: any[];
  blocks: any[];
  editing: boolean;
}

/**
 * Homepage Options
 */
interface SohoHomePageOptions {
  gutterSize?: number;
  widgetWidth?: number;
  widgetHeight?: number;
  animate?: boolean;
  timeout?: number;
  columns?: number;
  editing?: boolean;
  easing?: EasingType;
  onBeforeRemoveCard?: SohoHomePageBeforeRemoveCardFunction;
}

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoHomePageStatic {
  /** Control options. */
  settings: SohoHomePageOptions;

  /**
   * Resize the control.
   */
  resize(): void;

  /**
   * Refresh the layout.
   */
  refresh(animate?: boolean): void;

  /**
   * Set edit for rearranging/reordering cards.
   */
  setEdit(edit: boolean): void;

  /**
   * Destroys any resources created by this control.
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  homepage: SohoHomePageStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  homepage(options?: SohoHomePageOptions): JQuery;
  on(events: 'resize', handler: JQuery.EventHandlerBase<any, any[]>): this;
  on(events: 'resizecard', handler: JQuery.EventHandlerBase<any, any[]>): this;
  on(events: 'reordercard', handler: JQuery.EventHandlerBase<any, any[]>): this;
  on(events: 'removecard', handler: JQuery.EventHandlerBase<any, any[]>): this;
}

/**
 * Soho Homepage Event
 */
interface SohoHomePageEvent {
  columns?: number;
  metadata?: object;
}

/**
 * Soho Homepage Edit Event
 */
interface SohoHomePageEditEvent {
  card?: JQuery;
  metadata?: object;
}

type SohoHomePageBeforeRemoveCardFunction = null | Function;


