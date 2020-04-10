/**
 * Soho Drop Down.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho dropdown control.
 */

type SohoDropDownMoveSelectedOptions = 'group' | 'all' | 'none';

type SohoDropDownFilterModeOptions = false | 'contains' | 'keyword' | 'wordStartsWith' | 'phraseStartsWith';

type SohoDropDownReloadStyles = 'none' | 'open' | 'typeahead';

type SohoDropDownEventActions = 'closed' | 'tab' | 'select';

/**
 * Drop Down Options
 */
interface SohoDropDownOptions {
  /**
   * When an option is selected, the list will close if set to "true".  List stays open if "false".
   */
  closeOnSelect?: boolean;

  /**
   * Append a css class to dropdown-list.
   */
  cssClass?: string;

  /**
   * Search mode to use between 'contains',  'keyword',  'wordStartsWith', 'phraseStartsWith false will not allow client side filter
   */
  filterMode?: SohoDropDownFilterModeOptions;

  /**
   * If true, displays <optgroup> headers in the list even if no selectable options are present underneath.
   */
  showEmptyGroupHeaders?: boolean;

  /**
   * If in multiple mode, this setting sets a limit on the number of items that can be selected.
   */
  maxSelected?: number;

  /**
   * When the menu is opened, displays all selected options at the top of the list
   *
   * @deprecated - please use 'moveSelected'.
   */
  moveSelectedToTop?: boolean;

  /**
   * Controls where selected items are displayed.
   */
  moveSelected?: SohoDropDownMoveSelectedOptions;

  /**
   * If true, turns the dropdown into a multiple selection box; otherwise
   * only single selecrion is allowed.
   */
  multiple?: boolean;

  /**
   * If true, disables the ability of the user to enter text in the Search Input field in the open
   * combo box; otherwise searching is allowed.
   */
  noSearch?: boolean;

  /**
   * A function that will return an array of data items,
   * an array of data items (or single item) or a url.
   */
  source?: SohoDropDownSourceFunction | Object | string;

  /**
   * If a source method is defined, this flexible object can be passed into
   * the source method, and augmented with parameters specific to the implementation.
   */
  sourceArguments?: any;

  /**
   * Determines the frequency of reloading data from an external source.
   * If no source method is defined, this doesn't do anything.
   * Possible settings:
   * - `none`: do not reload from source after initially loading one time.
   * - `open`: only reload from source whenever the list is opened.
   * - `typeahead`: reload whenever the list is opened, and when a search term is keyed in.
   */
  reload: SohoDropDownReloadStyles;

  /**
   * If set to true, will always perform an ajax call whenever the list is opened.  If false,
   * the first AJAX call's results are cached.
   * @deprecated as of v4.9.0.
   * Use `reload` set to "none" for false or "open" for true.
   * The jQuery component has fallb
   */
  reloadSourceOnOpen?: boolean;

  /**
   * Allow an empty value to be selected, representing no selection.
   */
  empty?: boolean;

  /**
   * Typing Buffer Delay
   */
  delay?: number;

  /**
   * If set the width of the dropdown is limited to this pixel width.
   * Fx 300 for the 300 px size fields. Default is size of the largest data.
   */
  maxWidth?: number;

  /**
   * Show the select all text/option.
   */
  showSelectAll?: boolean;

  /**
   * Show the selected text items as tags.
   */
  showTags?: boolean;

  /**
   * Allows you to hook into the onKeyDown.
   * If you do you can access the keydown event data.
   * And optionally return false to cancel the keyDown action.
   */
  onKeyDown?: SohoDropDownKeyDownFunction;
}

type SohoDropDownKeyDownFunction = (
  e: Event
) => void;

/**
 * Function prototype for the source function.
 */
type SohoDropDownSourceFunction = (
  response: SohoDropDownResponseFunction,
  searchTerm: string
) => void;

/**
 * Function prototype for the response function.
 */
type SohoDropDownResponseFunction = (
  data: any[],
  isManagedByTemplate?: boolean
) => void;

/**
 * Type safe dropdown event object.
 */
interface SohoDropDownEvent extends JQuery.TriggeredEvent {

  /** Optional action used when the list is closed. */
  action?: SohoDropDownEventActions;
}

/**
 * This interface represents the public API exposed by the
 * dropdown.
 */
interface SohoDropDownStatic {

  /**
   * Current in use options.
   */
  settings: SohoDropDownOptions;

  /**
   * Mark the contro as readonly.
   */
  readonly(): void;

  /**
   * Forces an update of the control to reflect any changes made in the settings object.
   */
  updated(): void;

  /**
   * Disable the control.
   */
  disable(): void;

  /** Enable the control. */
  enable(): void;

  /**
   * True if the drop down is open; otherwise false.
   */
  isOpen(): boolean;

  /**
   * Destroys any resources created by the control.
   */
  destroy(): void;

  /**
   * Set the selected option on the dropdown.
   */
  selectValue(value: any): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  dropdown: SohoDropDownStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  dropdown(options: SohoDropDownOptions): JQuery;
}
