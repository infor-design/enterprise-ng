/**
 * Soho File Upload.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery file upload control.
 */

interface SohoFileUploadEvent extends JQueryEventObject {
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
  settings: SohoFileUploadAdvancedOptions;

  enable(): void;

  disable(): void;

  readonly(): void;

  destroy(): void;
}

interface JQueryStatic {
  fileupload: SohoFileUploadStatic;
}

interface JQuery {
  fileupload(options?: SohoFileUploadEvent): JQuery;
}
