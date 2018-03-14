/**
 * Soho Lookup.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery lookup control.
 */

interface SohoLookupOptions {
  /** Custom click event; can be used with a modal dialog and custom list component */
  click?: SohoLookupClickFunction;

  /** Field to return from the array or can be a function. */
  field?: string | SohoLookupFieldFunction;

  /** Dialog title or takes the label + Lookup. */
  title?: string;

  /** Pass dialog buttons or Cancel / Apply. */
  buttons?: SohoModalButton[];

  /** Options to pass to the underlying data grid. */
  options?: SohoDataGridOptions;

  /** Function used to match the search term to the data. */
  match?: SohoDataGridMatchFunction;

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

  /** Not supported - future. */
  typeahead?: boolean;

  /** ?? */
  autoApply?: boolean;

  /** A function that fires to let you validate form items on open and select. */
  validator?: SohoLookupValidatorFunction;

  /** Set the width of the input to the width of the selection */
  autoWidth?: boolean;
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
  e: JQuery.Event,
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

  /** Acess to the datagrid used for this function. */
  grid: SohoDataGridStatic;

  /** Underlying element. */
  element: JQuery;

  /** Destructor. */
  destroy(): void;
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

interface JQuery {
  lookup(options?: SohoLookupOptions): JQuery;
}
