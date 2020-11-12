/**
 * Soho Blockgrid.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery BlockGrid control.
 */
type SohoBlockGridSelectable = boolean | 'single' | 'multiple' | 'mixed' | undefined;

/**
 * BlockGrid Options
 */
interface SohoBlockGridOptions {
  /** Defines the data to use, must be specified for this component. */
  dataset?: Array<any>;

  /** Selection Mode Property */
  selectable?: SohoBlockGridSelectable;

  /** If true, enables paging in the Blockgrid */
  paging?: boolean;

  /** If defined, passes along a set of Pager options to the inline Pager. */
  pagerSettings: SohoPagerOptions;

  /**
   * @deprecated
   * If paging is active, defines the number of records allowed on the current page
   */
  pagesize?: Number;

  /**
   * @deprecated
   * If paging is active, defines the various record sizes the pager will allow
   */
  pagesizes?: Array<Number>;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

/**
 * BlockGrid Api.
 */
interface SohoBlockGrid {
  settings: SohoBlockGridOptions;

  pagerAPI?: SohoPagerStatic;

  select(activeBlock: JQuery<Node[]|Node>, isCheckbox: boolean): void;

  /**
   * @deprecated (use `select()`)
   * Selects a block in the blockgrid
   */
  selectBlock(activeBlock: JQuery<Node[]|Node>, isCheckbox: boolean): void;

  /** Updates the blockgrid with any new settings. */
  updated(settings?: SohoBlockGridOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  blockgrid(options?: SohoBlockGridOptions): JQuery;
}
