/**
 * Soho Blockgrid.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery BlockGrid control.
 */
type SohoBlockGridSelectable = boolean | 'single' | 'multiple' | 'mixed';

/**
 * BlockGrid Options
 */
interface SohoBlockGridOptions {
  /** Defines the data to use, must be specified for this component. */
  dataset?: Object[];

  /** Selection Mode Property */
  selectable?: SohoBlockGridSelectable;
 }

/**
 * BlockGrid Api.
 */
interface SohoBlockGrid {
  settings: SohoBlockGridOptions;

  /** Select a block */
  selectBlock(activeBlock: any[], isCheckbox: boolean): void;

  /** Updates the blockgrid with any new settings. */
  updated(settings?: SohoBlockGridOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  blockgrid(options?: SohoBlockGridOptions): JQuery;
}
