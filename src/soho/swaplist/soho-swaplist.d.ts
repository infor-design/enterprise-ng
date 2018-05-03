/**
 * Soho SwapList.
 *
 * This file contains the TypeScript mappings for the public
 * interface of the SoHoXi 'swaplist' control.
 */

interface SohoSwapListItem {
  /** Unique identifier for this item. */
  id: any;

  /** The internal value of this item. */
  value: any;

  /** The text displayed for this item. */
  text: string;

  /** Is this item disabled. */
  disabled?: boolean;

}

/**
 * Swap List Options
 */
interface SohoSwapListOptions {
  /** Available items to choose from. */
  available?: SohoSwapListItem[];

  /** Selected items. */
  selected?: SohoSwapListItem[];

  /** Optional  Additional items. */
  additional?: SohoSwapListItem[];

  /** Is this list searchable. */
  searchable?: boolean;
}

/**
 * Swap List Moved items and containers info
 */
interface SohoSwapListMoved {
  /** Container info where items moved From. */
  from?: any;

  /** Container info where items moved To. */
  to?: any;

  /** Moved items. */
  items?: SohoSwapListItem[];
}

/**
 * This interface represents the public API exposed by the
 * swaplist.
 */
interface SohoSwapListStatic {

  /**
   * Current in use options.
   */
  settings: SohoSwapListOptions;

  /**
   * Dyhnamically updates the data stored in the swap list.
   */
  updateDataset(dataset: SohoSwapListOptions);

  /**
   * Forces an update of the control to reflect any changes made in the settings object.
   */
  updated(): void;

  /**
   * Get available items
   */
  getAvailable(): SohoSwapListItem[];

  /**
   * Get selected items
   */
  getSelected(): SohoSwapListItem[];

  /**
   * get additional items
   */
  getAdditional(): SohoSwapListItem[];

  /**
   * Destroys any resources created by the control.
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  swaplist: SohoSwapListStatic;
}

interface JQuery {
  swaplist(options: SohoSwapListOptions): JQuery;
}

interface SohoSwapListBeforeSwapEvent extends JQuery.Event {
  moved?: SohoSwapListMoved;
}

interface SohoSwapListSwapUpdateEvent extends JQuery.Event {
  moved?: SohoSwapListMoved;
}
