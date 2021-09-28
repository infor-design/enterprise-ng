/**
 * Soho ContextualActionPanel panel Control.
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Contextual Action Panel control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in js/contextualactionpanel.js, and js/modal.js.
 */

/**
 * Controls when the contextualactionpanel is opened, either:
 *
 * immediate - when 'contextualactionpanel' is called.
 * click - manual? # Not really sure what this option is.
 */
type SohoContextualActionPanelTriggerType = 'click' | 'immediate';

/**
 * Soho ContextualActionPanel panel configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoContextualActionPanelOptions {
  // The content, can be 'html' or a selector.
  content?: JQuery | string;

  /** Initialize newly loaded content */
  initializeContent?: boolean;

  /** The string used as the title for the panel - not defaulted. */
  title?: string;

  /** Settings to pass through to the modal */
  modalSettings?: SohoModalOptions;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;

  /** @deprecated settings should use modalSettings */
  /** @deprecated The buttons to create (use modalSettings) */
  buttons?: SohoContextualActionPanelButton[];
  /** @deprecated When to close/open */
  trigger?: SohoContextualActionPanelTriggerType;
  /** @deprecated Identifier for the panel. */
  id?: string;
  /** @deprecated If true the title will be centered. */
  centerTitle?: boolean;
}

interface SohoContextualActionPanelButton {
  /** An optional identifier for the button. */
  id?: string;

  /** An optional name for the input control, not used unless type = 'input'. */
  name?: string;

  /** An optional type for the control, either undefined, 'button' or 'input'
   * The 'input' type is used internally for searching. */
  type?: 'input' | 'button';

  /** Text for the button. */
  text?: string;

  /** Validate */
  validate?: boolean;

  /** Is this the default button? */
  isDefault?: boolean;

  /** Icon for the button. */
  icon?: string;

  /** class for the button. */
  cssClass?: string;

  /** Click handler. */
  click?: SohoContextualActionPanelButtonClickFunction;

  /** Align the button (CAP Centered Tooltip) **/
  align?: 'left' | 'center' | 'right';
}

/**
 * Type of function required when handling the click.
 */
type SohoContextualActionPanelButtonClickFunction = (
  /** The event object. */
  e: JQuery.TriggeredEvent,

  /** The jQuery control.  */
  contextualactionpanel: SohoContextualActionPanelStatic) => void;

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface SohoContextualActionPanelStatic {
  /** Existing configuration settings. */
  settings: SohoContextualActionPanelOptions;

  /**
   * API for interacting with the buttons on the dialog.
   */
  buttonsetAPI: SohoButtonsetStatic;

  /**
   * A jQuery selector to the element in the DOM where the
   * panel is placed after opening.
   */
  element: JQuery;

  /**
   * The underlying panel on the CAP added by the Core CAP API.
   */
  panel: JQuery;

  /**
   * Track if cancelled *
   */
  isCancelled: boolean;

  /**
   * Forces a resize of the panel.
   */
  resize(): void;

  /**
   * Close the modal panel.
   *
   * @param destroy - destroy the html elements.
   */
  close(destroy?: boolean): void;

  /**
   * Releases all resources managed by the modal.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  contextualactionpanel(options: SohoContextualActionPanelOptions): JQuery;
}

interface JQueryStatic {
  contextualactionpanel: SohoContextualActionPanelStatic;
}
