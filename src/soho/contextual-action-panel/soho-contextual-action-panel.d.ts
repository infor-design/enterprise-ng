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
  /** The string used as the title for the panel - not defaulted. */
  title?: string;

  // The content, can be 'html' or a selector.
  content?: JQuery | string;

  /** The buttons to create. */
  buttons?: SohoContextualActionPanelButton[];

  /** When to close/open? */
  trigger?: SohoContextualActionPanelTriggerType;

  /** Initialize newly loaded content */
  initializeContent?: boolean;

  /** Identifier for the panel. */
  id?: string;

  /** If true the title will be centered. */
  centerTitle?: boolean;
}

interface SohoContextualActionPanelButton {
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
}

/**
 * Type of function required when handling the click.
 */
type SohoContextualActionPanelButtonClickFunction = (
  /** The event object. */
  e: JQuery.Event,

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
  resize();

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
interface JQuery {
  contextualactionpanel(options: SohoContextualActionPanelOptions): JQuery;
}

interface JQueryStatic {
  contextualactionpanel: SohoContextualActionPanelStatic;
}
