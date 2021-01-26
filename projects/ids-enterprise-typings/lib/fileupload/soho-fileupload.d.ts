/**
 * Soho File Upload.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery file upload control.
 */

interface SohoFileUploadOptions {
  /** Add extra attributes like id's to the component **/
  attributes?: Array<Object> | Object;
}

interface SohoFileUploadEvent extends JQuery.TriggeredEvent {
}

/**
 * JQuery Integration
 */

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoFileUploadStatic {
  /** Options. */
  settings?: SohoFileUploadOptions;

  clearUploadFile(): void;

  enable(): void;

  disable(): void;

  readonly(): void;

  destroy(): void;
}

interface JQueryStatic {
  fileupload: SohoFileUploadStatic;
}

interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  fileupload(options?: SohoFileUploadOptions): JQuery;
}
