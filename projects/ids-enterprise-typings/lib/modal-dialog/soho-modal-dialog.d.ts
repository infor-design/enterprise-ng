/**
 * Soho Modal Dialog Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery modal dialog control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in js\modal.js.
 */

/**
 * Controls when the modal is opened, either:
 *
 * immediate - when 'modal' is called.
 * click - manual? # Not really sure what this option is.
 */
type SohoModalTriggerType = 'click' | 'immediate';

/**
 * Soho Modal Dialog configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoModalOptions {
  /** The string used as the title for the dialog - not defaulted. */
  title?: string;

  // The content, can be 'html' or a selector.
  content?: JQuery | string;

  // Style to apply to the modal.
  cssClass?: string;

  /** The buttons to create. */
  buttons?: SohoModalButton[];

  /* Is this dialog searchable? */
  searchable?: boolean;

  /** When to close/open? */
  trigger?: SohoModalTriggerType;

  /** Is this an alert daialog? */
  isAlert?: boolean;

  /** Auto focus? */
  autoFocus?: boolean;

  /** Identifier for the dialog. */
  id?: string;

  // Extra frame height.
  frameHeight?: number;

  // Extra frame width.
  frameWidth?: number;

  /** If true the new flex toolbar will be used (For CAP)**/
  useFlexToolbar?: boolean;

  /** If true the an x will be shown on the modal**/
  showCloseBtn?: boolean;

  // The maximum width to show for the modal, regardless of content.
  maxWidth?: number;

  // Force the modal to go full size.
  fullsize?: SohoModalFullSize;

  // The breakpoint when to go fullsize.
  breakpoint?: SohoModalBreakPoint;

  // A call back function for showing the modal
  beforeShow?: any;

  /** Center the title of the dialog. */
  centerTitle?: boolean;

  /** Adds the ability to control the opacity of the background overlay. **/
  overlayOpacity?: number;

  /**  if true, causes this modal instance to become hidden when another modal is displayed over top. **/
  hideUnderneath?: boolean;

  /** If true, causes the modal's trigger element not to become focused once the modal is closed. **/
  noRefocus?: boolean;

  /** The modal's trigger element to keep refocused once the modal is closed.  **/
  triggerButton?: any;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

type SohoModalFullSize = false | 'responsive' | 'always';
type SohoModalBreakPoint = 'phone' | 'slim' | 'phablet' |
  'phone-to-tablet' | 'wide-tablet' | 'tablet-to-desktop' | 'desktop' | 'desktop-to-extralarge';

interface SohoModalButton {
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

  /** Click handler. */
  click?: SohoModalButtonClickFunction;

  /** class for the button. */
  cssClass?: string;

  /** Align the button (CAP Centered Tooltip) **/
  align?: 'left' | 'center' | 'right';
}

/**
 * Type of function required when handling the click.
 */
type SohoModalButtonClickFunction = (
  /** The event object. */
  e: JQuery.TriggeredEvent,

  /** The jQuery control.  */
  modal: SohoModalStatic) => void;

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface SohoModalStatic {

  /**
   * API for interacting with the buttons on the dialog.
   */
  buttonsetAPI: SohoButtonsetStatic;

  /** Existing configuration settings. */
  settings: SohoModalOptions;

  /**
   * A jQuery selector to the element in the DOM where the
   * modal dialog is placed after openning.
   */
  element: JQuery;

  /**
   * Track if cancelled.
   */
  isCancelled: boolean;

  /**
   * Forces a resize of the dialog.
   */
  resize(): void;

  /**
   * Open the modal dialog.
   */
  open(): void;

  /**
   * Close the modal dialog.
   *
   * @param destroy - destroy the html elements.
   * @param noRefresh - if true, prevents the ModalManager from refreshing state when the close is complete.
   * @param force - if true, forces the modal closed and ignores open subcomponents/visibility.
   */
  close(destroy?: boolean, noRefresh?: boolean, force?: boolean): void;

  /**
   * Releases all resources managed by the modal.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  modal(options: SohoModalOptions): JQuery;
}

interface JQueryStatic {
  modal: SohoModalStatic;
}
