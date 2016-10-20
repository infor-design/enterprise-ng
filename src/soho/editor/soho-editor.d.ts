/**
 * Soho Editor.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho editor control.
 */

/**
 * Editor Options
 */
interface SohoEditorOptions {
    buttons?: {
      editor: Object;
      source: Object;
    };
    delay?: number;
    firstHeader?: string;
    secondHeader?: string;
    placeholder?: string;
    anchor?: SohoEditorAnchor;
    image?: SohoEditorOptionsImage;
}

interface SohoEditorAnchor {
  url?: string;
  class?: string;
  target?: 'Same window'|'New window'| any;
}

/**
 * @interface SohoEditorOptionsImage
 */
interface SohoEditorOptionsImage {
  url?: string;
}

/**
 * This interface represents the public API exposed by the
 * editor.
 */
interface SohoEditorStatic {

  /**
   * Disable the editor.
   *
   * @memberOf SohoEditorStatic
   */
  disable(): void;

  /**
   * Enable the editor.
   *
   * @memberOf SohoEditorStatic
   */
  enable(): void;

  readonly(): void;

  /**
   * Destroy any resource created by the control.
   *
   * @memberOf SohoEditorStatic
   */
  destroy(): void;
}

/**
 * JQuery Integration
 */
interface JQueryStatic {
  editor: SohoEditorStatic;
}

interface JQuery {
  editor(options?: SohoEditorOptions): JQuery;
}

/**
 * Soho Editor Event
 */
interface SohoEditorEvent {
}
