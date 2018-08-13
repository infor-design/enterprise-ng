/**
 * Soho Bullet.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Bullet control.
 */

/**
 * Bullet Options
 */
interface SohoBulletOptions {
  /** Chart Type */
  type?: string;

  /** Defines the data to use, must be specified for this component. */
  dataset?: SohoDatasetOptions;

  /** true|false - will do or not do the animation, 'initial' will do only first time the animation. */
  animate?: boolean | string;

  /** If true, the component will not resize when resizing the page. */
  redrawOnResize?: boolean;
}

interface SohoDatasetOptions {
  /** The data to use in the chart. **/
  data?: object[];

  /** Tooltip contents for each point. */
  tooltip?: any[];
}

/**
 * Bullet Api.
 */
interface SohoBullet {
  /** The settings option */
  settings: SohoBulletOptions;

  /** Updates the bullet with any new settings and data */
  updated(settings?: SohoBulletOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface JQuery {
  bullet(options?: SohoBulletOptions): JQuery;
}