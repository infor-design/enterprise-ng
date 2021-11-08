/**
 * Soho Swap Action Control.
 * 
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery swipe action control.
 */

type SohoSwipeType = 'continuous' | 'reveal' | undefined;

interface SohoSwipeActionOptions {
  swipeType?: SohoSwipeType;
}

interface SohoSwipeActionStatic {
  settings: SohoSwipeActionOptions;

  updated(settings?: SohoSwipeActionOptions): void;

  destroy(): void;
}

interface JQueryStatic {
  swipeaction: SohoSwipeActionStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  swipeaction(options?: SohoSwipeActionOptions): JQuery;
}
