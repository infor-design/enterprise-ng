/**
 * Soho List View.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery listview control.
 */

type SohoListViewSelectable = false | 'single' | 'multiple' | 'mixed';

/** How individual items are referenced in the list view. */
type SohoListViewItemReference = JQuery | number | void;

interface SohoListViewOptions {
  /** Data to display. */
  dataset?: Object[];

  /** Html template string */
  template?: string;

  /** Audible label (or uses parent title). */
  description?: string;

  /** Activates paging. */
  paging?: boolean;

  /** Sets the number of listview items available per page. */
  pagesize?: number;

  /** If true, associates itself with a Searchfield/Autocomplete and allows itself to be filtered */
  searchable?: boolean;

  /** Selection setting. */
  selectable?: SohoListViewSelectable;

  /** Select on focus? */
  selectOnFocus?: boolean;

  /**
   * An empty message will be displayed when there are no rows in the listview.
   * This only works when using a dataset and template. If you are using content projection
   * you will need to manage the empty message in your own angular template.
   */
  emptyMessage?: SohoEmptyMessageOptions;

  /** URL or source function. */
  source?: SohoListViewSourceFunction | string;

  /** If true when an item is activated the user should not be able to deactivate it by clicking on the activated item. */
  disableItemDeactivation?: boolean;
}

type SohoListViewSourceFunction = (
  pagerInfo: SohoPagerPagingInfo,
  SohoListViewResponseFunction
) => void;

type SohoListViewResponseFunction = (
  data: Object[],
  pagerInfo: SohoPagerPagingInfo
) => void;

/**
 * This interface represents the public API exposed by the
 * listview.
 */
interface SohoListViewStatic {
  /** Access to the control's options block. */
  settings: SohoListViewOptions;

  /** Selected items - as jQuery elements  */
  selectedItems: JQuery[];

  /** Toggles all the selected elements. */
  toggleAll(): void;

  /** ClearToggles all the selected elements. */
  clearSelection(): void;

  /** Clear the list. */
  clear(): void;

  /** Remove all selected items from the list */
  removeAllSelected(): void;

  /** Deselect all selected items in the list */
  clearAllSelected(): void;

  /** Updates the busy indicator with any new settings. */
  updated(): void;

  /** Destroy the component on completion. */
  destroy(): void;

  /**
   * Removes the given item from the list, if rendered.
   */
  remove(item: SohoListViewItemReference): void;

  /**
   * Deselects the given item from the list, if rendered.
   * (Deprecated) use deselect for proper semantics.
   * @deprecated
   */
  unselect(item: SohoListViewItemReference): void;

  /**
   * Unselects the given item from the list, if rendered.
   */
  deselect(item: SohoListViewItemReference): void;

  /**
   * Selects the given item from the list, if rendered.
   */
  select(item: SohoListViewItemReference): void;

  /**
   * Activate the given list item.
   */
  activateItem(item: SohoListViewItemReference): void;

  /**
   * Return an object containing info about the currently activated item.
   */
  activatedItem();

  /**
   * De-activate the given list item.
   */
  deactivateItem(item?: SohoListViewItemReference): void;

  /**
   * Toggle Activation on the given list item.
   */
  toggleItemActivation(item: SohoListViewItemReference): void;

}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  listview: SohoListViewStatic;
}

interface JQuery {
  listview(options?: SohoListViewOptions): JQuery;
}
