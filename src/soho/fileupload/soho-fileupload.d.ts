/**
 * Soho File Upload.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery file upload control.
 */

interface SohoFileUploadOptions {
  // no-op - no settings defined
}

interface SohoFileUploadEvent extends JQuery.Event {
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

interface JQuery {
  fileupload(options?: SohoFileUploadOptions): JQuery;
}
