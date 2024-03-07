/**
 * Infor Design Enterprise (fna sohoxi) 'Tags'.
 *
 * This file contains the Typescript mappings for the public
 * interface of the jQuery Tags control.
 */

import type IdsTag from 'ids-enterprise-wc/components/ids-tag/ids-tag';

/**
 * Tag Options
 */
interface SohoTagOptions {
  audibleContent?: string;
  clickable?: boolean;
  clickHandler?: any;
  content?: string;
  disabled?: boolean;
  dismissible?: boolean;
  dismissHandler?: any;
  href?: string;
  id?: string;
  parent?: HTMLElement;
  style?: string;
  value?: string;
}

/**
 * Tag Api.
 */
interface SohoTag {
  /** The settings option */
  settings: SohoTagOptions;

  element: HTMLElement;

  /** Updates the Tag with any new settings and data */
  updated(settings?: SohoTagOptions): void;

  /** Destroys the control on completion. */
  destroy(): void;
}

interface SohoTagBeforeRemoveEvent extends CustomEvent {
  tag?: IdsTag;
  sohoTag?: SohoTag;
}

interface SohoTagAfterRemoveEvent extends CustomEvent {
  tag?: IdsTag;
  sohoTag?: SohoTag;
}

