/**
 * Soho Buttonset API
 *
 * This file contains the Typescript mappings for the public
 * interface of the IDS Enterprise jQuery buttonset control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 */

interface SohoButtonsetOptions {
  /**
   * The list of buttons definitions - is this a copy from the modal?
   */
  buttons?: SohoButtonOptions[];

  /**
   * Detect existing button in the markup rather than generating
   * new button markup.
   */
  detectHTMLButtons?: boolean;

  /**
   * Styles to add to any generated button markup.
   */
  style?: string;
}

/**
 * The API for a `buttonset` instance.
 */
declare class SohoButtonsetStatic {
  /** Settings. */
  settings: SohoButtonsetOptions;

  /** underlying HTML Element */
  element?: HTMLElement;

  /**
   * Button api instances for the the buttons in the buttonset.
   */
  buttons: SohoButtonStatic[];

  /**
   * Disable all the buttons on the buttonset.
   *
   * @param val whether or not the Buttonset is disabled.
   */
  set disabled(val: boolean);

  /**
   * Adds a new button to the Buttonset.
   *
   * @param settings containing
   * @param [doAddDOM=false] if true, appends the new element to the Buttonset container after creation/update.
   */
  add(settings: SohoButtonOptions, doAddDOM?: boolean): void;

  /**
   * Removes a button from the buttonset.
   *
   * @param buttonAPI a Button Component instance, a Button HTML Element with an IDS component instance attached, or a string representing its ID
   * @param [doRemoveDOM=false] if true, removes the button's HTML from the page.
   */
  remove(buttonAPI?: SohoButtonStatic | HTMLButtonElement | string, doRemoveDOM?: boolean): void;

  /**
   * Removes ALL buttons from the buttonset
   * @param [doRemoveDOM=false] if true, removes the button's HTML from the page.
   */
  removeAll(doRemoveDOM?: boolean): void;

  /**
   * Returns a ButtonSet API in a specified place in the buttons array.
   *
   * @param idx index to target
   * @returns the Button API at the given index
   */
  at(ids: number): SohoButtonStatic;

  /**
   * Provides a JSON-compatible data representation of this button component for use with
   * higher-level components.
   *
   * @param addContextElement if true, adds a reference to this button element to the return data (NOT JSON-compatible).
   * @returns JSON-compatible representation of this button's configuration.
   */
  toData(addContextElement: boolean): string;

  /**
   * Update the component with new settings.
   *
   * @param settings The settings you would like to modify.
   * @returns This component's API.
   */
  updated(settings: SohoButtonsetOptions): SohoButtonsetStatic;

  /**
   * Teardown and remove any added markup and events.
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  buttonset: SohoButtonsetStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  buttonset(options?: SohoButtonsetOptions): JQuery;
}
