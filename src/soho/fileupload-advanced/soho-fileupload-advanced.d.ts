/**
 * Soho File Upload Advanced.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery file upload advanced control.
 */

// Events

// filesdropped - [files]
// beforecreatestatus - [files]
// aftercreatestatus - [files]
// fileprogress - [{file: file, 'progress': progress}]
// fileaborted [file]
// filecompleteuploading [file]

interface SohoFileUploadAdvancedEvent extends JQuery.Event {
}

interface SohoFileUploadAdvancedStatus {
  setCompleted(data?: any);

  setProgress(percent: number);

  setAbort(jqXHR: JQueryXHR);

  /** The file being uploaded. */
  file: File;
}

type SohoFileUploadAdvancedSendFunction =
  (file: FormData, status: SohoFileUploadAdvancedStatus) => void;

interface SohoFileUploadAdvancedOptions {
  // On page(true) -or- on modal (false) , this is used for some visual style only.
  isStandalone?: boolean;
  //
  standaloneClass?: string;
  // Restrict file types(ie. 'jpg|png|gif') ['*' all types]
  allowedTypes?: string;
  // Max number of files can be uploaded
  maxFilesInProcess?: number;
  // max file size in bytes, -1 for unlimited
  maxFileSize?: number;
  // variable name to read from server
  fileName?: string;
  //
  isDisabled?: boolean;
  showBrowseButton?: boolean;
  send?: SohoFileUploadAdvancedSendFunction;

  textDropArea?: string;
  textDropAreaWithBrowse?: string;
  textBtnCancel?: string;
  textBtnCloseError?: string;
  textBtnRemove?: string;
  errorAllowedTypes?: string;
  errorMaxFileSize?: string;
  errorMaxFilesInProcess?: string;
}

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoFileUploadAdvancedStatic {
  /** Options. */
  settings: SohoFileUploadAdvancedOptions;

  enable(): void;

  disable(): void;

  destroy(): void;
}

interface JQueryStatic {
  fileuploadadvanced: SohoFileUploadAdvancedStatic;
}

interface JQuery {
  fileuploadadvanced(options?: SohoFileUploadAdvancedOptions): JQuery;
}
