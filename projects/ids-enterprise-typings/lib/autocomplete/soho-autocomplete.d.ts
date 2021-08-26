/**
 * Soho Autocomplete.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery Autocomplete control.
 */

/**
 * Autocomplete Options
 */
interface SohoAutoCompleteOptions {
  /** Defines the data to use, must be specified for this component. */
  source?: SohoAutoCompleteSource;

  /** Object is passed into the source method, and augmented with parameters. */
  sourceArguments?: string;

  /** Menu template, appropriate markup is expected. */
  template?: string;

  /** if true, causes filter results that don't match case to be thrown out */
  caseSensitive?: boolean;

  /** Filters based on the first character('startsWidth') of the string, or the entire string('contains') */
  filterMode?: SohoAutoCompleteFilterMode;

  /** Delay between key strokes on the keypad before the end of typing */
  delay?: number;

  /** Width of the open menu */
  width?: number | string;

  /** Offset, the left or top offset */
  offset?: SohoAutoCompleteOffset;

  /** Selects first item menu */
  autoSelectFirstItem?: boolean;

  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

type SohoAutoCompleteSource = Object[] | string | Object | SohoAutoCompleteSourceFunction;

type SohoAutoCompleteResponseFunction = (term: string, data: any[]) => void;

type SohoAutoCompleteSourceFunction = (term: string, response: SohoAutoCompleteResponseFunction) => void;

// can be 'wordStartsWith', 'contains', 'keyword', or 'phraseStartsWith'
type SohoAutoCompleteFilterMode = string;

type SohoAutoCompleteWidth = number | string;

interface SohoAutoCompleteOffset {
  top?: number | string;
  left?: number | string;
}

interface SohoAutoCompleteEvent {
  elem?: HTMLElement;
  value?: string;
}

 interface SohoAutoCompleteStatic {
   /** Destructor. */
   destroy(): void;

   /** Clear. */
   clear(): void;

   /** Disable the control. */
   disable(): void;

   /** Enable the control. */
   enable(): void;

   /** Mark the control as readonly. */
   readonly(): void;

   /** Mark the control as updated.  */
   updated(): void;
 }

interface JQueryStatic {
  autocomplete: SohoAutoCompleteStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  autocomplete(options?: SohoAutoCompleteOptions): JQuery;

  on(events: 'beforeopen', handler: JQuery.EventHandlerBase<any, SohoAutoCompleteEvent>): this;
}
