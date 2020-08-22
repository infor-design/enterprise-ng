/**
 * Soho Lookup.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery lookup control.
 */

interface SohoLookupOptions {
  /** Custom click event; can be used with a modal dialog and custom list component */
  click?: SohoLookupClickFunction;

  /** If a click method is defined, this flexible object can be passed in. */
  clickArguments?: any;

  /** Field to return from the array or can be a function. */
  field?: string | SohoLookupFieldFunction;

  /** Dialog title or takes the label + Lookup. */
  title?: string;

  /** Pass dialog buttons or Cancel / Apply. */
  buttons?: SohoModalButton[];

  /** Options to pass to the underlying data grid. */
  options?: SohoDataGridOptions;

  /**
   * Used to manage data prior to showing the lookup.
   *
   * For example:
   *  - When the button is clicked, show a loading dialog and make the request for
   *    lookup grid data.
   *  - Upon receiving grid data, set lookup.settings.options for the columns and dataset.
   *  - Then call grid() to build the grid and complete the lookup call.
   */
  beforeShow?: SohoLookupBeforeShowFunction;

  /** Custom modal content. */
  modalContent?: JQuery | string;

  /** Can the user type random text into the field. */
  editable?: boolean;

  /** If set to false the dialog wont apply the value on clicking a value. */
  autoApply?: boolean;

  /** Function used to match the search term to the data. */
  match?: SohoDataGridMatchFunction;

  /** A function that fires to let you validate form items on open and select. */
  validator?: SohoLookupValidatorFunction;

  /** Set the width of the input to the width of the selection */
  autoWidth?: boolean;

  /** The character  used to separate data strings */
  delimiter?: string;

  /** Apply a minimum width to the lookup*/
  minWidth?: number;

  /**  Add an ability to clear the lookup field with an x */
  clearable?: boolean;
}

/** Selection criteria. */
type SohoDataGridMatchFunction = (
  /** Value to match against. */
  value: any,

  /** The row to match. */
  data: Object,

  /** The editor element. */
  element: JQuery,

  /** The grid api. */
  grid: SohoDataGridStatic
) => boolean;

type SohoLookupClickFunction = (
  e: JQuery.TriggeredEvent,
  lookup: SohoLookupStatic
) => void;

type SohoLookupFieldFunction = (
  /** This row? or Cell? */
  data: Object,

  /**  */
  input: JQuery,

  /** Reference to underlying  */
  grid: SohoDataGridStatic
) => string;

/**
 * This interface represents the public API exposed by the
 * Lookup.
 */
interface SohoLookupStatic {
  /** Access to the control's options block. */
  settings: SohoLookupOptions;

  /** Access to the datagrid used for this function. */
  grid: SohoDataGridStatic;

  /** Access to the modal when opened. */
  modal: SohoModalStatic;

  /** Underlying element. */
  element: JQuery;

  /** Destructor. */
  destroy(): void;

  /**  Find the row and select it based on select value / function / field value **/
  selectRowByValue(field: String, value: String): void;

  /** Get the selected rows and return them to the UI **/
  insertRows(): void;

  /** Enable the input. **/
  enable(): void;

  /** Disable the input. **/
  disable(): void;

  /** Make the input readonly. **/
  readonly(): void;

  /** Input is disabled or not **/
  isDisabled(): boolean;

  /** Input is readonly or not **/
  isReadonly(): boolean;

  /** Updates the lookup instance with new settings **/
  updated(settings: any): void;

  /**  Send in a new data set to display in the datagrid in the lookup. **/
  updateDataset(dataset: Object[], pagerInfo: SohoPagerPagingInfo): void;
}

/**
 * Function prototype for the 'beforeShow' callback.
 */
type SohoLookupBeforeShowFunction = (
  /** The lookup control that has been activated. */
  lookup: SohoLookupStatic,
  /** The response - takes the grid to use (or undefined or is is to be created.)  */
  response: SohoLookupBeforeShowResponse
) => any;

type SohoLookupBeforeShowResponse = (
  /** The grid to use, if provided. */
  grid?: SohoDataGridStatic
) => void;

/**
 * Validates the controls on the dialog.
 *
 * Not sure how the result is handled, the code in Soho looks to ignore it.
 */
type SohoLookupValidatorFunction = (
  /** The lookup's jQuery element. */
  element: JQuery,

  /** The modal dialog displaying the lookup. */
  modal: SohoModalStatic,

  /** The grid of data. */
  grid: SohoDataGridStatic
) => void;

/** Selected row structure from the lookup api. */
interface SohoLookupChangeEvent {
  data: Object;
  elem: HTMLElement[];
  idx: number;
  value: string;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  lookup: SohoLookupStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  lookup(options?: SohoLookupOptions): JQuery;
}
