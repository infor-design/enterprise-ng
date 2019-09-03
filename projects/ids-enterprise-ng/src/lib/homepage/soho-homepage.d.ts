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
  easing?: EasingType;
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
  on(events: 'resize',  handler: JQuery.EventHandlerBase<any, any[]>): this;
}

/**
 * Soho Homepage Event
 */
interface SohoHomePageEvent {
  columns?: number;
  metadata?: object;
}
