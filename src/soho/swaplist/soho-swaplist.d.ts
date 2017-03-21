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

  // Main containers
  // 'availableClass': '.available',
  // 'selectedClass': '.selected',
  // 'additionalClass': '.full-access',

  // Action buttons
  // 'availableBtn': '.btn-moveto-selected',
  // 'selectedBtnLeft': '.btn-moveto-left',
  // 'selectedBtnRight': '.btn-moveto-right',
  // 'additionalBtn': '.btn-moveto-selected',
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

  /**
   * Enable the control.
   */
  enable(): void;

  /**
   * Get available items
   */
  getAvailable(): any[];

  /**
   * Get selected items
   */
  getSelected(): any[];

  /**
   * get additional items
   */
  getAdditional(): any[];

  /**
   * Destroys any resources created by the control.
   */
  destroy(): void;

  /**
   * Forces an update of the control to reflect any changes made to the list data.
   */
  updated(): void;

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
