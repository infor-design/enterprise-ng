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

interface JQuery {
  blockgrid(options?: SohoBlockGridOptions): JQuery
}
