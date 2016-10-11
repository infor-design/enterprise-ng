/**
 * Soho Drop Down.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho dropdown control.
 */

//type SohoDatePickerOptionsMode = 'standard' | 'range';

/**
 * Drop Down Options
 */
interface SohoDropDownOptions {
  /**
   * When an option is selected, the list will close if set to "true".  List stays open if "false".
   *
   * @type {boolean}
   * @memberOf SohoDropDownOptions
   */
  closeOnSelect?: boolean,

  /**
   * Append a css class to dropdown-list.
   *
   * @type {string}
   * @memberOf SohoDropDownOptions
   */
  cssClass?: string;

  /**
   * If in multiple mode, sets a limit on the number of items that can be selected.
   *
   * @type {number}
   * @memberOf SohoDropDownOptions
   */
  maxSelected?: number;

  /**
   * When the menu is opened, displays all selected options at the top of the list
   *
   * @type {boolean}
   * @memberOf SohoDropDownOptions
   */
  moveSelectedToTop?: boolean;

  /**
   * Turns the dropdown into a multiple selection box.
   *
   * @type {boolean}
   * @memberOf SohoDropDownOptions
   */
  multiple?: boolean;

  /**
   * If true, disables the ability of the user to enter text in the Search Input field in the open
   * combo box.
   *
   * @type {boolean}
   * @memberOf SohoDropDownOptions
   */
  noSearch?: boolean;

  /**
   * A function that will return an array of data items,
   * an array of data items (or single item) or a url.
   *
   * @type {(Function | Object | string)}
   * @memberOf SohoDropDownOptions
   */
  source?: Function | Object | string;

  /**
   *  Initialize Empty Value
   *
   * @type {boolean}
   * @memberOf SohoDropDownOptions
   */
  empty?: boolean;

  /**
   * Typing Buffer Delay
   *
   * @type {number}
   * @memberOf SohoDropDownOptions
   */
  delay?: number;
}

type SohoDropDownSourceFunction = (
  response: SohoDropDownResponseFunction,
  searchTerm: string
) => void;

type SohoDropDownResponseFunction = (
  data: any[]
) => void;

/**
 * Type safe dropdown event object.
 */
interface SohoDropDownEvent extends JQueryEventObject {
}

/**
 * This interface represents the public API exposed by the
 * dropdown.
 */
interface SohoDropDownStatic {

  readonly(): void;

  /**
   * Forces an update of the control to reflect any changes made in the settings object.
   *
   * @memberOf SohoDropDownStatic
   */
  updated(): void;

  disable(): void;

  // SOHO-4777 - 4.0 Datepicker - Needs destroy method.
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  /**
   *
   *
   * @type {SohoDropDownStatic}
   * @memberOf JQueryStatic
   */
  dropdown: SohoDropDownStatic;
}

interface JQuery {
  /**
   *
   *
   * @param {SohoDropDownOptions} options
   * @returns {JQuery}
   *
   * @memberOf JQuery
   */
  dropdown(options: SohoDropDownOptions): JQuery;
}
