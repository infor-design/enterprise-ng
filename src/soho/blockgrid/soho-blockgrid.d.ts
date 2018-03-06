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

  selectable?: SohoBlockGridSelectable;
 }

interface SohoBlockGrid {
  settings: SohoBlockGridOptions;

  /** Run selection over a block item */
  selectBlock(activeBlock: any[], isCheckbox: boolean): void;

  /** Select the blockgrid */
  selected(jQuery): void;

  /** Unselect the blockgrid */
  unselected(jQuery): void;

  /** Updates the blockgrid with any new settings. */
  updated(): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  blockgrid(options?: SohoBlockGridOptions): JQuery
}
